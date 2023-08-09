import dotenv from "dotenv";

import AppFactory from "./presentation/factories/appFactory";

dotenv.config();

interface ServerApplication {
    init: () => void;
    build: () => void;
    listen: () => void;
}

void (async () => {
    const app: ServerApplication = AppFactory.create(process.env.NODE_APPLICATION);
    app.init();
    app.build();
    app.listen();
})();
