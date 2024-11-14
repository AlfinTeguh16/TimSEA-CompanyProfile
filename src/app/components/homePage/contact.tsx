import React from "react";
import { Element } from "react-scroll";
import { PiArrowRightBold, PiEnvelopeBold, PiInstagramLogoBold, PiXLogoBold, PiLinkedinLogoBold } from "react-icons/pi";

const Contact = () => {
    return(
        <>
        <Element name="contact">
            <h1 className="px-4 md:px-20 xl:px-20 font-bold text-text-color-navy text-3xl xl:text-5xl my-10">Contact</h1>

            <div className=" w-full px-4 md:px-20 xl:px-20">
                <a href="mailto: go@mytimsea.com" className="bg-blue-ribbon-50 p-2 md:p-4 flex flex-row align-middle justify-between hover:bg-blue-ribbon-100">
                    <div className="flex flex-row items-center">
                        <PiEnvelopeBold className="text-blue-ribbon-600 text-xl" />
                        <h1 className="ml-2">Email</h1>
                    </div>
                    <span className="flex flex-row">
                        <p className="text-blue-ribbon-600 px-2">go@mytimsea.com</p>
                        <PiArrowRightBold className="my-auto text-blue-ribbon-600"/>
                    </span>
                </a>
                <a href="https://x.com/mytimSEA" className="bg-white p-2 md:p-4 flex flex-row align-middle justify-between hover:bg-gray-100">
                    <div className="flex flex-row items-center">
                        <PiXLogoBold className="text-blue-ribbon-600 text-xl" />
                        <h1 className="ml-2">Twitter/X</h1>
                    </div>
                    <span className="flex flex-row">
                        <p className="text-blue-ribbon-600 px-2">@mytimsea</p>
                        <PiArrowRightBold className="my-auto text-blue-ribbon-600"/>
                    </span>
                </a>
                <a href="https://www.instagram.com/mytimsea/" className="bg-blue-ribbon-50 p-2 md:p-4 flex flex-row align-middle justify-between hover:bg-blue-ribbon-100">
                    <div className="flex flex-row items-center">
                        <PiInstagramLogoBold className="text-blue-ribbon-600 text-xl" />
                        <h1 className="ml-2">Instagram</h1>
                    </div>
                    <span className="flex flex-row">
                        <p className="text-blue-ribbon-600 px-2">@mytimsea</p>
                        <PiArrowRightBold className="my-auto text-blue-ribbon-600"/>
                    </span>
                </a>
                <a href="https://www.linkedin.com/company/mytimsea" className="bg-white p-2 md:p-4 flex flex-row align-middle justify-between hover:bg-gray-100">
                    <div className="flex flex-row items-center">
                        <PiLinkedinLogoBold className="text-blue-ribbon-600 text-xl" />
                        <h1 className="ml-2">LinkedIn</h1>
                    </div>
                    <span className="flex flex-row">
                        <p className="text-blue-ribbon-600 px-2">@mytimsea</p>
                        <PiArrowRightBold className="my-auto text-blue-ribbon-600"/>
                    </span>
                </a>
            </div>
        </Element>
        </>
    );
}

export default Contact;