"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Design_1 = __importDefault(require("../models/Design"));
const router = express_1.default.Router();
// GET /api/designs
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const designs = yield Design_1.default.find().sort({ createdAt: -1 });
        res.json(designs);
    }
    catch (error) {
        console.error("Error fetching designs:", error);
        res.status(500).json({
            message: "Error fetching designs",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}));
// POST /api/designs
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, tailwindClasses, content, userId } = req.body;
        const newDesign = new Design_1.default({ title, tailwindClasses, content, userId });
        const savedDesign = yield newDesign.save();
        res.status(201).json(savedDesign);
    }
    catch (error) {
        res.status(500).json({ message: "Error saving design" });
    }
}));
// PUT /api/designs/:id
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, tailwindClasses, content } = req.body;
        const updatedDesign = yield Design_1.default.findByIdAndUpdate(req.params.id, { title, tailwindClasses, content }, { new: true });
        if (!updatedDesign) {
            res.status(404).json({ message: "Design not found" });
            return;
        }
        res.json(updatedDesign);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating design" });
    }
}));
// DELETE /api/designs/:id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDesign = yield Design_1.default.findByIdAndDelete(req.params.id);
        if (!deletedDesign) {
            res.status(404).json({ message: "Design not found" });
            return;
        }
        res.json({ message: "Design deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting design" });
    }
}));
exports.default = router;
