import dns from "node:dns";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Ensure SRV DNS lookup succeeds in all environments (including Windows local dev)
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // Ignore if not permitted
}

const mongoUri =
  process.env.MONGODB_URI ||
  process.env.Mongo_url ||
  "mongodb+srv://bazar_dor_app:CXgXUK08Db3DI2KN@cluster0.okwqo0n.mongodb.net/bazardor?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(mongoUri);

// Reuse connected database
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
