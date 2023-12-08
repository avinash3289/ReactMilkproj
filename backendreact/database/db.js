const mysql1=require('mysql');
const conn=mysql1.createConnection({
    user:'root',
    password:'',
    host:'localhost',
    database:'test',
    port:3306
})
conn.connect(err=>{
    if(err){
        console.log(err)
    }
    console.log("database connected succesfuuly ")
});
module.exports=conn;