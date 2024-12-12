import React from "react";
import { Element } from "react-scroll";
import { PiUsersFourBold, PiUserSoundBold, PiUserCircleGearBold } from "react-icons/pi";

interface ServiceCardProps {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    description: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, subtitle, description }) => {
    return (
        <div className="w-full my-2">
            <div className="p-4 h-full bg-gradient-to-l to-cerulean-500 from-blue-ribbon-500 transition-all ease-out duration-500 rounded-lg hover:z-20 hover:scale-105 hover:shadow-xl">
                <div>
                    <span className="flex flex-row pl-5 align-middle">
                        <Icon className="text-white text-xl md:text-4xl mr-2" />
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
                <h1 className="px-4 md:px-20 xl:px-20 font-bold text-text-color-navy text-3xl xl:text-5xl my-10">What We Do</h1>
                <section className="px-4 md:px-20 xl:px-20 h-full flex flex-col md:gap-x-8">
                    <ServiceCard 
                        icon={PiUserSoundBold} 
                        title="Public Relations in SEA" 
                        subtitle="Connecting your company with the best influencers and media" 
                        description="We specialize in delivering press releases for your company or product, ensuring maximum exposure through top-tier media across Southeast Asia. In addition, we focus on identifying the perfect influencers who align with your brand’s values and goals. Our team works closely with them to manage and execute campaigns, ensuring impactful and strategically-driven collaborations that elevate your brand’s presence in the region." 
                        
                    />
                    <ServiceCard 
                        icon={PiUsersFourBold} 
                        title="Super Team" 
                        subtitle="Set up your team in Southeast Asia.
                        From recruitment to management, we establish essential teams for seamless operations:" 
                        description={
                            <>
                                We offer comprehensive support to ensure you have the right team in place for a successful venture into the Southeast Asian market. From recruitment to management, we take care of the essential teams needed for seamless operations, including:
                                <span className="flex flex-col">
                                    <span>• Social Media</span>
                                    <span>• Community Building</span>
                                    <span>• Design</span>
                                    <span>• Programming & Game Development</span>
                                    <span>• Interpreting</span>
                                    <span>And much more</span>
                                </span>
                            </>
                        }
                    />
                    <ServiceCard 
                        icon={PiUserCircleGearBold} 
                        title="All-in-One Package" 
                        subtitle="Team setup + PR activities = Success in SEA. We handle your expansion from start to finish:" 
                        description={
                            <>
                                <span className="flex flex-col">
                                    <span>• Team setup & management</span>
                                    <span>• Market research & strategy</span>
                                    <span>• Social media & community engagement</span>
                                    <span>• Media & influencer partnerships</span>
                                    <span>• Operational support</span>
                                </span>
                            </>
                        }
                    />
                </section>
            </div>
        </Element>
    );
};

export default Services;
