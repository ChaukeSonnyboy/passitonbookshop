import { asyncHandler } from "@scbooks/common";

const getHealthCheck = asyncHandler(async (req, res) => {
  res.send(`Your Healthcheck passed, Happy Coding!`);
});

export { getHealthCheck };
