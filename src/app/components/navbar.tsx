'use client'
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { PiListBold } from "react-icons/pi";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuVisible(!isMobileMenuVisible);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuVisible(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
        <section className="w-full flex justify-center h-fit">
            <nav
                className={`fixed top-0 z-40 flex items-center px-3 py-2 md:px-4 md:py-3 shadow-lg transition-all duration-300 ${
                    isMobileMenuVisible
                        ? 'hidden'
                        : isScrolled
                        ? 'bg-white bg-opacity-80 mt-2 w-4/5 mx-auto flex justify-between rounded-xl'
                        : 'bg-white w-full flex justify-between'
                }`}
            >
                <Link href="/" className="flex flex-row w-full">
                    <Image src="/images/Logo.png" alt="Logo" width={40} height={24} />
                </Link>
                <div className="flex flex-row justify-end w-full align-middle my-auto">
                    <div className="hidden md:block">
                        <ScrollLink to="services" smooth={true} duration={500} className="cursor-pointer p-2 mx-2 text-base rounded-lg hover:bg-gray-50">
                            WHAT WE DO
                        </ScrollLink>
                        <ScrollLink to="whyUs" smooth={true} duration={500} className="cursor-pointer p-2 mx-2 text-base rounded-lg hover:bg-gray-50">
                            WHY US
                        </ScrollLink>
                        <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer p-2 ml-2 text-base rounded-lg text-white font-bold bg-gradient-to-l to-cerulean-500 from-blue-ribbon-500 hover:to-cerulean-700 hover:from-blue-ribbon-700">
                            CONTACT
                        </ScrollLink>
                    </div>
                </div>
                <div>
                    <button id="btn-mobile-nav-menu" onClick={toggleMobileMenu} className="block md:hidden">
                        <PiListBold size={32} />
                    </button>
                </div>
            </nav>

            {isMobileMenuVisible && (
                <div
                    id="mobile-nav-menu"
                    className={`fixed inset-0 flex flex-col bg-black bg-opacity-40 z-10 transition-opacity duration-300 ${
                        isMobileMenuVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={closeMobileMenu}
                >
                    <div
                        className={`bg-white shadow-lg z-50 flex flex-col justify-center items-center h-1/2 p-6 transform transition-transform duration-300 ${
                            isMobileMenuVisible ? 'translate-y-0' : 'translate-y-full'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="my-3 p-2 border-b">
                            <ScrollLink to="services" smooth={true} duration={500} onClick={closeMobileMenu} className="text-black">
                                WHAT WE DO
                            </ScrollLink>
                        </span>
                        <span className="my-3 p-2 border-b">
                            <ScrollLink to="whyUs" smooth={true} duration={500} onClick={closeMobileMenu} className="text-black">
                                WHY US
                            </ScrollLink>
                        </span>
                        <span className="my-3">
                            <ScrollLink to="contact" smooth={true} duration={500} onClick={closeMobileMenu} className="py-2 px-6 rounded-md bg-gradient-to-l to-cerulean-500 from-blue-ribbon-500 text-white font-medium">
                                CONTACT
                            </ScrollLink>
                        </span>
                    </div>
                </div>
            )}
        </section>
        </>
    );
};

export default Navbar;
