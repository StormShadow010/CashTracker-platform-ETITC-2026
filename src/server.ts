import { app } from ".";
import { env } from "./config/env";
import { connectDB } from "./config/database";

const bootstrap = async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
};

bootstrap();
