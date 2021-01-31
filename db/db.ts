import { config } from '../config/config.ts';
import { MongoClient } from "https://deno.land/x/mongo@v0.20.1/mod.ts";

const client = new MongoClient(); 
await client.connect({
    servers: [{ host: config.DB_URL , port: 27017 }],
  });
console.log(client)
export const db = client.database("Cluster0");