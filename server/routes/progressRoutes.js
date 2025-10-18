import express from "express";
import UserProgress from "../models/UserProgress.js";
const router = express.Router();

// Save user progress
router.post("/save", async (req, res) => {
    try {
        const newProgress = new UserProgress(req.body);
        await newProgress.save();
        res.status(201).json({ message: "Progress saved!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await UserProgress.aggregate([
            { $group: { _id: "$username", avgScore: { $avg: "$score" } } },
            { $sort: { avgScore: -1 } },
            { $limit: 10 }
        ]);
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
