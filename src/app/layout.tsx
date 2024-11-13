import React from 'react';
import './globals.css';
import Navbar from './components/navbar';



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
          <title>TimSEA</title>
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className='bg-blue-ribbon-700 p-5 mt-10'>
          <p className='text-white font-bold flex justify-center'>&copy; 2024 TimSEA</p>
        </footer>
      </body>
    </html>
  );
};