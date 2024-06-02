import express from "express";
import cors from "cors";

import { router as tonProofRouter } from "./routes/tonProof";
import { router as dappRouter } from "./routes/dapp";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/ton-proof", tonProofRouter);
app.use("/dapp", dappRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
