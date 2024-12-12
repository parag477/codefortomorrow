app.post('/login', (req, res) => {
    const { email, password } = req.body; // Correctly access req.body as an object

    if (!email || !password) {
        return res.status(400).send("Fill all the details");
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("Error in database query", err);
            return res.status(500).send("Internal Server Error");
        }

        if (results.length === 0) {
            return res.status(404).send("No user found");
        }

        const user = results[0];
        const isPassSame = await bcrypt.compare(password, user.password); // Await bcrypt.compare

        if (!isPassSame) {
            return res.status(401).send("Invalid credentials");
        }

        // Generate a JWT token here (example only)
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

        return res.status(200).json({ message: "Login success", token });
    });
});
