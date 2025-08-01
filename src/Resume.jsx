import React, { useEffect, useState } from 'react'
import { FaEye, FaDownload } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import TimeLineComponent from './TimeLineComponent'
import './Resume.css'

const sections = ['Education', 'Work', 'Publications', 'Awards']

export default function Resume() {
    const location = useLocation()
    const [activeSection, setActiveSection] = useState('Education')

    useEffect(() => {
        const handleScroll = () => {
            const scrollMid = window.innerHeight / 2
            let current = sections[0]
            let smallestDiff = Infinity

            for (const id of sections) {
                const el = document.getElementById(id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    const diff = Math.abs(rect.top + rect.height / 2 - scrollMid)
                    if (diff < smallestDiff) {
                        smallestDiff = diff
                        current = id
                    }
                }
            }

            setActiveSection(current)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.div
            className="resume-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <Header />

            {/* Scroll Nav */}
            <nav className="resume-nav-vertical">
                <div className="nav-line" />
                {sections.map(section => (
                    <a
                        key={section}
                        href={`#${section}`}
                        className={activeSection === section ? 'active' : ''}
                        onClick={(e) => {
                            e.preventDefault()
                            const el = document.getElementById(section)
                            if (el) {
                                const yOffset = el.getBoundingClientRect().top + window.scrollY
                                window.scrollTo({ top: yOffset, behavior: 'smooth' })
                            }
                        }}
                    >
                        {section}
                    </a>
                ))}
            </nav>

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
                <TimeLineComponent />
            </motion.div>
        </motion.div>
    )
}
