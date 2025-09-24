'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuIcon from '../../../icons/menuIcon/MenuIcon';
import Logo from '../../../icons/logo/Logo';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false)
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/careers', label: 'Careers' },
    // { href: '/blogs', label: 'Blogs' },
    { href: '/aboutus', label: 'About us' },
    { href: '/contactus', label: 'Contact us' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  // 👇 scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`w-full fixed top-0 z-50 backdrop-blur-xl transition-colors duration-300
        ${isScrolled ? 'bg-[#00624F]/60' : 'bg-transparent'}
      `}
    >
      <div className="flex justify-between items-center w-full px-2 py-4 md:px-20  md:py-4">
        {/* Logo */}
        <div className="hidden md:block">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-[55px] w-[150px]">
              <Image
                src="/assets/logo.png"
                alt="logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>


        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = link.href === '/services'
              ? pathname === '/services' || pathname.startsWith('/services/')
              : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-1 py-1 text-sm font-medium text-white transition-colors duration-200 hover:text-gray-200 ${isActive
                  ? 'border-b border-[#2CC294]'
                  : ''
                  }`}
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Get in Touch Button */}
        <div className="hidden md:block">
          <Link
            href="/contactus"
            className="
            flex h-13 px-4 border-[2px] border-[#D5EED7] justify-center items-center gap-2 rounded bg-[#D5EED7]
            hover:border-[#2CC294]
            text-[#131313] text-base font-medium transition-colors duration-200 hover:bg-[#2CC294]
            active:bg-[#2CC294]  active:border-black
            "
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center justify-between w-full md:hidden">

          <button
            type="button"
            onClick={toggleMenu}
            className="text-gray-200 hover:text-white focus:outline-none focus:text-white transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <MenuIcon />
          </button>
          <div className='relative w-[45%] h-[28px] sm:h-[36px] sm:w-[28%]'>

            <Image fill alt='logo' src={"/assets/logo.png"} className='object-cover' />
          </div>
          <Link
            href="/contactus"
            onClick={closeMenu}
            className=" bg-[#D5EED7] text-[#131313] px-4 py-2 rounded text-sm font-medium text-center hover:bg-[#C5DEC7] transition-colors duration-200 "
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="py-4 space-y-3 border-t border-white/20 bg-black/50 backdrop-blur-sm px-20">
            {navLinks.map((link) => {
              const isActive = link.href === '/services'
                ? pathname === '/services' || pathname.startsWith('/services/')
                : pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'text-white font-semibold'
                    : 'text-gray-200 hover:text-white'
                    }`}
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
