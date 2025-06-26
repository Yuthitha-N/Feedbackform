import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    console.log("Testing database connection...")

    const { client, db } = await connectToDatabase()
    console.log("Database connected successfully")

    // Test if we can access the users collection
    const users = db.collection("users")
    const userCount = await users.countDocuments()

    console.log("Users collection accessible, count:", userCount)

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      userCount: userCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("Test signup attempt:", { email, passwordLength: password?.length })

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const users = db.collection("users")

    // Check if user exists
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 })
    }

    // Test insert (without actually inserting)
    const testUser = {
      email,
      password: "hashed_password_would_go_here",
      createdAt: new Date(),
    }

    console.log("Would insert user:", testUser)

    return NextResponse.json({
      success: true,
      message: "Test signup successful (no actual user created)",
      user: { email, name: email.split("@")[0] },
    })
  } catch (error) {
    console.error("Test signup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Test signup failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
