import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { router as tonProofRouter } from "./routes/tonProof";
import { router as dappRouter } from "./routes/dapp";

const app = express();
const port = 3000;

app.use(cors());
// To work with the [ton-connect/demo-dapp-with-backend example](https://github.com/ton-connect/demo-dapp-with-backend),
// which sends JSON requests with content-type: text/plain.
// In a real application, you can probably omit using body-parser and use express.json.
app.use(bodyParser.json({ type: ["application/json", "text/plain"] }));

app.use("/ton-proof", tonProofRouter);
app.use("/dapp", dappRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
