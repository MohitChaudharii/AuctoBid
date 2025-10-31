import express from "express";
import { config } from "dotenv";
import cors from "cors"; //connect to frontend
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRouter.js";
import auctionItemRoutes from "./router/auctionItemRoutes.js";
import bidRoutes from "./router/bidRoutes.js";
import commissionRoutes from "./router/commissionRoutes.js";
import superAdminRoutes from "./router/superAdminRoutes.js";
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";

const app = express();
config({
  path: "./config/config.env",
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json()); // convert into json file
app.use(express.urlencoded({ extended: true })); //array finding the show error
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
); //storing the data to cloudinary

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRoutes);
app.use("/api/v1/bid", bidRoutes);
app.use("/api/v1/commission", commissionRoutes);
app.use("/api/v1/superadmin", superAdminRoutes);

endedAuctionCron();
verifyCommissionCron();

connection();
app.use(errorMiddleware);

export default app;
