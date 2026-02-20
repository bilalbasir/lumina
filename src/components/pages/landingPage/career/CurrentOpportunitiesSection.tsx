'use client';

import { slugify } from '@/utils/slugify';
import Link from 'next/link';
import { useState } from 'react';
import HealthIcon from '../../../icons/healthIcon/HealthIcon';
import LocationIcon from '../../../icons/locationIcon/LocationIcon';
import ClockIcon from '../../../icons/clockIcon/ClockIcon';
import DropDownWOHook from '../../../dropdown/DropDownWOHook';
import ResetIcon from '../../../icons/resetIcon/ResetIcon';
import { modalOpenReducer } from '@/redux/slice/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModal from '../../../Modal/jobDetailModal/JobDetailModal';
import { RootState } from '@/redux/store';
import { useGetAllCareers, useGetAllCareersWoPagination } from '@/hooks/use-career-hook';
import NoDataFound from '@/components/noDataFound/NoDataFound';
import Loader from '@/components/loader/Loader';
// Dummy job data
const jobs = [
  {
    id: 1,
    title: "Senior Talent Acquisition Specialist",
    description: "Lead healthcare recruitment initiatives for Fortune 500 clients.",
    department: "Healthcare",
    location: "New York, NY",
    type: "Full-time",
  },
  {
    id: 2,
    title: "IT Recruitment Consultant",
    description: "Specialize in placing top IT professionals in innovative tech companies.",
    department: "Finance",
    location: "Chicago, IL",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Financial Services Recruiter",
    description: "Focus on executive placements in banking and financial services.",
    department: "Finance",
    location: "Chicago, IL",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Junior Talent Advisor",
    description: "Support senior recruiters in healthcare talent acquisition processes.",
    department: "Finance",
    location: "Chicago, IL",
    type: "Full-time",
  },
  {
    id: 5,
    title: "Executive Search Consultant",
    description: "Lead C-level executive searches for financial institutions.",
    department: "Finance",
    location: "Chicago, IL",
    type: "Full-time",
  },
  {
    id: 6,
    title: "Technical Recruiter",
    description: "Source and place software engineers and technical specialists.",
    department: "Finance",
    location: "Chicago, IL",
    type: "Full-time",
  },
];
const CurrentOpportunitiesSection = () => {
  const [searchJob, setSearchJob] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const isModalOpen = useSelector((state: RootState) => state.ModalDetail.isModalOpen)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [selectedcareerId, setSelectedcareerId] = useState<string>("");

  const { data: careersRes, isLoading, isError } = useGetAllCareersWoPagination();
  const careers = careersRes?.data?.careers
    ?.filter((career: any) => career.status === "Open") // ✅ sirf open careers
    ?.map((career: any) => ({
      ...career,
    })) || [];

  console.log("Careers", careersRes)
  // Dummy data for dropdowns
  const departments = [...new Set(careers.map((c: any) => c.department))];
  const locations = [...new Set(careers.map((c: any) => c.location))];
  const jobTypes = [...new Set(careers.map((c: any) => c.jobType))];



  const getDepartmentBgColor = (department: string) => {
    switch (department) {
      case "Healthcare":
        return "bg-blue-50";
      case "Finance":
        return "bg-blue-50";
      default:
        return "bg-blue-50";
    }
  };

  // Filtered jobs logic
  // Filtered careers logic
  const filteredCareers = careers.filter((career: any) => {
    const matchesSearch =
      searchJob === '' ||
      career.jobTitle?.toLowerCase().includes(searchJob.toLowerCase()) ||
      career.shortDescription?.toLowerCase().includes(searchJob.toLowerCase());

    const matchesDepartment =
      selectedDepartment === '' || career.department === selectedDepartment;

    const matchesLocation =
      selectedLocation === '' || career.location === selectedLocation;

    const matchesJobType =
      selectedJobType === '' || career.jobType === selectedJobType;

    return matchesSearch && matchesDepartment && matchesLocation && matchesJobType;
  });



  const getDepartmentTextColor = (department: string) => {
    switch (department) {
      case "Healthcare":
        return "text-blue-700";
      case "Finance":
        return "text-blue-700";
      default:
        return "text-blue-700";
    }
  };
  const resetFun = () => {
    setSearchJob('')
    setSelectedDepartment('')
    setSelectedLocation('')
    setSelectedJobType('')
  }

  const showJobDetailFun = (id: string) => {
    setSelectedcareerId(id)
    dispatch(modalOpenReducer())
  }
  return (
    <>
      {loading && <Loader />}
      {isModalOpen &&
        <JobDetailModal id={selectedcareerId} />
      }
      <section>
        {/*job search form */}
        <div className="flex flex-col bg-[#F8F8F8] items-start gap-6 w-full px-4 sm:px-6 lg:px-20 py-16">

          {/* Form Header */}
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex flex-col items-start w-full">
              <h2
                className="w-full text-center text-[#333] text-xl sm:text-2xl lg:text-[28px] font-bold leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Current Opportunities
              </h2>
            </div>
          </div>
          {filteredCareers?.length === 0 ? <NoDataFound link='/' linkName='Back to home' text='No Careers Found.' /> : <>
            {/* Form Fields Container */}
            <div className="flex flex-col items-start gap-4 w-[100%]">
              {/* First Row - Search Job */}
              <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
                <div className="flex flex-col items-start gap-2 flex-1 w-[100%]">
                  <label
                    className="w-full text-[#131313] text-sm font-medium leading-[150%]"
                    style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                  >
                    Search Job
                  </label>
                  <div className="flex h-11 items-start gap-4 w-[100%]">
                    <div className="flex h-11 px-4 py-3 items-center gap-2 flex-1 rounded border-[1.5px] border-[#E6E6E6] bg-white">
                      <input
                        type="text"
                        value={searchJob}
                        onChange={(e) => setSearchJob(e.target.value)}
                        placeholder="Search job..."
                        className="flex-1 text-[#686868] w-[100%] text-sm font-medium leading-[150%] bg-transparent border-none outline-none"
                        style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Department Dropdown */}
                <div className="w-[100%] lg:w-[24%]">
                  <DropDownWOHook
                    label="Department"
                    value={selectedDepartment}
                    options={departments as string[]}
                    onClick={(value) => setSelectedDepartment(value)}
                  />
                </div>
                {/* Location Dropdown */}
                <div className="w-[100%] lg:w-[24%]">
                  <DropDownWOHook
                    label="Location"
                    value={selectedLocation}

                    options={locations as string[]}
                    onClick={(value) => setSelectedLocation(value)}
                  />
                </div>

                {/* Job Type Dropdown */}
                <div className="w-[100%] lg:w-[24%]">
                  <DropDownWOHook
                    value={selectedJobType}

                    label="Job Type"
                    options={jobTypes as string[]}
                    onClick={(value) => setSelectedJobType(value)}
                  />
                </div>
              </div>


            </div>
            <div className='w-[100%]'>
              <div className='flex items-end justify-end mb-4'>
                <div
                  onClick={resetFun}
                  className="flex px-4 py-3 cursor-pointer justify-center items-center gap-x-3  border-[1px] border-solid border-[#CCCCCC]  rounded text-[#131313] bg-white text-sm font-medium hover:bg-[#00624F] hover:text-white transition-colors duration-500"
                  style={{
                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  <ResetIcon />
                  <p>

                    Reset
                  </p>
                </div>
              </div>

            </div>
            <div className="w-[full]  ">

              <div className="flex flex-wrap gap-6 items-start  mx-auto">
                {filteredCareers.map((careers: any) => (
                  <div
                    key={careers.id}
                    className="flex flex-wrap w-full md:w-[calc(50%-12px)] p-6 rounded-lg border border-gray-200 bg-white shadow-sm"
                    style={{
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {/* Job Header */}
                    <div className="flex items-start w-full pb-4">
                      <div className="flex flex-col items-start flex-1">
                        <div className="pb-2">
                          <h3
                            className="text-gray-900 text-xl font-bold leading-[30px]"
                            style={{
                              fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                              color: "#131313",
                            }}
                          >
                            {careers.jobTitle || "Job post"}
                          </h3>
                        </div>
                        <div className="pb-3 text-gray-600 text-base leading-6">
                          <div
                            style={{
                              fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                              color: "#4B5563",
                            }}
                            dangerouslySetInnerHTML={{ __html: careers.shortDescription || "Job Description" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-start gap-2 w-full pb-4">
                      {/* Department Tag */}
                      <div className={`flex h-6 px-3 py-1 items-center rounded-full ${getDepartmentBgColor(careers.department)}`}>
                        <div className="flex items-center gap-1">
                          <HealthIcon />
                          <span
                            className={`text-xs font-medium leading-[14.4px] tracking-[0.48px] ${getDepartmentTextColor(careers.department)}`}
                            style={{
                              fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                            }}
                          >
                            {careers.department}
                          </span>
                        </div>
                      </div>

                      {/* Location Tag */}
                      <div className="flex h-6 px-3 py-1 items-center rounded-full bg-green-50">
                        <div className="flex items-center gap-1">
                          <LocationIcon />
                          <span
                            className="text-xs font-medium leading-[14.4px] tracking-[0.48px] text-green-700"
                            style={{
                              fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                              color: "#166534",
                            }}
                          >
                            {careers.location}
                          </span>
                        </div>
                      </div>

                      {/* Job Type Tag */}
                      <div className="flex h-6 px-3 py-1 items-center rounded-full bg-purple-50">
                        <div className="flex items-center gap-1">
                          <ClockIcon />
                          <span
                            className="text-xs font-medium leading-[14.4px] tracking-[0.48px] text-purple-700"
                            style={{
                              fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                              color: "#6B21A8",
                            }}
                          >
                            {careers.jobType}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-y-3 md:gap-y-0 items-center justify-between w-[100%] capitalize '>

                      {/* Border Button */}
                      <div
                        className="flex px-4 w-[100%] md:w-[48%] py-3 cursor-pointer justify-center items-center gap-2  border-[1px] border-solid border-[#CCCCCC]  rounded text-[#131313] bg-white text-sm font-medium hover:bg-[#00624F] hover:text-white transition-colors duration-500"
                        style={{
                          fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                        onClick={() => { showJobDetailFun(careers?._id); setLoading(true) }}
                      >
                        view job details
                      </div>
                      {/* Fill Button */}
                      <Link
                        href={careers?.status === "Open" ? `/careers/${careers._id}` : ""}
                        onClick={() => setLoading(true)}
                        className={`flex w-[100%] md:w-[48%] px-4 py-3 justify-center items-center gap-2  rounded ${careers?.status === "Open" ? "bg-[#00624F] cursor-pointer" : "bg-[#00624F]/30 cursor-not-allowed"}  text-white text-sm font-medium hover:bg-[#004d3d] transition-colors duration-200`}
                        style={{
                          fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div></>}

        </div>

      </section >
    </>

  );
};

export default CurrentOpportunitiesSection;
