import { NextResponse } from "next/server"
import { connectToDatabase, dbConfig } from "@/lib/mongodb"

export async function GET() {
  try {
    console.log("Testing MongoDB connection...")

    const { client, db } = await connectToDatabase()
    console.log("Connected to MongoDB successfully")

    // Test database operations
    const collections = await db.listCollections().toArray()
    console.log(
      "Available collections:",
      collections.map((c) => c.name),
    )

    // Test inserting a sample document
    const testCollection = db.collection("test")
    const testDoc = {
      message: "Connection test successful",
      timestamp: new Date(),
    }

    const result = await testCollection.insertOne(testDoc)
    console.log("Test document inserted with ID:", result.insertedId)

    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId })
    console.log("Test document cleaned up")

    return NextResponse.json({
      success: true,
      message: "MongoDB connection successful",
      database: dbConfig.dbName,
      collections: collections.map((c) => c.name),
      uri: dbConfig.uri,
      config: dbConfig,
    })
  } catch (error) {
    console.error("MongoDB connection error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to MongoDB",
        details: error instanceof Error ? error.message : "Unknown error",
        uri: dbConfig.uri,
      },
      { status: 500 },
    )
  }
}
