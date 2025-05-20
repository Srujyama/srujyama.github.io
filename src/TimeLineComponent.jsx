import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase, FaHandsHelping, FaMicroscope } from 'react-icons/fa'
import { SiMicrogenetics } from "react-icons/si";
import { SiUml } from "react-icons/si";
import { DiPython } from "react-icons/di";
import { FaUserGraduate } from "react-icons/fa6";



import './TimeLineComponent.css'

const education = [
    {
        icon: <FaUserGraduate />,
        title: 'Newark Charter High School',
        subtitle: ' Computer Science',
        date: '2021 – 2025 | Newark, DE',
        description: 'High School Diploma',
        details: ['GPA: 4.5 / 4.0 (Weighted)']
    },
    {
        icon: <FaGraduationCap />,
        title: 'UC Berkeley',
        subtitle: ' Computer Science and Economics',
        date: '2025 – Present | Berkeley, CA',
        description: 'B.A. in Computer Science and Economics',
        details: ['GPA: TBD']
    }
]

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

function Section({ title, items }) {
    return (
        <div className="timeline-section">
            <h2 className="timeline-section-title">{title}</h2>
            <div className="timeline-column">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        <div className="timeline-icon">{item.icon}</div>
                        <div className="timeline-content">
                            <div className="timeline-header">
                                <span className="timeline-title">{item.title}</span>
                                <span className="timeline-sub">@{item.subtitle}</span>
                            </div>
                            <div className="timeline-date">{item.date}</div>
                            <div className="timeline-description">{item.description}</div>
                            <ul className="timeline-details">
                                {item.details.map((d, j) => (
                                    <li key={j}>{d}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default function TimeLineComponent() {
    return (
        <div className="custom-timeline-wrapper">
            <Section title="Education" items={education} />
            <Section title="Work Experience" items={work} />
        </div>
    )
}

