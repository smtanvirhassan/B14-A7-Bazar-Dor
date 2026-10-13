import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  const envStatus = {
    hasBetterAuthSecret: Boolean(process.env.BETTER_AUTH_SECRET),
    betterAuthUrl: process.env.BETTER_AUTH_URL || "(not set)",
    hasMongoUri: Boolean(process.env.MONGODB_URI),
    mongoUriPrefix: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 15) + "..." : "(not set)",
    hasGoogleId: Boolean(process.env.GOOGLE_CLIENT_ID),
    hasGithubId: Boolean(process.env.GITHUB_CLIENT_ID),
    vercelUrl: process.env.VERCEL_URL || "(not set)",
  };

  const directMongoUri =
    "mongodb://bazar_dor_app:CXgXUK08Db3DI2KN@ac-yccslu3-shard-00-00.okwqo0n.mongodb.net:27017,ac-yccslu3-shard-00-01.okwqo0n.mongodb.net:27017,ac-yccslu3-shard-00-02.okwqo0n.mongodb.net:27017/bazardor?ssl=true&replicaSet=atlas-qw8asw-shard-0&authSource=admin&retryWrites=true&w=majority";

  const srvMongoUri =
    "mongodb+srv://bazar_dor_app:CXgXUK08Db3DI2KN@cluster0.okwqo0n.mongodb.net/bazardor?retryWrites=true&w=majority&appName=Cluster0";

  const uriToTest = process.env.MONGODB_URI || directMongoUri;

  let dbResult: any = null;
  try {
    const client = new MongoClient(uriToTest, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    const db = client.db("bazardor");
    const collections = await db.listCollections().toArray();
    await client.close();
    dbResult = {
      connected: true,
      collections: collections.map((c) => c.name),
    };
  } catch (err: any) {
    dbResult = {
      connected: false,
      error: err?.message || String(err),
      name: err?.name,
    };
  }

  return NextResponse.json({
    env: envStatus,
    db: dbResult,
    timestamp: new Date().toISOString(),
  });
}
