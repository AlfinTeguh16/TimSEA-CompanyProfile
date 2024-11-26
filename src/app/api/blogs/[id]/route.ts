import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const db = (await clientPromise).db("db_mytimsea");
    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(params.id) });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const db = (await clientPromise).db("db_mytimsea");
    const body = await req.json();

    const result = await db
      .collection("blogs")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: body });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const db = (await clientPromise).db("db_mytimsea");
    const result = await db.collection("blogs").deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
