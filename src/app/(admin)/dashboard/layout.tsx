"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@/components/icons/dashboard/DashboardIcon";
import ServiceIcon from "@/components/icons/services/ServicesIcon";
import CareerIcon from "@/components/icons/career/CareerIcon";
import BlogIcon from "@/components/icons/blog/BlogIcon";
import ContactLeadIcon from "@/components/icons/contactLead/ContactLeadIcon";
import LogoutIcon from "@/components/icons/logout/LogoutIcon";
import Image from "next/image";
import Navbar from "@/components/pages/adminSide/navbar/Navbar";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null); // ✅ hover state
  const navigate = useRouter()


  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"; // ✅ only exact match
    }
    return pathname.startsWith(href); // ✅ allow sub-routes
  };
  const getLinkClasses = (href: string) =>
    `px-3 py-2 rounded-[12px] flex cursor-pointer items-center gap-x-3 transition ${isActive(href)
      ? "bg-primaryColor text-white"
      : "text-greyscale600 hover:bg-[#E5E5E5] "
    }`;

  const getIconColor = (href: string) => {
    if (pathname === href) return "#fff"; // ✅ active
    if (hovered === href) return "#848484"; // ✅ hover
    return "#686868"; // ✅ default
  };


  const logoutFun = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    toast.success("Logout successfully");
    navigate.push("/signin")
  }

  return (
    <div className="flex h-screen w-full bg-[#FAFDFA]">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-greyscale50 flex flex-col p-4 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="relative w-[300px] h-[48px]">
            <Image alt="dashboard" fill src="/assets/admin/logo.png" />
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 capitalize">
          {[
            { href: "/dashboard", label: "Dashboard", Icon: DashboardIcon },
            { href: "/dashboard/services", label: "Services", Icon: ServiceIcon },
            { href: "/dashboard/careers", label: "Careers", Icon: CareerIcon },
            { href: "/dashboard/blogs", label: "Blogs", Icon: BlogIcon },
            {
              href: "/dashboard/contact-leads",
              label: "Contact Leads",
              Icon: ContactLeadIcon,
            },
            // { href: "/signin", label: "Logout", Icon: LogoutIcon },
          ].map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              className={getLinkClasses(href)}
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
            >
              <Icon color={getIconColor(href)} />
              {label}
            </a>
          ))}
          <div className={getLinkClasses("signin")} onClick={logoutFun}>

            <LogoutIcon color={getIconColor("/signin")} />
            Logout
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {
        isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )
      }

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center ">
          <button
            className=" ml-4 md:ml-0 md:hidden text-gray-700"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>


          <Navbar />
        </div>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div >
  );
}
