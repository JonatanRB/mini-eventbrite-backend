import { connectMongo } from "./db/mongo";
import { env } from "./config/env";

//const app = build();
connectMongo().then(() => {
    app.listener(env.port, () => {
        console.log(`[HTTP] Listening on :${env.port}`);
    });
}).catch ((err) => {
    console.error(`[DB] Fail to connect ${err}`);
    process.exit(1);
})