import { collection, addDoc } from "firebase/firestore"; 
import { db } from "@/lib/firebase"; // Import your Firestore instance

async function addInstitution(institutionName: string, email: string, phone: string, address: string, institutionType: string, creator: string) {
  try {
    // Create a reference to the 'institutions' collection
    const institutionsCollection = collection(db, 'institutions');

    // Add a new document with the provided fields
    const docRef = await addDoc(institutionsCollection, {
      name: institutionName, // Include the institution name as a field
      email,
      phone,
      address,
      institutionType,
      creator,
      createdAt: new Date() // Optional: Add a timestamp
    });

    console.log("Institution added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding institution: ", error);
  }
}
