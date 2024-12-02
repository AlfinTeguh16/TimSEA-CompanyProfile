import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import fs from "fs";
import path from "path";

interface ContentItem {
  type: string;
  value: string;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const db = (await clientPromise).db("db_mytimsea");
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content: ContentItem[] = [];

    // Buat folder upload jika belum ada
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const bannerDir = path.join(process.cwd(), "public", "uploads", "banner");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    if (!fs.existsSync(bannerDir)) {
      fs.mkdirSync(bannerDir, { recursive: true });
    }

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file_") && value instanceof File) {
        let targetDir = uploadDir;

        // Simpan banner pada folder /banner
        if (key === "file_banner") {
          targetDir = bannerDir;
        }

        const filePath = path.join(targetDir, value.name);
        const writeStream = fs.createWriteStream(filePath);

        // Gunakan streaming untuk menulis file langsung ke sistem
        const buffer = Buffer.from(await value.arrayBuffer());
        writeStream.write(buffer);
        writeStream.end();

        const fileUrl = targetDir.includes("banner")
          ? `/uploads/banner/${value.name}`
          : `/uploads/${value.name}`;
        content.push({ type: "file", value: fileUrl });
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

// export async function GET() {
//   try {
//     const db = (await clientPromise).db("db_mytimsea");
//     const blogs = await db.collection("blogs").find().toArray();
//     return NextResponse.json(blogs);
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    const db = (await clientPromise).db("db_mytimsea");

    // Fetch blogs data from database
    const blogs = await db.collection("blogs").find().toArray();

    // Path to banner uploads folder
    const bannerDir = path.join(process.cwd(), "public", "uploads", "banner");

    // Check if banner directory exists
    let bannerFiles: string[] = [];
    if (fs.existsSync(bannerDir)) {
      // Read all files in the banner directory
      bannerFiles = fs.readdirSync(bannerDir).map((file) => `/uploads/banner/${file}`);
    }

    return NextResponse.json({ blogs, banners: bannerFiles });
  } catch (error) {
    console.error("Error fetching blogs or banners:", error);
    return NextResponse.json({ error: "Failed to fetch blogs or banners" }, { status: 500 });
  }
}