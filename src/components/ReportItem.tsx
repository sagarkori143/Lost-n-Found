"use client";
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';
// For the UI components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ReportItemPopup: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateLostFound, setDateLostFound] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [type, setType] = useState<string>("Lost");
  const [phone, setPhone] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setusername] = useState<string>("");
  const [rollNo, setRollNumber] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");
  const [collegeEmail, setCollegeEmail] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Convert FileList to Array of Files
    }
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dateLostFound", dateLostFound);
    formData.append("status", status);
    formData.append("type", type);
    formData.append("phone", phone);
    formData.append("whatsapp", whatsapp);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("rollNo", rollNo);
    formData.append("collegeEmail", collegeEmail);
    formData.append("photoURL", photoURL);
    images.forEach((image) => formData.append("images", image));
    console.log(formData.get("type"));

    try {
      setLoading(true);
      const response = await fetch("https://lost-n-found-orcin.vercel.app/api/items", {
      //const response = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => {
        setLoading(false);
        throw new Error("Server returned non-JSON response");

      });

      if (response.ok) {
        alert("Item added successfully!");
        setLoading(false);
        setTitle("");
        setDescription("");
        setDateLostFound("");
        setStatus("");
        setType("");
        setPhone("");
        setWhatsapp("");
        setEmail("");
        setImages([]);
      } else {
        setLoading(false);
        alert(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading item:", error);
      alert("An error occurred while uploading the item.");
    }
  };

  // Checking for User
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login'); // Redirect to sign-in if not logged in
      } else {
        if (user.displayName) setusername(user.displayName);
        if (user.email) setCollegeEmail(user.email);
        if (user.photoURL) setPhotoURL(user.photoURL);
        const roll = user.email?.split('@')[0];
        if (roll) setRollNumber(roll.toUpperCase());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="text-white flex-col border-[2px] rounded-xl min-h-[85%] border-black p-5">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-5">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="description">Item Description</Label>
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2 text-gray-400">
          <Label htmlFor="dateLostFound" className="text-white">Date Lost/Found</Label>
          <Input
            type="date"
            value={dateLostFound}
            onChange={(e) => setDateLostFound(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2 text-gray-400 ">
          <label htmlFor="status-select">Type </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            id="status-select" className="bg-black text-white p-2 rounded border border-white" >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="whatsapp">Whatsapp</Label>
          <Input
            type="tel"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="images">Images</Label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* This is the submit button */}
        <div className="flex items-center justify-center">
          {loading ? (
            <Button className="w-[50%] bg-white text-black" disabled>
              <Loader2 className="animate-spin" />
              Submitting
            </Button>
          ) : (
            <Button className="w-[50%] bg-white text-black hover:bg-gray-400 hover:text-black" type="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReportItemPopup;
