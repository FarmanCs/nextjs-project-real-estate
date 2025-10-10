import connectDB from "@/config/database";
import Property from "@/model/Property";
import { NextResponse, NextRequest } from "next/server";

export async function GET(NextRequest, { params }) {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) {
      return NextResponse.json(
        { Message: "property not found for this id" },
        { status: 401 },
      );
    }
    return NextResponse.json(property, { status: 200 });
  } catch (error) {}
}
