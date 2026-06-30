require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("MongoDB Connected");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const existingAdmin = await Admin.findOne({
        email: "admin@college.com"
    });

    if(existingAdmin){

        console.log("Admin already exists");

        process.exit();

    }

    const admin = new Admin({

        email: "admin@college.com",

        password: hashedPassword

    });

    await admin.save();

    console.log("Admin Created Successfully");

    process.exit();

})
.catch(err => {

    console.log(err);

});