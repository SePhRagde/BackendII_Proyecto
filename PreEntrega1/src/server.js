import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/auth.routes.js";
import { initializePassport } from "./config/passport.config.js";

const app = express();
const PORT = 8080;

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded( { extended: true}));

initializePassport();
app.use(passport.initialize());

const mongoURI = "mongodb+srv://sephragde:<db_password>@finalbackendi.gujqk.mongodb.net/"

mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error))

app.use("/api/sessions", authRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));