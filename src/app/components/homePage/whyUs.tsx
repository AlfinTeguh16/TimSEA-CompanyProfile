import React from "react";
import { Element } from "react-scroll";
import { PiChartLineBold, PiUsersThreeBold, PiChecksBold, PiPresentationChartBold } from "react-icons/pi";

interface ServiceInfo {
    icon: React.ElementType;
    title: string;
    description: string;
}

const services: ServiceInfo[] = [
    {
        icon: PiChartLineBold,
        title: "Tailored Strategies for Each Market",
        description: "With localized insights and data, we create tailored launch and growth strategies specific to each SEA country, ensuring maximum reach and efficiency."
    },
    {
        icon: PiUsersThreeBold,
        title: "Experienced and Dedicated Team",
        description: "Our team comprises seasoned professionals who are deeply familiar with SEA’s landscape. We are passionate about fostering growth for our clients and dedicated to achieving sustainable success."
    },
    {
        icon: PiChecksBold,
        title: "Proven Track Record of Success",
        description: "TimSEA has a portfolio of successful collaborations, having supported multiple titles to launch, grow, and thrive in SEA. Our client success stories speak to our effectiveness in driving downloads, engagement, and monetization."
    },
    {
        icon: PiPresentationChartBold,
        title: "Scalable Solutions for Growing with the Market",
        description: "TimSEA offers scalable solutions to support you, from launch campaigns to ongoing user acquisition and retention efforts, helping you maintain growth momentum."
    }
];

const ServiceSection: React.FC<ServiceInfo> = ({ icon: Icon, title, description }) => (
    <section className="md:px-20 xl:px-20 flex flex-row p-2">
        <div className="size-16 px-2 md:size-20 my-auto rounded-full bg-gradient-to-l to-cerulean-500 from-blue-ribbon-500 flex items-center justify-center">
            <div className="size-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr to-cerulean-500 from-blue-ribbon-500 flex items-center justify-center">
                <Icon className="text-white size-7 md:size-10" />
            </div>
        </div>
        <div className="flex flex-col align-middle px-2 my-auto max-w-5xl md:w-full">
            <span>
                <h1 className="font-bold">{title}</h1>
            </span>
            <span className="text-xs md:text-base text-justify">
                {description}
            </span>
        </div>
    </section>
);

const WhyUs: React.FC = () => {
    return (
        <>
        <Element name="whyUS">
            <h1 className="font-bold text-text-color-navy text-3xl xl:text-5xl my-10">Why Choose Us</h1>
            <div className="flex flex-col md:flex-row">
                {services.slice(0, 2).map((service, index) => (
                    <ServiceSection key={index} {...service} />
                ))}
            </div>
            <div className="flex flex-col md:flex-row">
                {services.slice(2).map((service, index) => (
                    <ServiceSection key={index} {...service} />
                ))}
            </div>
        </Element>
        </>
    );
}

export default WhyUs;
