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
        <section className="mb-5 responsive-container">
        <div className="w-full h-screen">
          <section className="flex flex-row justify-between pt-6 md:pt-8 ">
            <div>
              <Image src="/images/Logo.png" alt="Logo" width={83} height={83}  className="md:w-28 xl:w-32" />
            </div>
            <div className="justify-end">
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
                    className="font-bold"
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
                      />
                    </h3>
                  </div>
                </section>
              </>
              
              )}
            </div>
          </section>

          <section className="flex flex-col md:ml-7 w-fit absolute bottom-5">
            <Image src="/images/LogoTimSEAtext.png" alt="Logo" width={231} height={231} className="md:w-72 h-auto" />
            <i className="mx-auto md:text-xl">Your SEA Winning Team</i>
          </section>
        </div>
      </section>

      <section className="border-b border-gray-400">
        <div className="md:mx-20 xl:mx-20 xl:w-3/4 mb-6">
          <h1 className="font-bold text-base md:text-lg xl:text-3xl text-text-color-navy">TimSEA is a specialist team in Southeast Asia’s (SEA) providing comprehensive services to help games and apps</h1>
          <h3 className="text-sm md:text-base xl:text-2xl text-text-color-navy">The main goal of TimSEA is to become a Key Partner for the companies who wants to expand their market in Southeast Asia (SEA).</h3>
        </div>
      </section>
        </>
    );
}

export default Header;