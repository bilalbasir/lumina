'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import InputField from '@/components/inputField/InputField';
import DropdownField from '@/components/dropdown/DropDown';
import TextArea from '@/components/inputField/TextArea';
import careerApi from '@/app/apiServices/careerApi/CareerApi';
import toast from 'react-hot-toast';
import Loader from '@/components/loader/Loader';
import { modalCloseReducer } from '@/redux/slice/ModalSlice';
import { useDispatch } from 'react-redux';
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string
  resume: string;
  coverLetter: string;
  department: string;
  experience: string
  linkedInProfile?: string
};
interface JobApplicationFormProps {
  jobTitle: string;
  id: string | undefined
}

const JobApplicationForm = ({ jobTitle, id }: JobApplicationFormProps) => {

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)
  const [department, setDepartment] = useState("")
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    resume: null as File | null,

  });





  const experienceLevels = [
    'Entry Level (0-2 years)',
    'Mid Level (3-5 years)',
    'Senior Level (6-10 years)',
    'Expert Level (10+ years)',
  ];



  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, resume: file }));
  };






  const submitForm = async (data: FormValues) => {
    setLoading(true)
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("firstName", data.firstName);
      formDataToSend.append("lastName", data.lastName);
      formDataToSend.append("email", data.email);
      formDataToSend.append("phone", data.phone);
      formDataToSend.append("coverLetter", data.coverLetter);
      formDataToSend.append("department", data.department);
      formDataToSend.append("experience", data.experience);

      if (data.linkedInProfile) {
        formDataToSend.append("linkedInProfile", data.linkedInProfile);
      }

      if (formData.resume) {
        formDataToSend.append("resume", formData.resume);
      }

      const res = await careerApi.applyJob(id as string, formDataToSend);

      // ✅ show success toast
      toast.success(" Application submitted successfully!");

      console.log("✅ API response:", res);
    } catch (err: any) {
      console.error("❌ Submit error:", err);
      toast.error("Failed to submit application. Please try again.");
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!id) return;

    const fetchCareer = async () => {
      try {
        const res = await careerApi.getCareerId(id);
        const data = res.data;

        setDepartment(res.data?.department)

      } catch (err) {
        console.error("❌ Error fetching career:", err);
      }
    };

    fetchCareer();
    dispatch(modalCloseReducer())
  }, [id]);

  const BackArrowIcon = () => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <g clipPath="url(#clip0_905_2725)">
        <path
          d="M0.774969 11.3364L0.775812 11.3355L5.67444 6.4605C6.04142 6.09529 6.635 6.09665 7.0003 6.46368C7.36555 6.83067 7.36414 7.42425 6.99716 7.7895L3.70822 11.0625H23.5625C24.0803 11.0625 24.5 11.4822 24.5 12C24.5 12.5178 24.0803 12.9375 23.5625 12.9375H3.70827L6.99711 16.2105C7.36409 16.5757 7.3655 17.1693 7.00025 17.5363C6.63495 17.9034 6.04133 17.9047 5.67439 17.5395L0.775764 12.6645L0.774921 12.6636C0.407749 12.2971 0.408922 11.7016 0.774969 11.3364Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_905_2725">
          <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24.5 0)" />
        </clipPath>
      </defs>
    </svg>
  );



  const UploadIcon = () => (
    <svg
      width="32"
      height="30"
      viewBox="0 0 32 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      <path
        d="M2.25 18.75C2.25 17.3167 2.6 15.9833 3.3 14.75C3.98333 13.55 4.90833 12.5833 6.075 11.85C6.29167 10.2333 6.8625 8.75833 7.7875 7.425C8.7125 6.09167 9.88333 5.05 11.3 4.3C12.7667 3.51667 14.3333 3.125 16 3.125C17.6667 3.125 19.2333 3.51667 20.7 4.3C22.1167 5.05 23.2875 6.09167 24.2125 7.425C25.1375 8.75833 25.7083 10.2333 25.925 11.85C27.0917 12.5833 28.0167 13.55 28.7 14.75C29.4 15.9833 29.75 17.3083 29.75 18.725C29.75 20.1417 29.4167 21.4583 28.75 22.675C28.0833 23.8583 27.1792 24.825 26.0375 25.575C24.8958 26.325 23.6333 26.75 22.25 26.85L9.75 26.875C8.36667 26.7583 7.10417 26.325 5.9625 25.575C4.82083 24.825 3.91667 23.8583 3.25 22.675C2.58333 21.4583 2.25 20.15 2.25 18.75ZM22.05 24.35C23.0167 24.2833 23.8958 23.9917 24.6875 23.475C25.4792 22.9583 26.1042 22.2833 26.5625 21.45C27.0208 20.6167 27.25 19.7125 27.25 18.7375C27.25 17.7625 27.0125 16.8542 26.5375 16.0125C26.0625 15.1708 25.4167 14.4917 24.6 13.975L23.6 13.35L23.45 12.175C23.2833 10.9417 22.85 9.82917 22.15 8.8375C21.45 7.84583 20.5625 7.0625 19.4875 6.4875C18.4125 5.9125 17.25 5.625 16 5.625C14.75 5.625 13.5875 5.9125 12.5125 6.4875C11.4375 7.0625 10.55 7.84583 9.85 8.8375C9.15 9.82917 8.71667 10.9417 8.55 12.175L8.4 13.35L7.4 13.975C6.58333 14.4917 5.9375 15.1708 5.4625 16.0125C4.9875 16.8542 4.75 17.7625 4.75 18.7375C4.75 19.7125 4.97917 20.6167 5.4375 21.45C5.89583 22.2833 6.52083 22.9583 7.3125 23.475C8.10417 23.9917 8.98333 24.2833 9.95 24.35L10.15 24.375H21.85L22.05 24.35ZM17.25 16.875V21.875H14.75V16.875H11L16 10.625L21 16.875H17.25Z"
        fill="#9CA3AF"
      />
    </svg>
  );

  return (
    <>{loading &&
      <Loader />}
      <section className="flex flex-col justify-center items-center gap-10 w-full px-4 sm:px-6 lg:px-20 py-16">

        {/* Back to Careers Link */}
        <Link
          href="/careers"
          className="flex items-center gap-2 self-start max-w-[1280px] w-full mx-auto"
        >
          <BackArrowIcon />
          <span
            className="text-[#00634F] text-center text-base font-bold leading-6"
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            Back to Careers
          </span>
        </Link>

        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 w-full max-w-[1280px] px-4 sm:px-6 lg:px-20">
          <h1
            className="text-gray-900 text-center text-2xl sm:text-3xl lg:text-[48px] font-semibold leading-tight lg:leading-[57.6px]"
            style={{
              fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif',
              color: '#1D1D1D'
            }}
          >
            Apply for {jobTitle}
          </h1>
          <p
            className="w-full max-w-[884px] text-gray-600 text-center text-lg sm:text-xl leading-normal"
            style={{
              fontFamily: 'Rubik, -apple-system, Roboto, Helvetica, sans-serif',
              color: '#686868'
            }}
          >
            Submit your application below and join our team
          </p>
        </div>

        {/* Form Container */}
        <div className="flex flex-col justify-center items-center gap-10 w-full max-w-[1120px] px-4 sm:px-6 lg:px-10 bg-white">
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-start gap-6 w-full">
            {/* First Row - First Name & Last Name */}
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-7 w-full">
              <InputField
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                register={register}
                error={errors.firstName}
                required
              />
              <InputField
                label="last Name"
                name="lastName"
                placeholder="Enter your last name"
                register={register}
                error={errors.lastName}
                required
              />
            </div>

            {/* Second Row - Email & Phone */}
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-7 w-full">
              <InputField
                label="email"
                name="email"
                placeholder="Enter your email"
                register={register}
                error={errors.email}
                required
              />
              <InputField
                label="Phone Number "
                name="phone"
                placeholder="Enter your phone number"
                register={register}
                error={errors.phone}
                required
              />
            </div>

            {/* Resume Upload */}
            <div className="flex flex-col items-start gap-2 w-full">
              <label
                className="w-full text-[#131313] text-sm font-medium leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Resume *
              </label>
              <label className="flex h-40 px-5 py-9 justify-center items-center w-full rounded border-2 border-dashed border-[#D1D5DB] cursor-pointer hover:border-[#00634F] transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  className="hidden"
                  required
                />
                <div className="flex flex-col items-center gap-2">
                  <UploadIcon />
                  <div className="flex flex-col items-center">
                    <p
                      className="text-gray-900 text-center text-sm font-medium leading-5"
                      style={{ fontFamily: 'Roboto, -apple-system, Roboto, Helvetica, sans-serif' }}
                    >
                      {formData.resume ? formData.resume.name : 'Landing Pages.docx'}
                    </p>
                    <p
                      className="text-gray-500 text-center text-xs leading-4"
                      style={{ fontFamily: 'Roboto, -apple-system, Roboto, Helvetica, sans-serif' }}
                    >
                      Click to change file
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {/* Cover Letter */}
            <TextArea
              label="Cover Letter"
              name="coverLetter"
              placeholder="Enter your phone number"
              register={register}
              error={errors.coverLetter}
              required
            />

            {/* Department & Experience Row */}
            <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
              <DropdownField
                label="Select Department"
                name="department"
                options={[department]}
                control={control}
                error={errors.department}
                required
              />
              <DropdownField
                label="Select Experience"
                name="experience"
                options={experienceLevels}
                control={control}
                error={errors.experience}
                required
              />
            </div>

            {/* LinkedIn Profile */}
            <InputField
              label="Linkedin Profile"
              name="linkedInProfile"
              placeholder="Enter your Linkedin Profile"
              register={register}
              error={errors.linkedInProfile}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="flex h-13 px-4 py-4 justify-center items-center gap-2 w-full rounded bg-[#00624F] text-white text-base font-medium hover:bg-[#004d3d] transition-colors duration-200"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default JobApplicationForm;
