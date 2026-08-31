import app from "./app.js";
import 'dotenv/config'
import { connectDb } from "./config/db.js";

const PORT = process.env.PORT || 5000
connectDb()

app.listen(PORT, () => {
    console.log(`server is running on this http://localhost:${PORT}`);
})