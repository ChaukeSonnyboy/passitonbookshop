import { app } from "./app";
import { dbConn } from "./config/dbConn";
import { DatabaseConnectionError } from "./errors/db-connection-error";
import logger from "./utils/logger";

dbConn()
  .then(() => {
    app.listen(3000, () => {
      logger.info(`Server is running on port 3000!`);
    });
  })
  .catch((error) => {
    throw new DatabaseConnectionError(error.message);
  });
