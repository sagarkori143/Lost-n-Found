import connectDB from "../../../lib/db";
import Item, { IItem } from "../../models/items";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// GET: Fetch all items
export async function GET() {
  try {
    const response= await connectDB();
    const items: IItem[] = await Item.find();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    
    return NextResponse.json({ message: "Failed to fetch items" }, { status: 500 });
  }
}

// POST: First convert the images into links then push it to the mongo
export async function POST(request: NextRequest) {
  try {
    console.log("The POST request called!");
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const files = formData.getAll("images") as File[];

    if (!name || !description || files.length === 0) {
      console.log("Missing fields detected!");
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    console.log("Connecting to DB...");
    await connectDB();

    // Upload images to Cloudinary
    console.log("Uploading images...");
    const uploadPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const bufferPromise = file.arrayBuffer();
        bufferPromise.then((buffer) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "lost-and-found" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary error:", error);
                reject(error);
              } else {
                resolve(result?.secure_url as string);
              }
            }
          );
          uploadStream.end(Buffer.from(buffer));
        });
      });
    });

    const imageUrls = await Promise.all(uploadPromises);
    console.log("Image URLs:", imageUrls);

    // Save to MongoDB
    const newItem = new Item({ name, description, imageUrls });
    await newItem.save();
    console.log("Item saved:", newItem);

    return NextResponse.json(
      { message: "Item added successfully", id: newItem._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Failed to add item", error },
      { status: 500 }
    );
  }
}
