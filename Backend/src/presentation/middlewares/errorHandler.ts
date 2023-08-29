import { NextFunction, Request, Response } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message.includes("not found")) {
        return res.status(404).send({ status: "error", error: err.message });
    }

    else if (err.message.includes("Incorrect" || "has expired")) {
        return res.status(401).send({ status: "error", error: err.message });
    }
    
    else if (err.message.includes("already exist")) {
        return res.status(400).send({ status: "error", error: err.message });
    }

    res.status(500).send({ status: "error", error: err.message ?? "Error. Something went wrong" });
}

export default errorHandler;
