import React, { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FaGraduationCap, FaBriefcase, FaHandsHelping, FaMicroscope,
    FaUserGraduate, FaBookOpen, FaStar, FaChevronDown
} from 'react-icons/fa'
import { SiMicrogenetics, SiUml } from 'react-icons/si'
import { DiPython } from 'react-icons/di'
import './TimeLineComponent.css'

// Animation Variants
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
}

// Education Section
const education = [
    {
        icon: <FaUserGraduate />,
        title: 'Newark Charter High School',
        subtitle: 'Computer Science',
        date: '2021 – 2025 | Newark, DE',
        description: 'High School Diploma',
        details: ['GPA: 4.5 / 4.0 (Weighted)']
    },
    {
        icon: <FaGraduationCap />,
        title: 'UC Berkeley',
        subtitle: 'Computer Science and Economics',
        date: '2025 – Present | Berkeley, CA',
        description: 'B.A. in Computer Science and Economics',
        details: ['GPA: TBD']
    }
]

// Work Experience Section
const work = [
    {
        icon: <SiMicrogenetics />,
        title: 'Research Assistant',
        subtitle: 'University of Delaware – Shao Lab',
        date: 'June 2023 – August 2024 | Newark, DE',
        description: 'Explored genetic and behavioral neuroscience in fruit flies using data-heavy computational methods.',
        details: [
            'Leveraged OpenCV for mating behavior analysis on 730 GB of Drosophila data.',
            'Investigated Neuropeptide F signaling and its ties to reward perception.',
            'Collaborated with Princeton’s Gertrud Schupbach on Thigmotaxis behavior.',
            'Built high-throughput tools to model anxiety behaviors in model organisms.'
        ]
    },
    {
        icon: <DiPython />,
        title: 'Assistant Bioinformatician',
        subtitle: 'Children’s Hospital of Philadelphia – Moustafa Lab',
        date: 'Nov 2023 – Present | Philadelphia, PA',
        description: 'Built computational pipelines to detect bacterial recombination in large-scale genomic data.',
        details: [
            'Used Jaccard similarity and genome set comparison to track recombination.',
            'Integrated kernel-based changepoint analysis for 75,000+ microbial genomes.',
            'Produced visualizations of evolutionary hotspots and verified known events.'
        ]
    },
    {
        icon: <SiUml />,
        title: 'Research Intern',
        subtitle: 'Cornell University – Hein Lab',
        date: 'March 2024 – August 2024 | Ithaca, NY',
        description: 'Used AI to study ecological decision-making and collective behaviors in coral reef fish.',
        details: [
            'Trained YOLO models for object detection in underwater video.',
            'Developed behavior-tracking tools and ecological simulations.',
            'Analyzed stochastic models to infer decision-making dynamics.'
        ]
    },
    {
        icon: <FaMicroscope />,
        title: 'Research Trainee',
        subtitle: 'Perelman School of Medicine – Gupta Lab',
        date: 'August 2023 | Philadelphia, PA',
        description: 'Conducted protein structure research and molecular biology assays.',
        details: [
            'Performed protein crystallization, SDS-PAGE, and Western blotting.',
            'Used inverse PCR to induce E. coli point mutations.',
            'Assisted in crystallography data collection and analysis.'
        ]
    }
]

// Publications & Conferences
const publications = [
    {
        icon: <FaBookOpen />,
        title: 'High-Throughput Behavioral Assay Unveils Female Courtship in Drosophila',
        subtitle: 'International Behavioral and Neural Genetics Society',
        date: '2024 | Western University, London, ON, Canada',
        details: ['Authors: R. Oliver, S. Yamali, S. Knox, T. Dadyala, L. Shao.']
    },
    {
        icon: <FaBookOpen />,
        title: 'High-Throughput Behavioral Assay Unveils Female Courtship in Drosophila',
        subtitle: 'Sexually Dimorphic Circuits and Behaviors, Janelia Research Campus',
        date: '2024 | Howard Hughes Medical Institute, Ashburn, VA',
        details: ['Authors: R. Oliver, S. Yamali, S. Knox, T. Dadyala, L. Shao.']
    },
    {
        icon: <FaBookOpen />,
        title: 'Redcarpet: A Tool for Rapid Recombination Detection in Staphylococcus aureus and Other Species',
        subtitle: '19th International Symposium on Staphylococci and Staphylococcal Infections',
        date: '2024 | Perth, Australia',
        details: ['Authors: A. Moustafa, E. Theiller, A. Lal, S. Yamali, A. Feder, A. Narechania, P. Planet.']
    }
]

// Awards
const awards = [
    {
        icon: <FaStar />,
        title: 'Presidential Volunteer Service Award – Gold',
        subtitle: 'United States Government',
        date: 'May 2024',
        description: 'Awarded for significant national-level community service.',
        details: []
    },
    {
        icon: <FaStar />,
        title: '1st Place in Behavior',
        subtitle: 'Delaware Valley Science Fair',
        date: 'Apr 2024',
        description: 'Top honors in Behavioral Science category.',
        details: []
    },
    {
        icon: <FaStar />,
        title: 'USA Biology Olympiad Semi-Finalist',
        subtitle: 'Center for Excellence in Education',
        date: 'Mar 2024',
        description: 'Top 10% nationally among USABO participants.',
        details: []
    },
    {
        icon: <FaStar />,
        title: 'AP Scholar with Distinction',
        subtitle: 'College Board',
        date: 'Jul 2023',
        description: 'Scores of 3+ on 5+ exams, avg. 3.5+ overall.',
        details: []
    },
    {
        icon: <FaStar />,
        title: 'BPA Awards',
        subtitle: 'Business Professionals of America',
        date: '2023–2025',
        description: 'National and state honors in business, healthcare, design.',
        details: [
            'National:',
            ' - 8th: Info Tech Concepts (2023)',
            ' - 2nd: Healthcare Admin (2024)',
            'State:',
            ' - 1st: Website Design (2023, 2024)',
            ' - 1st: Healthcare Admin Concepts (2024)',
            ' - 1st: Meeting/Event Planning (2025)',
            ' - 3rd: Digital Communication (2025)'
        ]
    },
    {
        icon: <FaStar />,
        title: 'TSA Awards',
        subtitle: 'Technology Student Association',
        date: '2023–2024',
        description: 'Top state placements in STEM competitions.',
        details: [
            ' - 2nd: Biotechnology Design (2023, 2024)',
            ' - 3rd: Music Production (2023, 2024)',
            ' - 3rd: Extemporaneous Speech (2024)'
        ]
    }
]

// Section component with safe state handling
const Section = memo(function Section({ id, title, items }) {
    const [openIndices, setOpenIndices] = useState({})
    const toggleIndex = (index) => {
        setOpenIndices((prev) => ({
            ...prev,
            [index]: !prev[index],
        }))
    }

    const isAwards = title === "Awards"

    return (
        <motion.section
            id={id}
            className="timeline-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <h2 className="timeline-section-title">{title}</h2>

            <motion.div className="timeline-column" variants={containerVariants}>
                {items.map((item, i) => {
                    const hasDetails = item.details && item.details.length > 0
                    const isOpen = openIndices[i] || false

                    return (
                        <motion.div
                            key={`${item.title}-${i}`}
                            className="timeline-item"
                            variants={itemVariants}
                        >
                            <div className="timeline-icon">{item.icon}</div>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <span className="timeline-title">{item.title}</span>
                                    {item.subtitle && <span className="timeline-sub">@{item.subtitle}</span>}
                                </div>
                                {item.date && <div className="timeline-date">{item.date}</div>}
                                {item.description && <div className="timeline-description">{item.description}</div>}

                                {isAwards && hasDetails ? (
                                    <>
                                        <button
                                            className={`timeline-toggle-button ${isOpen ? 'open' : ''}`}
                                            onClick={() => toggleIndex(i)}
                                        >
                                            <span>{isOpen ? 'Hide Details' : 'Show Details'}</span>
                                            <FaChevronDown className="chevron-icon" />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.ul
                                                    className="timeline-details"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                                >
                                                    {item.details.map((d, j) => (
                                                        <li key={j}>{d}</li>
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    hasDetails && (
                                        <ul className="timeline-details">
                                            {item.details.map((d, j) => (
                                                <li key={j}>{d}</li>
                                            ))}
                                        </ul>
                                    )
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </motion.div>
        </motion.section>
    )
})

export default function TimeLineComponent() {
    return (
        <div className="custom-timeline-wrapper">
            <Section id="Education" title="Education" items={education} />
            <Section id="Work" title="Work Experience" items={work} />
            <Section id="Publications" title="Publications & Conferences" items={publications} />
            <Section id="Awards" title="Awards" items={awards} />
        </div>
    )
}