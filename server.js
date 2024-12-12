const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;

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

app.get('/', (req, res) => {
    console.log("Running successfully");
})

app.post('/signup', (req, res) => {
    // first, last, email, pass - every field is mandatory
    const {first, last, email, password} = res.body;

    if (!first || !last || !email || !password) {
        console.log("Every field is mandatory");
        return res.status(400).send("All field are mandatory");
    }

    const hashedPass = bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (first, last, email, password) VALUES (?, ? ,? ,?)`;

    try {
        db.query(sql, [first, last, email, hashedPass], (err, res) => {
            if (err) {
                console.log("Theres some error in the database insertion");
                return res.status(400).send("Some error in insertion");
            }
            
            return res.status(201).send("User registered successfully");
        });
    } catch(error) {
        res.status(400).send('Error in creation of user');
    }
})


app.post('/login', (req, res) => {
    const { email, password } = req.body();

    if (!email || !password) {
        res.status(400).send("Fill all the details");
    }

    const sql = "SELECT * FROM users WHERE email = ?"

    db.query(sql, [email], (err, res) => {
        if (err) {
            console.log("Theres some error in the database insertion");
            return res.status(400).send("Some error in insertion");
        }
        if (res.length() == 0) {
            return res.status(400).send("No user found");
        }

        const user = res[0];
        const isPassSame = bcrypt.compare(password, user.password);
        if (!isPassSame) {
            return res.status(400).send("Invalid credentials");
        }
        
        return res.status(201).send("Login success");
    });
    


})


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