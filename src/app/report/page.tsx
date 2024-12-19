"use client"
import React from 'react'
import { useEffect, useState } from 'react';







const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [images, setImages] = useState<File[]>([]);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    setImages(Array.from(e.target.files)); // Convert FileList to Array of Files
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  console.log("Handle submit function started")
  e.preventDefault();
  console.log("Prevent default done")
  const formData = new FormData();
  console.log("New form data built")
  formData.append("name", name);
  formData.append("description", description);
  console.log("Name and des parsed",name,description)
  images.forEach((image) => formData.append("images", image));
  console.log("For each image func done",images)

  
  try {
    const response = await fetch("http://localhost:3000/api/items", {
      method: "POST",
      body: formData,
    });
    console.log("recieved response:",response)
    console.log("Lets convert it to json:")
  
    const result = await response.json().catch(() => {
      throw new Error("Server returned non-JSON response");
    });
  
    if (response.ok) {
      alert("Item added successfully!");
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
  

}
function page() {
  return (
    <div>
        <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
        </div>
    </div>
  )
}

export default page