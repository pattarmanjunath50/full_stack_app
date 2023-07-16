import { Config, JsonDB } from "node-json-db";
import { CONFIG } from "./config";

export const DB = {
    enquiries: new JsonDB(new Config(`${CONFIG.DB_HOST}/enquiries`, true, true, '/'))
};