'use client'

import { Metadata } from 'next';
import ApplyFormHeroSection from '@/components/pages/landingPage/career/ApplyFormHeroSection';
import JobApplicationForm from '@/components/pages/landingPage/career/JobApplicationForm';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import careerApi from '@/app/apiServices/careerApi/CareerApi';





export default function JobApplicationPage() {

  const params = useParams()
  const [jobTitle, setJobTitle] = useState('')
  const id = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  console.log("ID", id, params);
  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        const res = await careerApi.getCareerId(id);
        const data = res.data;
        setJobTitle(data.jobTitle)



      } catch (err) {
        console.error("❌ Error fetching career:", err);
      }
    };

    fetchService();
  }, [
    id
  ])

  return (
    <div className='bg-white'>
      {/* Apply Form Hero Section */}
      <ApplyFormHeroSection jobTitle={jobTitle} />

      {/* Job Application Form */}
      <JobApplicationForm jobTitle={jobTitle} id={id} />
    </div>
  );
}
