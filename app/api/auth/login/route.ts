import { type NextRequest, NextResponse } from "next/server"

// This should match the users array from signup (in a real app, use a database)
// For now, we'll create a simple test user
const testUsers = [
  {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  },
]

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Login API called")

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

    // Find user (in memory for now)
    const user = testUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      console.log("❌ User not found:", email)
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    // Check password (in production, compare hashed passwords)
    if (user.password !== password) {
      console.log("❌ Invalid password for user:", email)
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    console.log("✅ Login successful:", email)

    // Return success response
    const userData = {
      id: Date.now().toString(),
      email: user.email,
      name: user.name || user.email.split("@")[0],
    }

    return NextResponse.json({
      success: true,
      user: userData,
      message: "Login successful",
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
    message: "Login API is working",
    testUser: "test@example.com / password123",
    timestamp: new Date().toISOString(),
  })
}
