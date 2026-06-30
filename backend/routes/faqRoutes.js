const express = require("express");
const router = express.Router();

const Faq = require("../models/Faq");

router.post("/", async (req, res) => {

    const faq = new Faq(req.body);

    await faq.save();

    res.json(faq);

});

router.get("/", async (req, res) => {

    const faqs = await Faq.find();

    res.json(faqs);

});

// Delete FAQ
router.delete("/:id", async (req, res) => {

    await Faq.findByIdAndDelete(req.params.id);

    res.json({
        message: "FAQ deleted successfully"
    });

});

//Update FAQ
router.put("/:id", async (req, res) => {

    const updatedFAQ = await Faq.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedFAQ);

});

module.exports = router;