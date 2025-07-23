import mongoose from "mongoose";
import { logger } from "@scbooks/common";

const dbConn = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI!}`
    );
    logger.info(
      `Database connected successfully! DB Host:
       ${connectionInstance.connection.host}`
    );
  } catch (error) {
    logger.error(`Error in connecting to the database! ${error}`);
    process.exit(1);
  }
};

export { dbConn };
