import serviceApi from '@/app/apiServices/servicesApi/ServiceApi';
import ServicePageClient from './ServicePageClient';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ _id: string }>
}

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '');
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const id = (await params)._id;
  try {
    let serviceData = null;
    try {
      const res = await serviceApi.getServiceBySlug(id);
      if (res?.data) {
        serviceData = res.data;
      }
    } catch (err) {
      // fallback
    }

    if (!serviceData) {
      try {
        const resId = await serviceApi.getServiceId(id);
        if (resId?.data) {
          serviceData = resId.data;
        }
      } catch (err) {
        // ignore
      }
    }

    if (serviceData) {
      return {
        title: serviceData.seoTitle || serviceData.name,
        description: stripHtml(serviceData.seoDescription) || stripHtml(serviceData.description),
      }
    }
  } catch (error) {
    console.error("Error generating metadata for service:", error);
  }

  return {
    title: 'Service | Lumina Talent',
    description: 'Explore our services at Lumina Talent',
  }
}

const Page = async ({ params }: Props) => {
  // Relying on the client component to fetch its own data to avoid refactoring ServicePageClient's intricate loading state,
  // Just wrapping it for generateMetadata.
  return <ServicePageClient />;
}

export default Page
