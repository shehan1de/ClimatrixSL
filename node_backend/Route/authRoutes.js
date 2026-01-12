const express = require("express");
const {
    registerUser,
    login,
    requestPasswordReset,
    resetPassword
} = require("../Controller/authController");

const { validateRegistration, validateLogin } = require("../Middleware/validationMiddleware");

const router = express.Router();

console.log("Loading Authentication Routes...");

router.get("/", (req, res) => {
    res.json({ message: "Auth Routes Working!" });
});

router.post("/register", validateRegistration, registerUser);
router.post("/login", validateLogin, login);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

module.exports = router;
