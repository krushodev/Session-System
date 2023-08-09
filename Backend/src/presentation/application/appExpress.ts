import express from "express";

class AppExpress {
    private app = express();
    private PORT = process.env.NODE_PORT;

    init() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    build() {
    }

    listen() {
        return this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
}

export default AppExpress;
