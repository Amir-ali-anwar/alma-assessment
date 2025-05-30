import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

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
      country: data.get("countryOfCitizenship"),
      status: "Pending",
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
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('lead-management');
    const collection = db.collection('leads');

    const data = await collection.find({}).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    console.log({id})
    console.log({status})
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing ID or status" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("lead-management");

    const result = await db.collection("leads").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Error updating lead status:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

