import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID parameter" }, { status: 400 });
    }

    const db = (await clientPromise).db("db_mytimsea");
    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    // Validasi ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID parameter" }, { status: 400 });
    }

    const body = await req.json();

    // Validasi body kosong
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Request body cannot be empty" }, { status: 400 });
    }

    const db = (await clientPromise).db("db_mytimsea");

    const result = await db.collection("blogs").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    // Validasi ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID parameter" }, { status: 400 });
    }

    const db = (await clientPromise).db("db_mytimsea");

    const result = await db.collection("blogs").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

