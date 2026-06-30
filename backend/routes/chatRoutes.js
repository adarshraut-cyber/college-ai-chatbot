const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {

    const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
            message: req.body.message
        }
    );

    res.json(response.data);

});

module.exports = router;