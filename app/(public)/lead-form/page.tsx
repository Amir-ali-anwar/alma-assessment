"use client";
import { useState } from "react";
export default function LeadFormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedIn: "",
    visas: [],
    resume: null,
    additionalInfo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "visas") {
        (value as string[]).forEach((v) => form.append("visas", v));
      } else {
        form.append(key, value as Blob | string);
      }
    });

    const res = await fetch("/api/leads", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      alert("Thank you! Your information has been submitted.");
    } else {
      alert("There was an error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
     

      <button type="submit">Submit</button>
    </form>
  );
}
