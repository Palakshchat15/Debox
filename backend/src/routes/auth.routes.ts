import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    role
  });

  res.json(user);
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

export default router;
