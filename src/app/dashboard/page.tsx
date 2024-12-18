'use client';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase'
import { useRouter } from 'next/navigation';
import { handleSignOut } from '@/lib/signout';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const router= useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login'); // Redirect to sign-in if not logged in
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

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


  return (
    <div>
        <div>
      {user ? (
        <h1>Welcome, {user.displayName || user.email}</h1>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    <div>
        <button onClick={handleSignOut}>
            Sign Out
        </button>
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
    </div>
  );
};

export default Dashboard;
