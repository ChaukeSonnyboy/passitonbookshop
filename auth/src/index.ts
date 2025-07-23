import { app } from "./app";
import { dbConn } from "./config/dbConn";
import { InternalServerError, logger } from "@scbooks/common";

const port = 3000;

dbConn()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    throw new InternalServerError(error.message);
  });
