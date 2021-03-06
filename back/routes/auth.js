const express = require("express")

const router = express.Router()
const { login, register, me } = require("../controllers/auth")
const { auth } = require("../middleware/auth")

router.post("/register", register)
router.post("/login", login)
router.get("/me", auth, me)

module.exports = router
