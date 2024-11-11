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
                        <span className="flex flex-row align-middle">
                            <Icon className="text-white size-7 mr-2" />
                            <p className="text-white font-bold text-base md:text-xl xl:text-2xl">{title}</p>
                        </span>
                        <p className="text-white font-semibold px-5 py-1">{subtitle}</p>
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
            <h1 className="font-bold text-text-color-navy text-3xl xl:text-5xl my-10">WHAT WE DO</h1>
            <section className="md:px-20 xl:px-20 h-full flex flex-col md:flex-row md:gap-x-8">
                <ServiceCard 
                    icon={PiUserSoundBold} 
                    title="Public Relation in SEA" 
                    subtitle="Connecting your company with the best influencers and media" 
                    description="We help you in doing press releases about your company or product in several leading media in the Southeast Asia region. In addition, we can also help you in finding the right influencer for your company and overseeing the campaign you do with them." 
                />
                <ServiceCard 
                    icon={PiUserCircleGear} 
                    title="All in One Package" 
                    subtitle="We setup your own team & doing the PR things" 
                    description="We will setup your own team, doing market research, preparing the right strategy for market penetration and user acquisition, building a strong community base for your product, managing your social media activities, connecting you with the best influencers and media, supervising and running your operational activities in the SEA area, and many more." 
                />
            </section>
            <section className="md:px-20 xl:px-20 flex flex-col md:flex-row md:gap-x-8">
                <ServiceCard 
                    icon={PiUsersFourBold} 
                    title="Super Team" 
                    subtitle="We setup your own team & doing the PR things" 
                    description="We can provide and manage the team that your company needs to run your operations in the Southeast Asia region, such as Social Media Team, Community Building Team, Designer Team, Programmer & Game Developer Team, Interpreter Team, etc." 
                />
            </section>
        </div>
        </Element>

    );
};

export default Services;
