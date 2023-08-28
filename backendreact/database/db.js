const mysql=require('mysql');
const conn=mysql.createConnection({
    user:'root',
    password:'',
    host:'localhost',
    database:'react'
})
conn.connect(err=>{
    if(err){
        console.log(err)
    }
    console.log("database connected succesfuuly ")
});
module.exports=conn;