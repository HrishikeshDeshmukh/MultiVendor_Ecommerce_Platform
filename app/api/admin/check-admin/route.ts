import connectDb from "@/lib/connectDB";
import User from "@/app/model/user.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const admin = await User.findOne({
      role: "admin",
    });

    return NextResponse.json({
      exists: !!admin,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}