'use client'

import Header from './components/homePage/header';
import Services from './components/homePage/services';
import WhyUs from './components/homePage/whyUs';
import Contact from './components/homePage/contact';
import BlogCard from './components/homePage/blog';


export default function Home() {

  return (
    <>
    <section className=' bg-gradient-to-l to-cerulean-500 from-blue-ribbon-500'>
      <Header/>
    </section>

    <section id="services">
      <Services/>
    </section>

    <section id="whyUs">
        <WhyUs/>
    </section>

    <div className='bg-gradient-to-tl to-text-color-navy from-blue-ribbon-700'>
      <section id="blogCard" className='bg-blog py-5 md:py-16 mt-10'>
          <BlogCard/>
      </section>
    </div>

    <section id="contact">
        <Contact/>
    </section>
    </>
  );
}
