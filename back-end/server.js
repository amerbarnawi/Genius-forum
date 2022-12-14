import app from "./app.js";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
