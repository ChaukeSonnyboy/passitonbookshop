import { asyncHandler } from "../utils/asyncHandler";

const getHealthCheck = asyncHandler(async (req, res) => {
  res.send(`Your Healthcheck passed, Happy Coding!`);
});

export { getHealthCheck };
