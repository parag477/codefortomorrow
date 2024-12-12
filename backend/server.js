const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();
const port = 5000;
const JWT_SECRET = '621670bb209691bcf1287c37da5dd4567ea31d694e7149b1f97113ed72beae69';
const RESET_TOKEN_EXPIRY = 5 * 60 * 1000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'codefortomorrow'
});

db.connect((err) => {
    if (err) {
        console.log("There is an error", err);
    }
    else {
        console.log("DB connection successful");
    }
});

app.post('/signup', async (req, res) => {
    // first, last, email, pass - every field is mandatory
    const {first, last, email, password} = req.body;

    if (!first || !last || !email || !password) {
        console.log("Every field is mandatory");
        return res.status(400).send("All field are mandatory");
    }

    
    try {
        const hashedPass = await bcrypt.hash(password, 10);
    
        const sql = `INSERT INTO users (first, last, email, password) VALUES (?, ? ,? ,?)`;

        db.query(sql, [first, last, email, hashedPass], (err) => {
            if (err) {
                console.log("Theres some error in the database insertion");
                return res.status(400).send("Some error in insertion");
            }
            
            res.status(201).send("User registered successfully");
        });
    } catch(error) {
        res.status(500).send('Error in creation of user');
    }
})


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Fill all the details");
    }

    const sql = "SELECT * FROM users WHERE email = ?"

    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.log("Theres some error in the database insertion");
            return res.status(500).send("Some error in insertion");
        }
        if (result.length == 0) {
            return res.status(404).send("No user found");
        }

        const user = result[0];
        const isPassSame = await bcrypt.compare(password, user.password);
        if (!isPassSame) {
            return res.status(401).send("Invalid credentials");
        }
        
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

        return res.status(200).json({ message: "Login success", token });
    });
});


app.get('/user', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const sql = "SELECT id, first, last, email FROM users WHERE id = ?";
        db.query(sql, [decoded.id], (err, result) => {
            if (err || result.length === 0) {
                return res.status(404).send("User not found");
            }
            res.status(200).json(result[0]);
        });
    } catch (error) {
        res.status(401).send("Invalid token");
    }
});



app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("Email is required");
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send("User not found");
        }

        const resetToken = jwt.sign({ id: results[0].id }, JWT_SECRET, { expiresIn: '5m' });
        const resetLink = `http://localhost:5000/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'paragagrawal2003@gmail.com',
                pass: 'my_pass'
            }
        });

        const mailOptions = {
            from: 'paragagrawal2003@gmail.com',
            to: email,
            subject: 'Reset Your Password',
            text: `Click this link to reset your password: ${resetLink}`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).send("Error sending reset email");
            }
            res.status(200).send("Password reset link sent to your email");
        });
    });
});



app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
        return res.status(400).send("All fields are required");
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const sql = "UPDATE users SET password = ? WHERE id = ?";
        db.query(sql, [hashedPassword, decoded.id], (err) => {
            if (err) {
                return res.status(500).send("Error updating password");
            }
            res.status(200).send("Password reset successful");
        });
    } catch (error) {
        res.status(400).send("Invalid or expired token");
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})


// Create an API for signup with fields:
// * First Name
// * Last Name
// * Email
// * Password
// - Create an API for JWT token based login.
// - Create an API to get user details from the server.
// - Create an API & Secure flow to forget a password.
// - Document all the API on postman.
// - Passwords on DB should not be in the plain text format.

// - Users are able to sign up using unique email only.
// - Users are able to login & get JWT tokens as a success response.

// - Users are able to forget their password via reset password link on email.
// - Reset password link should be valid till 5 min from the requested time.
// - Whenever a user clicks on a valid reset password link, it should redirect to the web page with the 2 input fields - (New Password & Confirm Password) and submit button.
// - After clicking on submit, it should update the target user password & Hide the input fields & submit button and show a success message on the screen.
// - Users are able to login with a new password.