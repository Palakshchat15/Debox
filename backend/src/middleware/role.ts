import { Request, Response, NextFunction } from "express";

export const masterOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req.user as any)?.role !== "MASTER") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
