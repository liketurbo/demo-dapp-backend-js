import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SHARED_SECRET } from "../constants";

export const router = express.Router();

router.get("/getAccountInfo", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "authorization header is missing" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "token is missing" });
    return;
  }

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, SHARED_SECRET) as JwtPayload;
  } catch {
    res.status(401).json({ error: "invalid token" });
    return;
  }

  if (!decoded.address) {
    res.status(400).json({ error: "address is missing in token" });
    return;
  }

  res.json({ address: decoded.address });
});
