const {Router} = require("express")
const router = Router();
const pool = require("./db")

router.get("/", async (req, res) => {
 try {
    const {rows} = await pool.query("SELECT * from users");
    res.json({data: rows});

 }
 
catch (err) {
    console.log(err.message);
    res.sendStatus(404)

 }
   
});

module.exports = router;