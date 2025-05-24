"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "@/app/shared/Input/Input";
import TextAreaInput from "@/app/shared/Textarea/Textarea";
import FileInput from "@/app/shared/FileInput/FileInout";
import MultiSelect from "@/app/shared/MultSelect/Multiselect";
import styles from "../public.module.scss";
import Button from "@/app/shared/Button/Button";
import Image from "next/image";
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  countryOfCitizenship: yup
    .string()
    .required("Country of citizenship is required"),
  linkedIn: yup.string().url("Invalid URL").required("LinkedIn is required"),
  visas: yup.array().min(1, "Select at least one visa").required(),
  additionalInfo: yup.string().required("Additional info required"),
  resume: yup
    .mixed()
    .required("Resume is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value) return false;

      const file =
        value instanceof FileList
          ? value[0]
          : Array.isArray(value)
          ? value[0]
          : value;
      return file?.type === "application/pdf";
    })
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return false;

      const file =
        value instanceof FileList
          ? value[0]
          : Array.isArray(value)
          ? value[0]
          : value;

      return file?.size <= 5 * 1024 * 1024;
    }),
});
export default function LeadForm() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "visas") {
        (value as string[]).forEach((v) => formData.append("visas", v));
      } else {
        formData.append(key, value as any);
      }
    });
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        reset();
        router.push("/thank-you");
        // Optionally reset form
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Error submitting form.");
    }
  };
  return (
    <>
      <header className={`${styles["banner--sec"]}`}></header>
      <div className={`${styles["form__main-sec"]}`}>
        <div className="container">
          <div className={`${styles["form__main-desc"]}`}>
            <div className={`${styles["icon"]}`}>
              <Image src="/images/icon.png" alt="icon" width={70} height={70} />
            </div>
            <div className={`${styles["form__main-desc--textset"]}`}>
              <h3>Want to understand your visa options?</h3>
              <p>
                Submit the form below and our team of experienced attorneys will
                reivew your information and send a preliminary assessment of
                your case based on your goals
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${styles["auth--form"]}`}
          >
            <TextInput
              label="First Name"
              name="firstName"
              placeholder="First Name"
              register={register}
              error={errors.firstName?.message}
            />
            <TextInput
              label="Last Name"
              name="lastName"
              register={register}
              placeholder="Last Name"
              error={errors.lastName?.message}
            />

            <TextInput
              label="Email"
              name="email"
              placeholder="Email"
              register={register}
              error={errors.email?.message}
            />
            <TextInput
              label="Country of Citizenship"
              name="countryOfCitizenship"
              placeholder="Country of Citizenship"
              register={register}
              error={errors.countryOfCitizenship?.message}
            />
            <TextInput
              label="LinkedIn Profile"
              name="linkedIn"
              placeholder="LinkedIn/Personal Website URL"
              register={register}
              error={errors.linkedIn?.message}
            />
            <div className={`${styles["visas__sec"]}`}>
              <div className={`${styles["visas__sec-inner"]}`}>
                <Image  src="/images/dice-img.png" alt="dice image" width={68} height={63} />
                <h3>Visa categories of interest?</h3>
              </div>
              <MultiSelect
                label="Visas of Interest"
                name="visas"
                control={control}
                options={["o-1", "EB-1A", "EB-2-NIW", "I don't know"]}
                error={errors.visas?.message}
              />
            </div>
            <div className={`${styles["info__sec"]}`}>
              <div className={`${styles["info__sec-inner"]}`}>
                 <Image  src="/images/heart-img.png" alt="heart iamge" width={65} height={55} />
                <h3>How can we help you?</h3>
              </div>
              <TextAreaInput
                label="Additional Information"
                name="additionalInfo"
                register={register}
                error={errors.additionalInfo?.message}
              />
            </div>

            <FileInput
              label="Resume / CV"
              name="resume"
              control={control}
              error={errors.resume?.message}
            />

            <Button className={`${styles["btn-submit"]}`}>Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
}
