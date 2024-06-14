const express=require('express')
const app=express();
const port=3001;

app.get('/',(req,res)=>{
    res.send('Power on, You got me!!!!');
})

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
});