import express from "express";

import userRoute from "./routes/userRoute";
import bookRoute from "./routes/bookRoute"

const app = express();
app.use(express.json());

app.use("/api/users", userRoute); 
app.use("/api/books/", bookRoute);

app.listen(3000, () => {
  console.log(`server is running on port 3000!`);
 });
