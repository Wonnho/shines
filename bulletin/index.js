const express=require('express')
const bodyParser=require('body-parser')
const {join} = require("path");
const path = require("path");
const app=express();
const PORT=3000
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
        conn=await oracledb.getConnection(dbConfig);

        let result=await conn.execute(
           `select title,writer,to_char(created_at,'YYYY-MM-DD'),views
        from (
            select p.id,p.title,u.name as writer,p.created_at,p.views,ROW_NUMBER() OVER ( ORDER BY p.created_at desc)as rn
        from posts p
        join users u
        on p.author_id=u.id)
        where rn between 1 and 10`
        );
        console.log(result.rows)
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    finally {
        if(conn) {
            await conn.close();
        } else { }
    }

  //  res.sendFile(path.join(__dirname, 'public', 'login.html')); // Send the HTML file
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

})