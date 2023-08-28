import express from "express";
import cors from "cors";

import usersRouter from "../routes/usersRouter";
import sessionsRouter from "../routes/sessionsRouter";

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
    }

    listen() {
        return this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
}

export default AppExpress;
