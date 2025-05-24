"use client";
import { useState } from "react";
import styles from "../public.module.scss";
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
    <div className={`${styles["form__main-sec"]}`}>
       <div className="container">
          <div  className={`${styles["form__main-desc"]}`}>
              <div className={`${styles["icon"]}`}>
                  <img src="./images/icon.png" alt="" />
              </div>
              <div className={`${styles["form__main-desc--textset"]}`}>
                  <h3>want to understand your visa options?</h3>
                  <p>submit the form below and our team of experienced attorneys will reivew your information and send a preliminary assessment of your case based on your goals</p>
              </div>
          </div>
      </div> 
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
