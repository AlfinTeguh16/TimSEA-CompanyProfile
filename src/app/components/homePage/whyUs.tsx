import React from "react";
import { Element } from "react-scroll";
import { BsPersonBadge } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { PiChartLineBold, PiUsersThreeBold, PiPresentationChartBold, PiHandshakeBold } from "react-icons/pi";

interface ServiceInfo {
    icon: React.ElementType;
    title: string;
    description: string;
}

const services: ServiceInfo[] = [
    {
        icon: PiChartLineBold,
        title: "Market Expertise and Local Insights",
        description: "TimSEA brings in-depth expertise across various industries in Southeast Asia, understanding key market dynamics, consumer preferences, and cultural nuances across the region. Our local insights enable us to tailor strategies that effectively resonate with diverse SEA demographics."
    },
    {
        icon: PiUsersThreeBold,
        title: "End-to-End Localization Services",
        description: "We provide comprehensive, culturally sensitive localization services, including language adaptation, visual design, and cultural references. This ensures that your brand connects meaningfully with local audiences, increasing engagement and customer satisfaction."
    },
    {
        icon: BsPersonBadge,
        title: "Strategic Partnerships and Networking",
        description: "TimSEA has built extensive networks with local influencers, media outlets, business communities, and industry platforms. Our established relationships provide clients with immediate access to key market players and strategic promotional channels in the SEA region."
    },
    {
        icon: PiHandshakeBold,
        title: "Community Engagement and Brand Building",
        description: "We specialize in building and nurturing communities around your brand, enhancing visibility and loyalty. Through local events, partnerships with influencers, and community-driven initiatives, we help strengthen your brand’s presence in the SEA market."
    },
    {
        icon: RiTeamLine,
        title: "Experienced and Dedicated Team",
        description: "Our team consists of experienced professionals deeply familiar with Southeast Asia’s business landscape. We are passionate about driving growth for our clients and committed to delivering sustainable success."
    },
    {
        icon: PiPresentationChartBold,
        title: "Scalable Solutions for Growth",
        description: "As your business expands, TimSEA offers scalable solutions to support your growth journey, from initial market entry to ongoing consumer engagement and retention efforts. We’re here to help you keep pace with the dynamic SEA market."
    },
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
                <h1 className="font-bold text-base md:text-xl">{title}</h1>
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
            <h1 className="px-4 md:px-20 xl:px-20 font-bold text-text-color-navy text-3xl xl:text-5xl my-10">Why Us?</h1>
            <div className="flex flex-col md:flex-row">
                {services.slice(0, 2).map((service, index) => (
                    <ServiceSection key={index} {...service} />
                ))}
            </div>
            <div className="flex flex-col md:flex-row">
                {services.slice(2, 4).map((service, index) => (
                    <ServiceSection key={index} {...service} />
                ))}
            </div>
            <div className="flex flex-col md:flex-row">
                {services.slice(4, 6).map((service, index) => (
                    <ServiceSection key={index} {...service} />
                ))}
            </div>
        </Element>
        </>
    );
}

export default WhyUs;
