import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth.route";
import parcelRouter from "./routes/parcel.route";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/parcels", parcelRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
