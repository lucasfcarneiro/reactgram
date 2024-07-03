const express = require("express")
const router = express.Router()

router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));

//test route
router.get("/", (req, res) => {
res.send("API Working")
})
module.exports = router