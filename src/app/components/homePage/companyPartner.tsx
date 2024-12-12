import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const logos = [
  "/logos/crypto-run-logo.png",
  "/logos/gamety-logo.svg",
  "/logos/inAReality-Logo.png",
  "/logos/khuga-logo.webp",
  "/logos/metahorse-unity-logo.svg",
  "/logos/saakuru-logo.svg",
  "/logos/sekuya-logo.png",
  "/logos/verselab-logo.png",
];

const CompanyPartner: React.FC = () => {
  return (
    <>
    <div className="w-full flex justify-center ">
      <h1 className="px-4 md:px-20 xl:px-20 font-bold text-white text-3xl xl:text-5xl mt-7 mb-4">
        TimSEA Partners
      </h1>
    </div>

    <div>
      <Marquee
        speed={50}
        pauseOnHover={true}
        gradient={false} 
      >
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt={`Logo ${index}`}
            width={160}
            height={20}
            className="flex justify-evenly  px-10 py-5 mx-4"
          />
        ))}
      </Marquee>
    </div>

    <div>
      <Marquee
        speed={50}
        pauseOnHover={true}
        gradient={false} 
        direction="right"
      >
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt={`Logo ${index}`}
            width={160}
            height={20}
            className="flex justify-evenly  px-10 py-5 mx-4"
          />
        ))}
      </Marquee>
    </div>
    </>
  );
};

export default CompanyPartner;
