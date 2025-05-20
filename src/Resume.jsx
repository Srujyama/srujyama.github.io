import React from 'react'
import { FaEye, FaDownload } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import TimeLineComponent from './TimeLineComponent'
import './Resume.css'

export default function Resume() {
    const location = useLocation();

    return (
        <motion.div
            className="resume-container"

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >

            <Header />


            {/* Resume Title */}
            <motion.h1
                className="resume-title"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Resume
            </motion.h1>

            {/* Resume Buttons */}
            <motion.div
                className="resume-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <a
                    href="/Srujan_Yamali_ Resume_April_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-button view"
                >
                    <FaEye style={{ marginRight: '10px' }} /> View Resume
                </a>
                <a
                    href="/Srujan_Yamali_ Resume_April_2025.pdf"
                    download
                    className="resume-button download"
                >
                    <FaDownload style={{ marginRight: '10px' }} /> Download Resume
                </a>
            </motion.div>

            {/* Timeline Sections */}
            <motion.div
                className="timeline-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <TimeLineComponent/>
            </motion.div>
        </motion.div>
    )
}