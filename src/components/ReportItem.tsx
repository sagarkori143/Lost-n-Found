"use client";
import { Loader2 } from "lucide-react"
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
// For the UI components
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ReportItemPopup: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<File[]>([]);
    const [loading, setloading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files)); // Convert FileList to Array of Files
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("Handle submit function started");
        e.preventDefault();
        console.log("Prevent default done");
        const formData = new FormData();
        console.log("New form data built");
        formData.append("name", name);
        formData.append("description", description);
        console.log("Name and description parsed:", name, description);
        images.forEach((image) => formData.append("images", image));
        console.log("For each image func done", images);

        try {
            setloading(true)
            const response = await fetch("http://localhost:3000/api/items", {
                method: "POST",
                body: formData,
            });
            console.log("Received response:", response);
            console.log("Converting response to JSON...");
            const result = await response.json().catch(() => {
                throw new Error("Server returned non-JSON response");
            });

            if (response.ok) {
                alert("Item added successfully!");
                setloading(false)
                setName("");
                setDescription("");
                setImages([]);
            } else {
                alert(`Error: ${result.message || "Something went wrong"}`);
            }
        } catch (error) {
            console.error("Error uploading item:", error);
            alert("An error occurred while uploading the item.");
        }
    };

    return (
        <div className="flex-col border-[2px] rounded-xl h-[85%]  border-black p-5">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-5">
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="message">Item Description</Label>
                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                
               {/* This is the submit button */}
                <div className="flex items-center justify-center">
                {
                    loading ?
                        (
                            <Button className="w-[50%]" disabled>
                                <Loader2 className="animate-spin" />
                                Submitting
                            </Button>
                        )
                        :
                        (
                            <Button className="w-[50%]" type="submit">Submit</Button>
                        )
                }
                </div>

            </form>
        </div>
    );
};

export default ReportItemPopup;
