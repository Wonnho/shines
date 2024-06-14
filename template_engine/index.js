const express=require('express')
const bodyParser=require('body-parser')
const {join} = require("path");
const path = require("path");
const app=express();
const PORT=3000

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}))
// 뷰 파일이 위치한 디렉토리를 설정 (기본값은 'views' 디렉토리)
app.use(express.static(join(__dirname, 'public')));
app.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname,'public','login.html'));
});

app.post('/login',(req,res)=>{
   const {username,password}=req.body;

    if(username==='admin'&& password==='1122') {
        const users = [
            { name: 'User1', email: 'user1@example.com' },
            { name: 'User2', email: 'user2@example.com' },
            { name: 'User3', email: 'user3@example.com' }
        ];

        res.render('dashboard',{username,users});
    } else {
//        res.render('login',{error:'invalid username or password'})
        res.sendFile(path.join(__dirname, 'public', 'login.html'), { error: 'Invalid username or password' });

    }
});



//const  PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    //console.log(`server is running at http://13.239.64.139:${PORT}`)
    console.log(`server is running at http://localhost:${PORT}`)
});




