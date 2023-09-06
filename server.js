const express = require ("express")
const mysql = require ("mysql")
const BodyParser = require("body-parser")
const app = express();

app.use(BodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views", "tampilan")

const db =mysql.createConnection({
    host: "localhost",
    database: "db_siswa",
    user: "root",
    password: "",
})

db.connect((err) => {
    if (err) throw err
    console.log('database connected..')

    const sql = "SELECT * FROM db_siswa"
    db.query(sql, (err, result) => {
        const datasiswa = JSON.parse(JSON.stringify(result))
        console.log("hasil database -> ", datasiswa)
        
        // tampil data
        app.get("/", (req, res) => {
            res.render("index", {datasiswa: datasiswa, title: "Tabel Data Siswa"})
        })

        // tambah data
        app.post("/tambah", (req, res) => {
            const insertSql = ' INSERT INTO db_siswa (id, nama, kelas, jurusan) VALUES ("${req.body.id}", "${req.body.nama}", "${req.body.kelas}", "${req.body.jurusan}" );'
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/");
        } )
        })
    })
})



app.listen(3909, () =>{
    console.log("server ready...")
})