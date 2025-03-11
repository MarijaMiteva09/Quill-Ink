import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Here you would typically create a new user in your database
    // For now, we'll just return a mock successful response

    return NextResponse.json({
      success: true,
      user: {
        id: "2",
        name,
        email,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}

