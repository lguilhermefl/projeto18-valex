import express from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routes/router";

import errorHandler from "./middlewares/errorHandlingMiddleware";

const server = express();
server.use(express.json());
server.use(cors());

server.use(router);
server.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 4000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
