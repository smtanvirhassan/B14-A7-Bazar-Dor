import { MongoClient } from "mongodb";

const directMongoUri =
  "mongodb://bazar_dor_app:CXgXUK08Db3DI2KN@ac-yccslu3-shard-00-00.okwqo0n.mongodb.net:27017,ac-yccslu3-shard-00-01.okwqo0n.mongodb.net:27017,ac-yccslu3-shard-00-02.okwqo0n.mongodb.net:27017/bazardor?ssl=true&replicaSet=atlas-qw8asw-shard-0&authSource=admin&retryWrites=true&w=majority";

const uri = process.env.MONGODB_URI || process.env.Mongo_url || directMongoUri;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
export const getDatabase = async () => {
  const connectedClient = await clientPromise;
  return connectedClient.db();
};
