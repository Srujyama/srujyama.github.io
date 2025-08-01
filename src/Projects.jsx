import React from 'react';
import Header from './Header';
import './Resume.css';           // Dark mode styles
import NeuralNetProjects from './NeuralNetProjects';
import './Projects.css';
import { motion } from 'framer-motion';

export default function Projects() {
    return (
        <div className="resume-container">
            <Header />

            <section className="neural-section">
                <motion.h1
                    className="resume-title neural-title text-fade-in"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Projects
                </motion.h1>

                <p className="neural-sub text-fade-in delay-1">
                    Click on highlighted nodes to see the project details
                </p>

                <NeuralNetProjects/>
            </section>
        </div>
    )
}
