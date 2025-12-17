import { Router, Request, Response } from "express";
import Category from "../models/Category";
import { auth } from "../middleware/auth";
import { masterOnly } from "../middleware/role";
import { redis } from "../config/redis";

const router = Router();

router.get("/", auth, async (_req: Request, res: Response) => {
  try {
    if (redis) {
      try {
        const cached = await redis.get("categories");
        if (cached) {
          return res.json(JSON.parse(cached));
        }
      } catch {
      }
    }

    const categories = await Category.find().populate("products");

    if (redis) {
      try {
        await redis.setex("categories", 60, JSON.stringify(categories));
      } catch {
      }
    }

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

router.post("/", auth, masterOnly, async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category" });
  }
});

router.delete("/:id", auth, masterOnly, async (req: Request, res: Response) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
