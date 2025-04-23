import React from 'react';
import Header from './Header';
import './Resume.css';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaSchool, FaEnvelope } from 'react-icons/fa';
import { FiInstagram, FiLinkedin, FiGithub, FiX } from 'react-icons/fi';

export default function Contact() {
    return (
        <div className="resume-container">
            <Header />

            <section className="neural-section">
                <div className="flex flex-col lg:flex-row justify-between items-center bg-[#003262] text-white p-8 rounded-xl shadow-lg">
                    <div className="lg:w-1/2 w-full space-y-6">
                        <motion.h1
                            className="text-5xl font-bold"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Contact Me
                        </motion.h1>
                        <p className="text-lg text-gray-300">
                            Send me a message! I check my email and messages regularly so expect a response within 1–5 business days. I'm excited to chat!
                        </p>
                        <div className="space-y-2 text-md">
                            <p><FaMapMarkerAlt className="inline mr-2 text-[#FDB515]" /> Newark, Delaware</p>
                            <p><FaSchool className="inline mr-2 text-[#FDB515]" /> Newark Charter School</p>
                            <p><FaEnvelope className="inline mr-2 text-[#FDB515]" /> yamalishriyan[at]gmail[dot]com</p>
                        </div>
                        <div className="flex space-x-4 mt-4 text-2xl">
                            <a href="https://instagram.com" className="hover:text-[#FDB515]"><FiInstagram /></a>
                            <a href="https://x.com" className="hover:text-[#FDB515]"><FiX /></a>
                            <a href="https://linkedin.com/in/srujanyamali" className="hover:text-[#FDB515]"><FiLinkedin /></a>
                            <a href="https://github.com/srujyama" className="hover:text-[#FDB515]"><FiGithub /></a>
                        </div>
                    </div>

                    <div className="lg:w-1/3 w-full mt-8 lg:mt-0">
                        <div className="bg-cover bg-center rounded-3xl overflow-hidden shadow-lg h-72 flex items-center justify-center"
                             style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=600&q=80")' }}>
                            <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                                <p className="text-white text-xl font-semibold">💬 Let’s Chat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
