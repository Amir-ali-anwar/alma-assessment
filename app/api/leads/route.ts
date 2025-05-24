import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const lead = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      linkedIn: data.get("linkedIn"),
      visas: data.getAll("visas"),
      additionalInfo: data.get("additionalInfo"),
      resume: data.get("resume"),
      status: "PENDING",
      submittedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("lead-management");
    const result = await db.collection("leads").insertOne(lead);

    return NextResponse.json({ success: true, leadId: result.insertedId });
  } catch (error) {
    console.error("Error submitting lead:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
