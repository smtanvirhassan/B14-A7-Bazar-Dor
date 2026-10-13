import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const directMongoUri =
  "mongodb://bazar_dor_app:CXgXUK08Db3DI2KN@ac-yccslu3-shard-00-00.okwqo0n.mongodb.net:27017,ac-yccslu3-shard-00-01.okwqo0n.mongodb.net:27017,ac-yccslu3-shard-00-02.okwqo0n.mongodb.net:27017/bazardor?ssl=true&replicaSet=atlas-qw8asw-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoUri = process.env.MONGODB_URI || directMongoUri;

const client = new MongoClient(mongoUri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
});
const db = client.db("bazardor");

const googleClientId =
  process.env.GOOGLE_CLIENT_ID || "demo-google-client-id.apps.googleusercontent.com";
const googleClientSecret =
  process.env.GOOGLE_CLIENT_SECRET || "demo-google-client-secret";

const githubClientId = process.env.GITHUB_CLIENT_ID || "demo-github-client-id";
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET || "demo-github-client-secret";

const getBaseURL = () => {
  if (process.env.BETTER_AUTH_URL && !process.env.BETTER_AUTH_URL.includes("localhost")) {
    return process.env.BETTER_AUTH_URL;
  }
  if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NODE_ENV === "production") {
    return "https://bazar-dor-app-vert.vercel.app";
  }
  return process.env.BETTER_AUTH_URL || "http://localhost:3000";
};

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "bazar-dor-secret-key-for-auth-2026",
  baseURL: getBaseURL(),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      requireLocalEmailVerified: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
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
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://bazar-dor-app-vert.vercel.app",
    "https://bazardorapp-liart.vercel.app",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
    "https://*.vercel.app",
  ],
});
