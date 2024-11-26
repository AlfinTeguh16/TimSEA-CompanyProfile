import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import fs from "fs";
import path from "path";

interface ContentItem {
  type: string;
  value: string;
}

export async function POST(req: Request) {
  try {
    const db = (await clientPromise).db("db_mytimsea");
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content: ContentItem[] = [];

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file_") && value instanceof File) {
        const filePath = path.join(uploadDir, value.name);
        const buffer = Buffer.from(await value.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        content.push({ type: "file", value: `/uploads/${value.name}` });
      } else if (key.startsWith("content_")) {
        content.push(JSON.parse(value as string));
      }
    }

    if (!title || content.length === 0) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const result = await db.collection("blogs").insertOne({ title, content });
    return NextResponse.json({ message: "Blog created successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = (await clientPromise).db("db_mytimsea");
    const blogs = await db.collection("blogs").find().toArray();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

