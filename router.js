const {Router} = require("express")
const router = Router();
const pool = require("./db")

router.get("/", async (req, res) => {
 try {
    const {rows} = await pool.query("SELECT * from users");
    res.json({data: rows});

 }
 
catch (err) {
    // console.log(err.message);
    res.sendStatus(404)

 }
   
});

router.get("/api/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query ("SELECT * FROM users WHERE id=$1;", [id]);
        res.json({data: rows});

    } catch (err) { 
        console.log(err.message)
        res.sendStatus(500);}
})

router.post("/", async (req, res) => {
    const {firstname, lastname, age} = req.body;
    try {
        const {rows} = await pool.query("INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *", [firstname, lastname, age]);
        res.send({data: rows});
    } catch(err) {
        res.sendStatus(400);
    }
})



module.exports = router;