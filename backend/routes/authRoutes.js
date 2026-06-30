const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const router = express.Router();

// Login
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {

        return res.status(401).json({
            message: "Invalid email or password"
        });

    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {

        return res.status(401).json({
            message: "Invalid email or password"
        });

    }

    const token = jwt.sign(

        {
            id: admin._id
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "1d"
        }

    );

    res.json({

        message: "Login Successful",

        token

    });

});

module.exports = router;