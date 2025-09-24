'use client';
import InputField from '../../../inputField/InputField';
import { useForm } from 'react-hook-form';
import DropdownField from '../../../dropdown/DropDown';
import CheckboxField from '../../../checkBox/CheckBox';
import TextArea from '@/components/inputField/TextArea';
import leadsApi from '@/app/apiServices/contactLeads/ContactLeadsApi';
import toast from 'react-hot-toast';
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  jobTitle: string;
  phoneNumber: string;
  help: string
  country: string
  message: string
  regularUpdates: boolean
};
const ContactFormSection = () => {

  const {
    register,
    handleSubmit, control,
    formState: { errors },
  } = useForm<FormValues>();

  // Dummy data for dropdowns
  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Other',
  ];

  const helpOptions = [
    'Executive Search',
    'Talent Acquisition',
    'HR Consulting',
    'Leadership Development',
    'Other Inquiry',
  ];






  const submitFun = async (data: FormValues) => {
    console.log("Form submitted:", data);

    try {
      const response = await leadsApi.addContactLead(data);

      toast.success("Message sent successfully!");


    } catch (error) {
      console.error("Error while adding lead:", error);
      toast.error(error?.response?.data?.message || "Failed to send message.");
    }
  };





  return (
    <section className="flex flex-col items-start gap-2.5 w-full   py-16">
      {/* Form Container */}
      <div className="flex flex-col justify-center items-start gap-4 w-full p-6 sm:p-8 lg:p-12 lg:px-20  bg-[#053328] text-white">
        <div className="flex flex-col items-start gap-10 w-full">
          <div className="flex flex-col items-start gap-4 w-full">
            {/* Form Header */}
            <div className="flex flex-col items-start gap-2 w-full">
              <div className="flex flex-col items-center w-full">
                <div className='w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] sm:leading-[30px] md:leading-[50px] lg:leading-[70px] xl:leading-[90px] '>

                  <h1 className='text-[24px] sm:text-[32px] md:text-[48px] lg:text-[64px] xl:text-[78px] text-center mb-2 md:mb-4 lg:mb-6 xl:mb-8'>
                    Change begins when we talk.
                  </h1>
                  <h2
                    className="w-full  text-center text-xl sm:text-2xl lg:text-[28px] font-bold md:leading-[100%] lg:leading-[150%]"
                    style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                  >
                    Get in Touch with Us
                  </h2>
                </div>
              </div>
            </div>

            {/* Form Fields Container */}
            <form onSubmit={handleSubmit(submitFun)} className="flex flex-col items-start gap-6 w-full">
              {/* First Row - First Name & Last Name */}
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-7 w-full">

                <InputField
                  label="First Name"
                  labelColor="text-white"
                  name="firstName"
                  placeholder="Enter your first name"
                  register={register}
                  error={errors.firstName}
                  required
                />
                <InputField
                  labelColor="text-white"

                  label="last Name"
                  name="lastName"
                  placeholder="Enter your last name"
                  register={register}
                  error={errors.lastName}
                  required
                />
              </div>

              {/* Second Row - Company & Job Title */}
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-7 w-full">
                <InputField
                  labelColor="text-white"

                  label="company"
                  name="companyName"
                  placeholder="Enter your company"
                  register={register}
                  error={errors.companyName}
                  required
                />
                <InputField
                  labelColor="text-white"

                  label="Job title"
                  name="jobTitle"
                  placeholder="Enter your job title"
                  register={register}
                  error={errors.jobTitle}
                  required
                />
              </div>

              {/* Third Row - Email & Phone */}
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-7 w-full">
                <InputField
                  labelColor="text-white"

                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
                  register={register}
                  error={errors.email}
                  required
                />
                <InputField
                  labelColor="text-white"

                  label="Phone Number "
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  register={register}
                  error={errors.phoneNumber}
                  required
                />
              </div>
              <DropdownField
                label="Select Country"
                name="country"
                options={countries}
                control={control}
                error={errors.country}
                required
                labelColor="text-white"

              />
              <DropdownField
                label="How can we help you?"
                name="help"
                options={helpOptions}
                control={control}
                error={errors.help}
                required
                labelColor="text-white"

              />

              <TextArea
                labelColor="text-white"

                label="Message"
                name="message"
                placeholder="Message"
                register={register}
                error={errors.message}
                required
              />
              {/* Consent Checkbox */}

              <CheckboxField
                name="consent"
                label="Yes, I would like to receive regular updates on thought leadership, industry insights and upcoming events from Korn Ferry. I understand that I may withdraw my consent at any time."
                control={control}
                labelColor="text-white"
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



        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
