import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Direct replica-set connection string ensures reliable connection on all OS environments
// avoiding Windows Node.js libuv SRV lookup failure (querySrv ECONNREFUSED)
const directMongoUri =
  "mongodb://bazar_dor_app:CXgXUK08Db3DI2KN@ac-yccslu3-shard-00-00.okwqo0n.mongodb.net:27017,ac-yccslu3-shard-00-01.okwqo0n.mongodb.net:27017,ac-yccslu3-shard-00-02.okwqo0n.mongodb.net:27017/bazardor?ssl=true&replicaSet=atlas-qw8asw-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoUri = process.env.MONGODB_URI || directMongoUri;

const client = new MongoClient(mongoUri);
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "bazar-dor-secret-key-for-auth-2026",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      enabled: !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    },
  },
  trustedOrigins: ["http://localhost:3000"],
});
