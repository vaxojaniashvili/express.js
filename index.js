import express from "express";
import { port } from "./constants/common.js";
import { router } from "./routes/apiRoutes.js";

const app = express();
app.use(express.json());

app.get("/api/users", router);

app.get("/api/users/:id", router);

app.post("/api/users", router);
app.put("/api/users", router);

app.patch("/api/users", router);

app.delete("/api/users", router);

app.listen(port, () => {
  console.log(`App running port ${port}`);
});
