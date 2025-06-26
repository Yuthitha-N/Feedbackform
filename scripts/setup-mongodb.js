const { MongoClient } = require("mongodb")

const uri = "mongodb://localhost:27017"
const dbName = "Feedbackform"

async function setupDatabase() {
  const client = new MongoClient(uri)

  try {
    console.log("Connecting to MongoDB...")
    await client.connect()
    console.log("Connected successfully to MongoDB")

    const db = client.db(dbName)

    // Create collections if they don't exist
    const collections = ["feedback", "users"]

    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName)
        console.log(`✅ Created collection: ${collectionName}`)
      } catch (error) {
        if (error.code === 48) {
          console.log(`✅ Collection ${collectionName} already exists`)
        } else {
          console.error(`❌ Error creating collection ${collectionName}:`, error.message)
        }
      }
    }

    // Create indexes for better performance
    const feedbackCollection = db.collection("feedback")
    await feedbackCollection.createIndex({ "studentInfo.course": 1 })
    await feedbackCollection.createIndex({ "studentInfo.instructorName": 1 })
    await feedbackCollection.createIndex({ createdAt: -1 })
    console.log("✅ Created indexes for feedback collection")

    const usersCollection = db.collection("users")
    await usersCollection.createIndex({ email: 1 }, { unique: true })
    console.log("✅ Created indexes for users collection")

    console.log("🎉 Database setup completed successfully!")

    // Test data insertion
    const testFeedback = {
      studentInfo: {
        name: "Test Student",
        rollNo: "TEST001",
        phoneNo: "1234567890",
        course: "Python",
        instructorName: "Test Instructor",
        location: "Mumbai, Maharashtra",
        collegeName: "Test College",
      },
      feedback: {
        "0-0": "OFTEN",
        "0-1": "ALWAYS",
      },
      instructorRating: 5,
      courseRating: 4,
      submittedAt: new Date().toISOString(),
      createdAt: new Date(),
    }

    const result = await feedbackCollection.insertOne(testFeedback)
    console.log("✅ Test feedback inserted with ID:", result.insertedId)

    // Clean up test data
    await feedbackCollection.deleteOne({ _id: result.insertedId })
    console.log("✅ Test data cleaned up")

    // Show final status
    const feedbackCount = await feedbackCollection.countDocuments()
    const usersCount = await usersCollection.countDocuments()

    console.log("\n📊 Database Status:")
    console.log(`   Database: ${dbName}`)
    console.log(`   Feedback records: ${feedbackCount}`)
    console.log(`   User records: ${usersCount}`)
    console.log(`   Connection URI: ${uri}`)
  } catch (error) {
    console.error("❌ Error setting up database:", error)
  } finally {
    await client.close()
    console.log("🔌 Connection closed")
  }
}

setupDatabase()
