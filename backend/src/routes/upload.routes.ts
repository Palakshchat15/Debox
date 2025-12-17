import { Router, Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import csv from "csv-parser";

import Product from "../models/Product";
import Category from "../models/Category";
import Inventory from "../models/Inventory";
import { auth } from "../middleware/auth";
import { masterOnly } from "../middleware/role";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  auth,
  masterOnly,
  upload.single("file"),
  async (req: Request, res: Response) => {
    fs.createReadStream(req.file!.path)
      .pipe(csv())
      .on("data", async (row) => {
        const category = await Category.findOneAndUpdate(
          { name: row["Category Name"] },
          { description: row["Category Description"] },
          { upsert: true, new: true }
        );

        const product = await Product.create({
          name: row["Product Name"],
          description: row["Product Description"],
          price: Number(row["Product Price"]),
          stock: Number(row["Available Units"]),
          categories: [category!._id],
        });

        await Inventory.create({
          productId: product._id,
          available: Number(row["Available Units"]),
          sold: Number(row["Sold Units"]),
        });
      });

    res.json({ message: "CSV uploaded successfully" });
  }
);

export default router;
