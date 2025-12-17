import { Router, Request, Response } from "express";
import Product from "../models/Product";
import { auth } from "../middleware/auth";
import { masterOnly } from "../middleware/role";
import { redis } from "../config/redis";

const router = Router();

router.get("/", auth, async (_req, res) => {
  try {
    if (redis && redis.status === "ready") {
      const cached = await redis.get("products");
      if (cached) {
        return res.json(JSON.parse(cached));
      }
    }

    const products = await Product.find().populate("categories");

    if (redis && redis.status === "ready") {
      await redis.setex("products", 60, JSON.stringify(products));
    }

    res.json(products);
  } catch (err) {
    console.error("Products fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.post("/", auth, masterOnly, async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.json(product);
});

router.put("/:id", auth, masterOnly, async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
});

router.delete("/:id", auth, masterOnly, async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
