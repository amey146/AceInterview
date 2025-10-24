import express from "express";
import UserProgress from "../models/UserProgress.js";
const router = express.Router();
router.get("/reports", async (req, res) => {
    const { from, to, userId } = req.query;
    try {

        const start = new Date(from);
        const end = new Date(to);
        end.setHours(23, 59, 59, 999);

        const reports = await UserProgress.find({
            username: userId,
            date: { $gte: start, $lte: end },
        });

        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
