import { Router, Request, Response } from "express";
import Inventory from "../models/Inventory";
import { auth } from "../middleware/auth";
import { masterOnly } from "../middleware/role";
import { redis } from "../config/redis";
import csv from "csv-parser";
import { Readable } from "stream";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", auth, async (_req: Request, res: Response) => {
  try {
    if (redis) {
      try {
        const cached = await redis.get("inventory");
        if (cached) {
          return res.json(JSON.parse(cached));
        }
      } catch {
      }
    }

    const inventory = await Inventory.find().populate("productId");

    if (redis) {
      try {
        await redis.setex("inventory", 60, JSON.stringify(inventory));
      } catch {
      }
    }

    res.json(inventory);
  } catch (error) {
    console.error("Inventory fetch error:", error);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
});

router.post("/", auth, masterOnly, async (req: Request, res: Response) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.json(inventory);
  } catch {
    res.status(500).json({ message: "Failed to create inventory" });
  }
});

router.post(
  "/upload",
  auth,
  masterOnly,
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "CSV file required" });
      }

      const results: any[] = [];

      const stream = Readable.from(req.file.buffer);

      stream
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          for (const row of results) {
            await Inventory.findOneAndUpdate(
              { productId: row.productId },
              { quantity: Number(row.quantity) },
              { upsert: true }
            );
          }
          

          res.json({
            message: "CSV uploaded successfully",
            recordsProcessed: results.length,
          });
        });
    } catch (error) {
      console.error("CSV upload error:", error);
      res.status(500).json({ message: "CSV upload failed" });
    }
  }
);

router.delete("/:id", auth, masterOnly, async (req: Request, res: Response) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Inventory deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete inventory" });
  }
});



export default router;
