import express, { type Application, type Request, type Response } from "express";
const app : Application = express();


app.get("/", (req : Request, res : Response) => {
    res.send("Hello World!");
});



// export app to be used in server.ts
export default app;