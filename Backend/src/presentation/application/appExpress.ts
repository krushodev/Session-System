import express from "express";
import usersRouter from "../routes/usersRouter";

class AppExpress {
    private app = express();
    private PORT = process.env.NODE_PORT;

    init() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    build() {
        this.app.use("/api/users", usersRouter);
    }

    listen() {
        return this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
}

export default AppExpress;
