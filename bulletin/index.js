const express=require('express')
const bodyParser=require('body-parser')
const {join} = require("path");
const path = require("path");
const app=express();
const PORT=3001
const session=require('express-session');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}))

// 뷰 파일이 위치한 디렉토리를 설정 (기본값은 'views' 디렉토리)
app.use(express.static(join(__dirname, 'public')));



const oracledb=require('oracledb')
const dbConfig=require('./dbconfig')
//const path = require("path");

oracledb.initOracleClient({libDir:'../instantclient_21_13'})
 // aws
//oracledb.initOracleClient({libDir:'/usr/lib/oracle/21/client64/lib'});

oracledb.autoCommit=true;


app.use(session({
    secret:'mySecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:5000
    }
}));


selectDatabase();

async function selectDatabase() {
    console.log("!!!! DB connection ");

    let connection=await oracledb.getConnection(dbConfig);
    let binds={};
    let options= {};


    console.log('!!!!DB selected!!!!!');

    let result=await connection.execute("select * from users",binds,options);

    console.log('!!!!DB response!!!!!');
    console.log(result.rows[0][3]);
    console.log('!!!!DB close !!!!')
    await connection.close();


};

app.listen(PORT,()=>{
    //console.log(`server is running at http://13.239.64.139:${PORT}`)
    console.log(`server is running at http://localhost:${PORT}`)
});

// 라우트 정의
app.get('/', async (req, res) => {
    let conn;
    try {
        conn = await oracledb.getConnection(dbConfig);
        let result = await conn.execute(
            `SELECT COUNT(*) AS total FROM posts`
        );
        const totalPosts = result.rows[0];
        const postsPerPage = 10; // 한 페이지에 표시할 게시글 수
        const totalPages = Math.ceil(totalPosts / postsPerPage); // 총 페이지 수 계산

        let currentPage = req.query.page ? parseInt(req.query.page) : 1; // 현재 페이지 번호
        const startRow = (currentPage - 1) * postsPerPage + 1;
        const endRow = currentPage * postsPerPage;
        console.log(`startRow: ${startRow}, endRow: ${endRow}`);

        result = await conn.execute(
            `SELECT
                 id,title,writer,to_char(created_at,'YYYY-MM-DD'),views,
                (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count
             FROM (
                      SELECT
                          p.id, p.title, u.name AS writer, p.created_at, p.views,
                          ROW_NUMBER() OVER (ORDER BY p.id DESC) AS rn
                      FROM posts p
                               JOIN users u ON p.author_id = u.id
                  ) p
             WHERE rn BETWEEN :startRow AND :endRow`,

            {
                startRow: startRow,
                endRow: endRow
            }
        );

        const MAX_PAGE_LIMIT = 5;
        const startPage = (totalPages - currentPage) < MAX_PAGE_LIMIT ? totalPages - MAX_PAGE_LIMIT + 1 : currentPage;
        const endPage = Math.min(startPage + MAX_PAGE_LIMIT - 1, totalPages);
        console.log(`totalPages: ${totalPages}, currentPage: ${currentPage}, startPage: ${startPage}, endPage: ${endPage}`);
        console.log(result.rows);
        res.render('index', {
            posts: result.rows,
            startPage: startPage,
            currentPage: currentPage,
            endPage: endPage,
            totalPages: totalPages,
            maxPageNumber: MAX_PAGE_LIMIT
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.post('/login', async (req,res)=>{
    const { username, password } = req.body;

  console.log('username:',username)

  const authenticatedUser=await  verifyID(username,password);
  if(authenticatedUser) {
      req.session.loggedIn=true;
      req.session.username=username;

      res.render('welcome', {username: username})
  } else {
      res.redirect('/login.html')
  }
});

app.get('/login',(req,rest)=>{
    if(req.session.loggedIn){

    }
})
 async function verifyID(username,password) {

    let connection;

    try {
        connection=await oracledb.getConnection(dbConfig);
        sql_query='select * from users where username=:username and password=:password';
        // console.log('sql_query:',sql_query)
        const result=await connection.execute(sql_query,{username,password})
        //  console.log('result:',result);
        if(result.rows.length>0) {
            console.log(result.rows[1]);

            return {
                id:result.rows[0].ID,
                username:result.rows[0].USERNAME,
                    name:result.rows[0].Name
            };
        } else {
            return null;
        }

    }
    catch { console.error('error occurs')}
     finally { if(connection) {await connection.close(); } }
}

app.get('/detailPost/:id', async (req,res)=>{
    const postId=req.params.id;
    let conn;

    try {
        conn=await oracledb.getConnection(dbConfig);

        await conn.execute(
            `update posts set views=views+1 where id=:id`,
            [postId],

        );

        const postResult=await conn.execute(

            `select p.title,u.name as writer,p.content, TO_CHAR(p.created_at, 'YYYY-MM-DD') AS created_at
                from posts p join users u on p.author_id=u.id
                where p.id=:id `,
            [postId],
            {fetchInfo:{CONTENT:{type:oracledb.STRING}}}

        );
        console.log('postId:',postId)

        const commemts=[];

        const post ={
            title: postResult.rows[0][0],
            author: postResult.rows[0][1],
            content: postResult.rows[0][2],
            created_at: postResult.rows[0][3],
            views: postResult.rows[0][4],
            likes: postResult.rows[0][5]
        };
        res.render('detailPost',{
            post:post,
            comments:commemts
        });


    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        if(conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error(err);
            }
        }
    }

});

app.get('/addComment',(req,res)=>{
    const postId=req.query.postId;
    res.render('addComment',{postId:postId})
})