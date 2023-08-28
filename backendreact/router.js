const express=require('express')
const router=express.Router();
const db=require('./database/db')
router.get("/getmilk/:id", function (req, res) {
    const username=req.url.split('/')[2]
    db.query("SELECT * FROM milkcollection where username=?",[username], function (err, result) {
        if (err) {
            res.send({ success: false, message: "error" });
        }
        else if (result.length>0) {
            res.send({ results: result, message: "success" });
        }
        else {
            res.send({ success: false, message: "no data found!!!.." });
        }

    });

});
router.post("/ratecharts", function (req, res) {
    const { fat, snf1, snf2, snf3, snf4 } = req.body;
    console.log(req.body)
    const query = `INSERT INTO ratechart (fat, \`8.70\`, \`8.80\`, \`8.90\`, \`9.00\`)
                   VALUES (${fat}, ${snf1}, ${snf2}, ${snf3}, ${snf4})`;
    db.query(query, (err, result) => {
        if (err) {
            res.send({ message: err });
            console.log(err);
        }
        else {
            res.send({ submit: true, });
        }

    });
});

router.put("/uprate/:fid", function (req, res) {
    const { fat, snf1, snf2, snf3, snf4 } = req.body;
    const id2 = req.params.fid;
    const query = `UPDATE ratechart SET  \`8.70\`=?, \`8.80\`=?, \`8.90\`=?, \`9.00\`=? WHERE fat=?`;
    const values = [snf1, snf2, snf3, snf4, id2];

    db.query(query, values, (err, result) => {
        if (err) {
            res.send({ message: err });
            console.log(err);
        } else {
            res.send({ submit: true });
        }
    });
});
router.post("/genbill/:user",function(req,res){
    const  {usercode,date1,date2}=req.body;
    const user=req.url.split('/')[2];
    db.query("select m.usercode,s.Name,sum(m.quantity) as Liters,sum(Distinct m.amount) as Totalamount  from milkcollection m join sellerregistration s on m.usercode=s.usercode where m.username=? and date>=? and date<=? and m.usercode=?  ",[user,date1,date2,usercode],(err,result5)=>{
        if(err){
            res.send({message:err});
        }
        else{
               db.query("select sum(amount) from payments where  username=? and usercode=? and date>=? and date<=?",[user,usercode,date1,date2],(err,result6)=>{
                if(err) throw err;
                else {
                    const balance=result5[0]["Totalamount"]-result6[0]["sum(amount)"];
                     console.log(balance);
                     if(balance>0){
                        res.send({submit:true,bill:result5,bal:balance});
                     }
                     else{
                        const balance=0;
                        res.send({submit:true,bill:result5,bal:balance});
                        console.log(balance);
                     }
                   
                }
               })
        }
       
    })

});
router.post("/payment/:uid",function(req,res){
    const {usercode,date,amount}=req.body;
    console.log(usercode,date,amount);
    const k=req.url.split('/')[2];
    db.query("select sum(Distinct Amount) as Amount from milkcollection where usercode=? and username=?",[usercode,k],(err,resu3)=>{
        if(err) throw err;
        else if(resu3.length==0){
            res.send({submit:false,})
        }
        else{
            const bill=resu3[0]["Amount"];
            db.query("insert into payments (usercode,date,amount,username) values (?,?,?,?)",[usercode,date,amount,k],(err,result32)=>{
                        if(err) throw err;
                        else{
                            res.send({submit:true,});
                        }
                    })
            

        }
    })
})
router.get("/getpay/:payid",(req,res)=>{
    let usercode=req.params.payid; 
    console.log(usercode)
   db.query("select * from payments where usercode=?",[usercode],(err,result12)=>{
       if (err) throw err;
       else if (result12.length>0){
           res.send({submit:true,paydetails:result12});
       }
       else{
           res.send({submit:false,message:"no such user found"});
       }
   });
     
});
router.get("/getadmininfo/:id", function (req, res) {
    var user=req.url.split('/')[2];
    db.query("SELECT * FROM  admin where username=?",[user], function (err, result) {
        if (err) {
            res.send({ success: false, message: "error" });
        }
        else if (result.length>0) { 
            res.send({ data: result,});
        }
        else {
            res.send({ success: false, message: "no data found!!!.." });
        }

    });

});
router.put("/adminprofile/:id",function(req,res){
    const {name,username,password,chpass}=req.body;
    console.log(name,username,password,chpass);
    var usercode=req.url.split('/')[2];
    console.log(req.body)
    db.query("update admin  set name=?,password=? where username=? and password=?",[name,chpass,usercode,password],(err,results2)=>{
        if(err) throw err;
        else if(results2.length==0){
            res.send({submit:false,message:"No data found"});
        }
        else{
           
            res.send({submit:true,name});
        }
    })
})
// router.post("/store", function (req, res) {
//     console.log(req.body)
//     db.query("insert into admin set?",[req.body], function (err, result) {
//         if (err) {
//             res.send({ success: false, message: "error" });
//         }
//         else{
//             res.send({success:true})
//         }
//     });

// });

router.post("/sellerregister", (req, res) => {
    db.query("insert into sellerregistration set?", req.body, (err, result4) => {
        if (err) {
            console.log(err);
            res.send({ message: err });
        }
        else {
            console.log(result4);
            res.send({ submit: true, });
        }

    });
});
router.get("/getuser/:code", function (req, res) {
    let user=req.url.split('/')[2];
        db.query("SELECT * FROM  sellerregistration where username=?",[user], function (err, result) {
            if (err){
                res.send({ success: false, message: "error" });
            }
            else if (result.length>0) { 
                res.send({ info: result,});
            }
            else {
                res.send({ success: false, message: "no data found!!!.." });
            }
    
        });
    
    });

    router.delete("/deluser/:delid", function (req, res) {
        let id = req.params.delid;
        db.query("delete  from sellerregistration where usercode=?", [id], (err, res3) => {
            if (err) {
                res.send({ message: err });
            }
            else {
                res.send({ submit: true, message: "deleted successfull" });
    
            }
        });
    });
    router.put("/update/:upid", function (req, res) {
        console.log(req.body)
        let id = req.params.upid;
        let name = req.body.name;
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let phoneno = req.body.phoneno;
        let street = req.body.street;
        let village = req.body.village;
        let mandal = req.body.mandal;
        let District = req.body.District;
        let state = req.body.state;
        let zipcode = req.body.zipcode;
        let gender = req.body.gender;
        db.query("update  sellerregistration set name=?,email=?,username=?,password=?,phoneno=?,street=?,village=?,mandal=?,District=?,state=?,zipcode=?,gender=? where usercode=?", [name, email, username, password, phoneno, street, village, mandal, District, state, zipcode, gender, id], (err, result3) => {
            if (err) {
                res.send({ message: err });
            }
            else {
                res.send({ submit: true });
            }
        });
    });

router.post("/stores", function (req, res) {
    console.log(req.body)
    db.query("select * from admin where username=? and password=?",[req.body.username,req.body.password], function (err, result) {
        if (err) {
            res.send({success: false, message: "error" });
        }
        
        else if(result.length>0){
            const name=result[0]["name"];
            res.send({ success:true,name:name, message: "success" });
        }
        else{
            res.send({success:false})
        }

    });

});
router.post("/milkcollection", (req, res) => {
    const { usercode, date,timings,milktype, fat, snf, quantity ,username} = req.body;
    console.log(usercode, fat, snf, quantity,timings,milktype);
    //fetch ratechart information 
    const ratechartquery = 'select  *  from ratechart where fat =? ';
    db.query(ratechartquery, [fat], (err, results3) => {
        if (err) {
            console.error(err);
        }
        else{
            if(results3.length===0){
                res.status(400).send('Error retrieving rate chart data');

            }
            else{
                const { '8.70': r870, '8.80': r880, '8.90': r890, '9.00': r900 } = results3[0];
                let price = null;
                if (snf >= 8.70 && snf < 8.80) {
                  price = r870;
                } else if (snf >= 8.80 && snf < 8.90) {
                  price = r880;
                } else if (snf >= 8.90 && snf < 9.00) {
                  price = r890;
                } else if (snf >= 9.00) {
                  price = r900;
                }
                if(price===null){
                    res.status(400).send("invalid snf value");
                }
                else{
                    const Amount=quantity*price;
                    db.query("insert into milkcollection (usercode,date,timings,milktype,fat,snf,quantity,price,Amount,username) values(?,?,?,?,?,?,?,?,?,?)", [usercode, date,timings,milktype, fat, snf, quantity, price,Amount,username], (err, res1) => {
                        if (err) {
                            res.send({ message: err });
                            console.log(err);
                        }
                        else {
                            res.send({ submit: true, });
                            console.log(res1);
                        }
                    })
                }
            }
        }
      
       
    })

});
router.get("/getvalues/:id",function(req,res){
    const username=req.url.split('/')[2];
    
    db.query("select count(*) from sellerregistration where username=? ",[username],(err,res1)=>{
        if(err){
            res.send({message:err});
        }
        else{
                db.query("select sum(Amount) from milkcollection where username=?",[username],(err,res2)=>{
                    if(err){
                        res.send({message:err});
                    }
                    else{
                        db.query("select sum(quantity) from milkcollection where username=?",[username],(err,res3)=>{
                            if(err){
                                res.send({message:err});
                            }
                            else{
                                db.query("select max(price) from milkcollection where username=?",[username],(err,res4)=>{
                                    if(err){
                                        res.send({message:err});
                                    }
                                    else{
                                        res.send({submit:true,
                                            nousers:res1,
                                            amount:res2,
                                            totalmilk:res3,
                                            milkprice:res4,
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
        }
    });
});




module.exports=router