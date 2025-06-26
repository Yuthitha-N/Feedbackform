import { type NextRequest, NextResponse } from "next/server"
import { getFeedbackCollection, type FeedbackData } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received feedback data:", body)

    const collection = await getFeedbackCollection()

    const feedbackData: FeedbackData = {
      studentInfo: body.studentInfo,
      feedback: body.feedback,
      instructorRating: body.instructorRating,
      courseRating: body.courseRating,
      submittedAt: body.submittedAt,
      createdAt: new Date(),
    }

    const result = await collection.insertOne(feedbackData)
    console.log("Feedback saved with ID:", result.insertedId)

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Feedback submitted successfully",
    })
  } catch (error) {
    console.error("Error saving feedback:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save feedback",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const collection = await getFeedbackCollection()

    const feedback = await collection.find({}).sort({ createdAt: -1 }).toArray()
    console.log("Retrieved feedback count:", feedback.length)

    return NextResponse.json({
      success: true,
      data: feedback,
      count: feedback.length,
    })
  } catch (error) {
    console.error("Error fetching feedback:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch feedback",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
