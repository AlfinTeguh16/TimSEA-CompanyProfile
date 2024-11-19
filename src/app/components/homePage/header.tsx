'use client'

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

const Header = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);
    return(
        <>
        <section className="mb-5 responsive-container ">
        <div className="w-full h-screen">
          <section className="flex flex-row justify-between pt-6 md:pt-8 ">
            <div className="justify-start px-4 md:px-20 xl:px-20 md:py-20 xl:py-20">
              {isClient && (
                <>
                <h2>
                  <TypeAnimation
                    sequence={[
                      'INDONESIA',
                      4000,
                      'SINGAPORE',
                      4000,
                      'THAILAND',
                      4000,
                      'MALAYSIA',
                      4000,
                      'PHILIPPINES',
                      4000,
                      'VIETNAM',
                      4000,
                      'MYANMAR',
                      4000,
                      'CAMBODIA',
                      4000,
                      'LAOS',
                      4000,
                    ]}
                    speed={50}
                    repeat={Infinity}
                    className="font-bold text-white md:text-2xl"
                  />
                </h2>
                <section className="flex flex-col">
                  <div>
                    <h3>
                      <TypeAnimation
                        sequence={[
                          'Population 273 million',
                          4000,
                          'Population 5.6 million',
                          4000,
                          'Population 69 million',
                          4000,
                          'Population 33 million',
                          4000,
                          'Population 113 million',
                          4000,
                          'Population 98 million',
                          4000,
                          'Population 54 million',
                          4000,
                          'Population 16 million',
                          4000,
                          'Population 7.2 million',
                          4000,
                        ]}
                        speed={50}
                        repeat={Infinity}
                        className="text-white md:text-2xl"
                      />
                    </h3>
                  </div>
                  <div>
                    <h3>
                      <TypeAnimation
                        sequence={[
                          'GDP $1.1 trillion',
                          4000,
                          'GDP $397 billion',
                          4000,
                          'GDP $543 billion',
                          4000,
                          'GDP $364 billion',
                          4000,
                          'GDP $361 billion',
                          4000,
                          'GDP $261 billion',
                          4000,
                          'GDP $69 billion',
                          4000,
                          'GDP $26 billion',
                          4000,
                        ]}
                        speed={50}
                        repeat={Infinity}
                        className="text-white md:text-2xl"
                      />
                    </h3>
                  </div>
                </section>
              </>
              
              )}
            </div>
          </section>

          <section className="flex flex-col px-4 md:px-20 xl:px-20 w-fit absolute bottom-3 md:bottom-20">
            <Image src="/images/LogoTimSEAtext.png" alt="Logo" width={231} height={231} className="invert md:w-80 xl:w-96 h-auto" />
            <i className="text-white px-2 -mt-3 md:text-2xl">Your SEA Winning Team</i>
          </section>
        </div>
      </section>

        <section className="border-b border-gray-400 md:-mt-10 pb-10">
          <div className="mx-4 md:mx-20 xl:mx-20 xl:w-3/5 mb-6">
          <p className="font-bold text-base md:text-2xl text-white leading-4 md:leading-7 mb-3">
            TimSEA helps companies expand their presence in Southeast Asia.
          </p>
            <h3 className="text-sm  md:text-base text-white">We provide comprehensive support including market research, strategy development for market penetration and user acquisition, community-building for your product, social media management, connect you with influencer and media partner, and oversight of your operational activities in the SEA region.</h3>
          </div>
        </section>

        </>
    );
}

export default Header;