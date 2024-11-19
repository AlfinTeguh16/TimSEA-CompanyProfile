'use client';
import React, { useState } from "react";
import { Element } from "react-scroll";
import { PiInstagramLogoBold, PiXLogoBold, PiLinkedinLogoBold } from "react-icons/pi";
import { RiMailSendLine } from "react-icons/ri";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); 

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('Your message has been sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Failed to send your message.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Element name="contact">
                <h1 className="px-4 md:px-20 xl:px-20 font-bold text-text-color-navy text-3xl xl:text-5xl my-7 ">Let&apos;s Talk!</h1>
                <section className="mx-4 md:mx-20 xl:mx-20 rounded-3xl bg-text-color-navy p-4 md:p-6 xl:p-10 flex flex-col md:flex-row gap-3 my-2">
                    <div className="flex flex-col text-white md:w-1/2">
                        <div>
                            <h1 className="text-3xl xl:text-5xl font-extrabold ">Embark Your Success Story With Us. </h1>
                        </div>

                        <div className="my-5 w-fit">
                            <p className="font-semibold text-xl pt-2">Email</p>
                            <a href="mailto: go@mytimsea.com" className="hover:underline">go@mytimsea.com</a>
                        </div>

                        <div>
                            <p className="font-semibold text-xl py-2">Social Media</p>
                            <span className="flex flex-row gap-3">
                                <a href="http://x.com/mytimSEA" className="p-2 hover:bg-blue-900 hover:rounded-xl"><PiXLogoBold className="size-7" /></a>
                                <a href="http://www.instagram.com/mytimsea/" className="p-2 hover:bg-blue-900 hover:rounded-xl"><PiInstagramLogoBold className="size-7" /></a>
                                <a href="http://www.linkedin.com/company/mytimsea" className="p-2 hover:bg-blue-900 hover:rounded-xl"><PiLinkedinLogoBold className="size-7" /></a>
                            </span>
                        </div>
                    </div>

                    <div className="w-full md:w-full xl:w-1/2 bg-white rounded-xl p-5">
                        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-y-2">
                            <label htmlFor="Name" className="font-semibold">Name / Company</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Name / Company" 
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="p-3 rounded-lg bg-slate-100" 
                            />

                            <label htmlFor="Email" className="font-semibold">Email</label>
                            <input  
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="p-3 rounded-lg bg-slate-100" 
                            />

                            <label htmlFor="Message" className="font-semibold">Inquiry</label>
                            <select
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="p-3 rounded-lg bg-slate-100"
                            >
                                <option value="" disabled>
                                    Select an inquiry
                                </option>
                                <option value="PR Activation">PR Activation</option>
                                <option value="Set up your team in Southeast Asia" >Set Up Your Team in Southeast Asia</option>
                                <option value="Doing PR & Set up your team in Southeast Asia">PR & Set Up Your Team in Southeast Asia</option>
                            </select>

                            <button
                                type="submit"
                                className={`my-4 py-3 px-5 w-fit text-white font-semibold rounded-full bg-text-color-navy hover:bg-blue-900 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span>Sending...</span>
                                ) : (
                                    <span className="flex items-center space-x-2">
                                        <RiMailSendLine />
                                        <p>Send Email</p>
                                    </span>
                                )}
                            </button>
                            {status && <p>{status}</p>}
                        </form>
                    </div>
                </section>
            </Element>
        </>
    );
};

export default Contact;
