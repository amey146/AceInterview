const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const router = express.Router();

// GET /user/profile
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: "Server error fetching profile" });
    }
});

// PUT /user/update
router.put("/update", auth, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updates = {};

        if (name) updates.name = name;
        if (email) updates.email = email;
        if (password) updates.password = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");

        res.json({ message: "Profile updated", user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: "Server error updating profile" });
    }
});

module.exports = router;
