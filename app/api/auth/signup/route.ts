import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory storage for testing (replace with database later)
const users: Array<{ email: string; password: string; createdAt: Date }> = []

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Signup API called")

    // Parse request body
    let body
    try {
      body = await request.json()
      console.log("📥 Request body received:", { ...body, password: "[HIDDEN]" })
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
    }

    const { email, password } = body

    // Validate input
    if (!email || !password) {
      console.log("❌ Missing email or password")
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      console.log("❌ Password too short")
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long" },
        { status: 400 },
      )
    }

    // Check if user already exists (in memory for now)
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      console.log("❌ User already exists:", email)
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 })
    }

    // Create user (in memory for now)
    const newUser = {
      email: email.toLowerCase(),
      password: password, // In production, this should be hashed
      createdAt: new Date(),
    }

    users.push(newUser)
    console.log("✅ User created successfully:", email)
    console.log("📊 Total users:", users.length)

    // Return success response
    const userData = {
      id: Date.now().toString(), // Simple ID for now
      email: newUser.email,
      name: newUser.email.split("@")[0],
    }

    return NextResponse.json({
      success: true,
      user: userData,
      message: "Account created successfully",
    })
  } catch (error) {
    console.error("🔥 Signup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        // Remove: details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// GET method for testing
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Signup API is working",
    userCount: users.length,
    timestamp: new Date().toISOString(),
  })
}
