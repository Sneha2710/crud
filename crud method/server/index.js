const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const bodyparser = require("body-parser")

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shnega2000',
    database: 'stud'
});

con.connect(function (err) {
    if (err) throw err;
    console.log(" Database connected");
    // const sql="INSERT INTO emp(name,email,doj) VALUES ('sawfon','sawfon@gmail.com','2021/10/01')";
    // con.query(sql,function(err){
    // if(err) throw err;
    // console.log("Inserted");
    // });
});

app.get("/get", (req, res) => {
    const sqlget = "SELECT * FROM detail";
    con.query(sqlget, (error, result) => {
        res.send(result);
    });
});

// app.post("/api/post",(req,res)=>{
//     const {name,email,date}=req.body;
//     const sql="INSERT INTO emp (name,email,date) VALUES (?,?,?)";
//     con.query(sql,[name,email,date],(error,result)=>{
//         if(error){
//             console.log(error);
//         }
//     });
// });


app.post("/api/post", (req, res) => {
    console.log('req', req);
    console.log('req.body', req.body);
    let name1 = req.body.name;
    let email1 = req.body.email;
    let date1 = req.body.date;

    const sql = "INSERT INTO detail(name,email,doj) VALUES(?,?,?)";
    con.query(sql, [name1, email1, date1], (error, result) => {
        if (error) {
            let s = { "status": "error" };
            console.log(error);
            res.send(s);
        }
        else {
            let s = { "status": "inserted" };
            console.log(result);
            res.send(s);
        }
    });

});




app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sqldelete = "DELETE FROM detail WHERE id=?";

    con.query(sqldelete, id, (error, result) => {
        if (error) {
            let s = { "status": "error" };
            res.send(s);
        }
        else {
            let s = { "status": "deleted" };
            res.send(s);
        }
    });
});



// app.put('/update',(req,response)=>{
//     const name=req.body.name
//     const email=req.email
//     const date=req.date

//     let slq =`UPDATE emp SET name=?,email=?,doj=? where id=?`;
//     con.query(sql,[name,email,date],(err,res)=>{
//         if(err){
//             let s={"status":"err"}
//             res.send(s);
//         }
//         else{
//             let s={'status':"updated"}
//             res.send(s);
//         }
//     })
// })

app.get('/Edit/:id', (request, response) => {
    let { id } = request.params;
    console.log("req", id)
    let sql = 'SELECT * FROM detail WHERE id=?';
    con.query(sql, [id], (error, result) => {
        if (error) {
            response.send(error);
        }
        else {
            console.log('result', result)
            response.send(result);
        }
    })
})

app.put('/update', (request, response) => {
    console.log("body", request.body)
    console.log("query", request.query)
    let { name, email, date } = request.body;
    let { id } = request.query;

    let sql = 'UPDATE detail SET name=?,email=?,doj=? WHERE  id=? ';

    con.query(sql, [name, email, date, id], (error, result) => {
        console.log("result",result)
        console.log("error",error)
        if (error) {
            let s = { "status": "error" };
            response.send(s);
        }
        else {
            let s = { "status": "success" };
            response.send(s);
        }
    })

})



app.listen(3002);


