import React from "react";
import { Element } from "react-scroll";
import { PiUsersFourBold, PiUserSoundBold, PiUserCircleGear } from "react-icons/pi";

interface ServiceCardProps {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, subtitle, description }) => {
    return (
        
            <div  className="w-full my-2">
                <div className="p-4 h-full bg-gradient-to-l to-cerulean-500 from-blue-ribbon-500 transition-all ease-out duration-500 rounded-lg hover:z-20 hover:scale-105 hover:shadow-xl">
                    <div>
                        <span className="flex flex-row pl-5 align-middle">
                            <Icon className="text-white size-10 mr-2" />
                            <p className="text-white font-bold text-base md:text-2xl xl:text-3xl">{title}</p>
                        </span>
                        <p className="text-white font-semibold text-base md:text-xl px-5 py-1">{subtitle}</p>
                        <p className="text-white text-xs md:text-sm xl:text-md text-justify px-5">{description}</p>
                    </div>
                </div>
            </div>
    );
};

const Services: React.FC = () => {
    return (
        <Element name="services">
        <div>
            <h1 className="px-4 md:px-20 xl:px-20 font-bold text-text-color-navy text-3xl xl:text-5xl my-10">WHAT WE DO</h1>
            <section className="px-4 md:px-20 xl:px-20 h-full flex flex-col md:gap-x-8">
                <ServiceCard 
                    icon={PiUserSoundBold} 
                    title="Public Relations in Southeast Asia" 
                    subtitle="Connecting your company with the best influencers and media" 
                    description="We specialize in delivering press releases for your company or product, ensuring maximum exposure through top-tier media across Southeast Asia. In addition, we focus on identifying the perfect influencers who align with your brand’s values and goals. Our team works closely with them to manage and execute campaigns, ensuring impactful and strategically-driven collaborations that elevate your brand’s presence in the region" 
                />
                <ServiceCard 
                    icon={PiUsersFourBold} 
                    title="Super Team" 
                    subtitle="Set up your team in the Southeast Asian region" 
                    description="We offer comprehensive support to ensure you have the right team in place for a successful venture into the Southeast Asian market. From recruitment to management, we take care of the essential teams needed for seamless operations, including:
                    Social Media Team – Engaging and growing your online presence
                    Community Building Team – Cultivating strong, loyal relationships with your user base.
                    Design Team – Creating visually stunning content that speaks to your audience.
                    Programming & Game Development Team – Ensuring top-notch technical development and maintenance.
                    Interpreter Team – Overcoming language barriers to reach all Southeast Asian markets.
                    And more
                    " 
                />
                <ServiceCard 
                    icon={PiUserCircleGear} 
                    title="All-in-One Package" 
                    subtitle="We set up your team & do the PR activities" 
                    description="Our all-inclusive service ensures your company is fully equipped to thrive in Southeast Asia. We handle every aspect of your expansion, from setting up the right teams and conducting in-depth market research, to developing tailored strategies for effective market penetration and user acquisition. We build strong, vibrant communities around your product, manage your social media presence, connect you with the region’s top influencers and media outlets, and oversee operational activities to ensure smooth and successful business operations. With us, your business is in the best hands to conquer the SEA market and grow exponentially" 
                />
                
            </section>
        </div>
        </Element>

    );
};

export default Services;
