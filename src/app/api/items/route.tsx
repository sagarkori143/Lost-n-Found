import connectDB from "../../../lib/db";
import Item, { IItem } from "../../models/items";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// GET: Fetch all items
export async function GET() {
  try {
    const response = await connectDB();
    console.log("Trying to fetch all the entries form the database");
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
    
    // Extract new fields from formData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dateLostFound = formData.get("dateLostFound") as string; // Date lost/found
    const status = formData.get("status") as string; // Status
    const type = formData.get("type") as string; // Type
    const phone = formData.get("phone") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const collegeEmail = formData.get("collegeEmail") as string;
    const rollNo = formData.get("rollNo") as string;
    const photoURL = formData.get("photoURL") as string;
    const files = formData.getAll("images") as File[];

    if (!title || !description || !dateLostFound || !status || !type || files.length === 0) {
      console.log("Missing fields detected!");
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Custom validation: At least one contact detail required
    if (!phone && !whatsapp && !email) {
      return NextResponse.json({ message: "At least one contact detail (phone, whatsapp, or email) is required." }, { status: 400 });
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
    const newItem = new Item({
      title,
      description,
      dateLostFound: new Date(dateLostFound), // Ensure it's a Date object
      dateAdded: new Date(), // Automatically set to current time
      phone,
      whatsapp,
      email,
      username,
      collegeEmail,
      rollNo,
      photoURL, // Assuming photoURL is also an image URL that is being passed
      imageUrls,
      status,
      type,
    });

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
