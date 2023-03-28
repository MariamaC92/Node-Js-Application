const {Router} = require("express")
const router = Router();
const pool = require("./db")


// users 

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

router.get("/user/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query ("SELECT * FROM users WHERE id=$1;", [id]);
        res.json({data: rows});

    } catch (err) { 
        console.log(err.message)
        res.sendStatus(500);}
})

router.post("/users", async (req, res) => {
    const {firstname, lastname, age} = req.body;
    try {
        const {rows} = await pool.query("INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *", [firstname, lastname, age]);
        res.send({data: rows});
    } catch(err) {
        res.sendStatus(400);
    }
})

router.put("/users/:id", async (req, res) => {
    const {id} = req.params;
    const {firstname} = req.body;
    try {
        const {rows} = await pool.query("UPDATE users SET first_name= $1 WHERE id=$2 RETURNING *", [firstname, id] );
        res.json({data: rows});
    } catch {
        res.sendStatus(404);
    }
})

router.delete("/users/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.send({message: `user with id ${id} deleted`})
    } catch (err){ 
        res.sendStatus(400);
    }
})

// orders

router.get("/orders",async (req, res) => {
    try{
        const {rows} = await pool.query("SELECT * FROM orders")
        res.json({data: rows});
    } catch {
        res.sendStatus(404);
    }
})

router.get("/orders/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query("SELECT * FROM orders WHERE id=$1", [id])
        res.send({data: rows});
    } catch(err) {
        res.sendStatus(500);
    }
})

router.post("/orders", async (req, res) => {
    try{
        const { price, date, user_id } = req.body;
        const {rows} = await pool.query("INSERT INTO orders (price, date, user_id) VALUES ($1, $2,$3) RETURNING *" [price, date, user_id])
        res.json({data: rows});
    } catch (err){ res.sendStatus(404)}
})




module.exports = router;