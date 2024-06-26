import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import config from "./config";
import cocktailsRouter from "./routers/cocktails";
import usersRouter from "./routers/users";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/cocktails', cocktailsRouter);
app.use('/users', usersRouter);

const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();