import connectDB from "@/config/database";
import Property from "@/model/Property";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const properties = await Property.find({});
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {}
}
