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



module.exports = router;