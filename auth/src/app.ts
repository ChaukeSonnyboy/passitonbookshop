import express from "express";
import morgan from "morgan";
import logger from "./utils/logger";

import healthCheckRouter from "./routes/healthcheck-route";
import { userRouter } from "./routes/user-route";
import { errorHandler } from "./middlewares/error-middleware";

const morganFormat = ":method :url :status";

const app = express();

app.use(express.json());

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message: string) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use("/api/v1/auth/users", healthCheckRouter);
app.use("/api/v1/auth/users", userRouter);

app.use(errorHandler);

export { app };
