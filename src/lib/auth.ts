import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const directMongoUri =
  "mongodb://bazar_dor_app:CXgXUK08Db3DI2KN@ac-yccslu3-shard-00-00.okwqo0n.mongodb.net:27017,ac-yccslu3-shard-00-01.okwqo0n.mongodb.net:27017,ac-yccslu3-shard-00-02.okwqo0n.mongodb.net:27017/bazardor?ssl=true&replicaSet=atlas-qw8asw-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoUri = process.env.MONGODB_URI || directMongoUri;

const client = new MongoClient(mongoUri);
const db = client.db("bazardor");

// Always define google and github providers.
// If actual credentials aren't in env, placeholder values allow BetterAuth
// to register the provider endpoints without throwing PROVIDER_NOT_FOUND.
const googleClientId =
  process.env.GOOGLE_CLIENT_ID || "demo-google-client-id.apps.googleusercontent.com";
const googleClientSecret =
  process.env.GOOGLE_CLIENT_SECRET || "demo-google-client-secret";

const githubClientId = process.env.GITHUB_CLIENT_ID || "demo-github-client-id";
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET || "demo-github-client-secret";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "bazar-dor-secret-key-for-auth-2026",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
    github: {
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    },
  },
  trustedOrigins: ["http://localhost:3000"],
});
