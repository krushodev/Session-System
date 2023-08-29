import express from "express";
import cors from "cors";

import usersRouter from "../routes/usersRouter";
import sessionsRouter from "../routes/sessionsRouter";
import errorHandler from "../middlewares/errorHandler";

class AppExpress {
    private app = express();
    private PORT = process.env.NODE_PORT;

    init() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    build() {
        this.app.use("/api/users", usersRouter);
        this.app.use("/api/sessions", sessionsRouter);
        this.app.use(errorHandler);
    }

    listen() {
        return this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
}

export default AppExpress;
