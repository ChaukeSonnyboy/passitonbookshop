import mongoose from "mongoose";
import logger from "../utils/logger";

const dbConn = async () => {
  process.env.ACCESS_TOKEN_SECRET = "rfgeuirgvoiwnekjfbf"; //for testing purposes
  process.env.REFRESH_TOKEN_SECRET = "ffewiwlhewuibglwkbgiwl"; //for testing purposes

  try {
    const connectionInstance = await mongoose.connect(
      `mongodb://auth-mongo-service:27017/auth`
    );
    logger.info(
      `Database connected successfully! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    logger.error(`Error in connecting to the database! ${error}`);
    process.exit(1);
  }
};

export { dbConn };
