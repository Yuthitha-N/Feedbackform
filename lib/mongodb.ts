import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = process.env.MONGODB_DB || "Feedbackform"

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  try {
    console.log("Connecting to MongoDB...")
    console.log("URI:", uri)
    console.log("Database:", dbName)

    const client = await clientPromise
    const db = client.db(dbName)

    console.log("MongoDB connection successful")
    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw new Error(`MongoDB connection failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function getFeedbackCollection() {
  try {
    const { db } = await connectToDatabase()
    return db.collection("feedback")
  } catch (error) {
    console.error("Failed to get feedback collection:", error)
    throw error
  }
}

export async function getUsersCollection() {
  try {
    const { db } = await connectToDatabase()
    return db.collection("users")
  } catch (error) {
    console.error("Failed to get users collection:", error)
    throw error
  }
}

// Helper function to close connection (useful for testing)
export async function closeConnection() {
  try {
    const client = await clientPromise
    await client.close()
    console.log("MongoDB connection closed")
  } catch (error) {
    console.error("Error closing MongoDB connection:", error)
  }
}

// Database configuration
export const dbConfig = {
  uri,
  dbName,
  collections: {
    feedback: "feedback",
    users: "users",
  },
}

// Type definitions for better TypeScript support
export interface StudentInfo {
  name: string
  rollNo: string
  phoneNo: string
  course: string
  instructorName: string
  location: string
  collegeName: string
}

export interface FeedbackData {
  studentInfo: StudentInfo
  feedback: Record<string, string>
  instructorRating: number
  courseRating: number
  submittedAt: string
  createdAt: Date
}

export interface UserData {
  email: string
  password: string
  createdAt: Date
}
