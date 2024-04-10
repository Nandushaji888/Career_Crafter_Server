import { app } from "./app";
import connectDB from "./config/db";

const start = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log("error in connecting the server");
  }
};

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log("server started at 4000");
});

start();
