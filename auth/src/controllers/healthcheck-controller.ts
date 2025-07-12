import { asyncHandler } from "../utils/asyncHandler";
import { CustomResponse } from "../utils/CustomResponse";

const getHealthCheck = asyncHandler(async (req, res) => {
  res.send(`Your Healthcheck passed, Happy Coding!`);
});

export { getHealthCheck };
