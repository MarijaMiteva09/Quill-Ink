import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Here you would typically validate the user credentials against your database
    // For now, we'll just return a mock successful response

    if (email === "user@example.com" && password === "password") {
      return NextResponse.json({
        success: true,
        user: {
          id: "1",
          name: "John Doe",
          email: "user@example.com",
        },
      })
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}

