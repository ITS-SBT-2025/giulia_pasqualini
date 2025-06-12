import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
router.get("/about", (req, res) => {
    res.status(200).send("About");
});
router.get("/dream", (req, res) => {
    res.status(200).send("I want to go home, please.");
});

export default router;