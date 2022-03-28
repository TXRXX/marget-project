const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routesAuth = require("./routes/Auth");
const routesUser = require("./routes/User");
const routesShops = require("./routes/shops");
const routesDashboard = require("./routes/dashboard");
const cookieParser = require("cookie-parser");
const { cloudinary } = require("./utils/cloudinary");
require("dotenv").config();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,accesstoken');
    next();
});

mongoose.connect(process.env.MONGOOSE_URI)
    .then(() => console.log(":: Connected to Database"))
    .catch((error) => console.log(":: Cannot Connect to Database"));

app.use(routesAuth);
app.use(routesUser);
app.use(routesShops);
app.use(routesDashboard);

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.
            upload(fileStr, {
                upload_preset: 'dnfqteyc'
            });
        res.status(200).json(uploadedResponse);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

const PORT = process.env.PORT || 4000;

// Starting Server
app.listen(PORT, () => {
    console.log(":: Server Started at port", PORT);
});

