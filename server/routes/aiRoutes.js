import express from "express";
import { getAIQuestion, getFinalReport, isProfessionalEngineer, getAISummary } from "../aiClient.js";

const router = express.Router();
router.post("/question", async (req, res) => {
    try {
        const { role, level, quantity } = req.body;

        // If frontend sends only string role, wrap it into an object
        const selectedRole =
            typeof role === "string"
                ? {
                    mainRole: role,
                    technologies: ["Network Security", "Cryptography", "Ethical Hacking"]
                }
                : role;

        const questions = await getAIQuestion(selectedRole, level, quantity);
        res.json({ questions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate question" });
    }
});


router.post("/report", async (req, res) => {
    try {
        const { responses } = req.body;
        const report = await getFinalReport(responses);
        res.json(report);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate report" });
    }
});

router.post("/summarize", async (req, res) => {
    try {
        const { text } = req.body;
        const summary = await getAISummary(text);
        res.json({ summary });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate summary" });
    }
});

router.post("/validateRole", async (req, res) => {
    try {
        const { role } = req.body;
        const result = await isProfessionalEngineer(role);
        res.json({ result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to evaluate role" });
    }
});

export default router;
