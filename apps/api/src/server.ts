import app from "./app.js";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

connectDB()

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});