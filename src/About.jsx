import React, { useEffect, useState } from 'react'
import Header from './Header'
import './About.css'
import './Resume.css'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

const techStack = [
    { name: 'Python', description: 'Programming Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'React', description: 'JavaScript Library', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', description: 'Backend Runtime', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Git', description: 'Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'HTML', description: 'Markup Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', description: 'Style Sheet Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Docker', description: 'Containerization', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'R', description: 'Statistical Computing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
]

const sections = ['Bio','Map', 'Research', 'Finance', 'Beyond', 'Stack']

export default function About() {
    const [activeSection, setActiveSection] = useState('map')

    useEffect(() => {
        const handleScroll = () => {
            const scrollMid = window.innerHeight / 2
            let currentSection = sections[0]
            let smallestDiff = Infinity

            for (const id of sections) {
                const el = document.getElementById(id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    const diff = Math.abs(rect.top + rect.height / 2 - scrollMid)

                    if (diff < smallestDiff) {
                        smallestDiff = diff
                        currentSection = id
                    }
                }
            }

            setActiveSection(currentSection)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial call
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


    return (
        <div className="resume-container">
            <Header/>

            <motion.h1
                className="resume-title about-main-title"
                initial={{y: -20, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.6, delay: 0.2}}
            >
                About Me
            </motion.h1>

            {/* Sticky left nav */}
            <nav className="about-nav-vertical">
                <div className="nav-line"/>
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
                                const targetY = yOffset - (window.innerHeight / 2) + (el.offsetHeight / 2)
                                window.scrollTo({top: targetY, behavior: 'smooth'})
                            }
                        }}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                ))}
            </nav>


            <div className="about-content">
                <motion.section
                    id="Bio"
                    className="about-section"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    viewport={{once: true}}
                >
                    <h2 className="about-subtitle">Who I Am</h2>
                    <p className="about-text">
                        I’m <span className="highlight">Srujan Yamali</span>, an undergraduate researcher at UC Berkeley
                        studying Molecular & Cellular Biology and Computer Science. My academic focus sits at the edge
                        of complexity — how systems evolve, behave, and interact, whether they’re biological circuits,
                        financial markets, or machine learning agents. I build tools, design models, and ask questions
                        that connect these domains.
                    </p>

                    <p className="about-text">
                        I’m not interested in mastering just one thing — I’m interested in mastering how things connect.
                        That curiosity has led me through bioinformatics pipelines, behavior modeling experiments, LLM
                        security tests, and more recently, into the quantitative intricacies of financial systems. I’m
                        driven by the belief that rigor across fields can produce ideas that actually move the world
                        forward — and I want to be at that intersection.
                    </p>

                    <p className="about-text">
                        Above all, I like building things that matter — things that test my intuition, challenge my
                        assumptions, and give people something useful. I bring intensity, clarity, and a
                        systems-thinking mindset into every project I touch.
                    </p>
                </motion.section>


                <motion.section
                    id="Map"
                    className="about-section"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    viewport={{once: true}}
                >

                    <h2 className="about-subtitle">Global Research Map</h2>
                    <MapContainer center={[39.5, -98.35]} zoom={4.3} scrollWheelZoom={false} className="leaflet-map">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        <Marker position={[37.8715, -122.2730]}>
                            <Popup>
                                <div className="popup-content">
                                    <img src="Seal_of_University_of_California_Berkeley.png" alt="Berkeley" className="popup-logo" />
                                    <p>UC Berkeley – CHAI</p>
                                </div>
                            </Popup>
                        </Marker>
                        <Marker position={[39.6837, -75.7497]}>
                            <Popup>
                                <div className="popup-content">
                                    <img src="ud-seal-ocm.png" alt="UD" className="popup-logo" />
                                    <p>UD – Shao Lab</p>
                                </div>
                            </Popup>
                        </Marker>
                        <Marker position={[39.9526, -75.1652]}>
                            <Popup>
                                <div className="popup-content">
                                    <img src="UniversityofPennsylvania_Shield_RGB-2.png" alt="UPenn" className="popup-logo" />
                                    <p>CHOP – Moustafa Lab </p>
                                </div>
                            </Popup>
                        </Marker>
                        <Marker position={[40.3430, -74.6514]}>
                            <Popup>
                                <div className="popup-content">
                                    <img src="Princeton_seal.png" alt="Princeton" className="popup-logo" />
                                    <p>Princeton – Genomics</p>
                                </div>
                            </Popup>
                        </Marker>
                        <Marker position={[42.4534, -76.4735]}>
                            <Popup>
                                <div className="popup-content">
                                    <img src="Cornell_University_seal.png" alt="Cornell" className="popup-logo" />
                                    <p>Cornell – Hein Lab  </p>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </motion.section>

                <section id="Research" className="about-section">
                    <h2 className="about-subtitle">Research Journey</h2>
                    <p className="about-text">
                        My journey as a researcher began with a deep curiosity for how complex systems behave — whether
                        in the brain, in ecological networks, or across genomes. At the University of Delaware’s Shao
                        Lab, I studied the genetic drivers of behavior in <em>Drosophila melanogaster</em>, where I
                        built high-throughput behavioral pipelines to decode courtship, anxiety, and social interaction
                        patterns at scale. Working with collaborators at Princeton, I analyzed how genomic variations
                        affect thigmotactic behavior — a behavioral biomarker for fear and addiction.
                    </p>
                    <p className="about-text">
                        At the Children’s Hospital of Philadelphia, I transitioned into computational biology and
                        bioinformatics, building tools to track evolutionary recombination in microbial genomes. My
                        algorithms identified breakpoints in over 75,000 samples and were presented at international
                        conferences. I’ve also contributed to ecological machine learning research at Cornell,
                        developing models to analyze fish behavior in coral reefs and understand population-level
                        decision-making dynamics. Research grounds everything I do — it's where I hone my intuition and
                        technical precision.
                    </p>
                </section>

                <section id="Finance" className="about-section">
                    <h2 className="about-subtitle">Finance</h2>
                    <p className="about-text">
                        As I’ve grown as a researcher, I’ve also developed a deep interest in the financial markets —
                        specifically in how technical tools can be applied to decision-making under uncertainty. I see
                        finance as another domain of complex systems: fast-moving, high-dimensional, and data-driven. My
                        goal is to bring the same rigor I’ve applied to biology and neuroscience to domains like
                        investment banking, quant research, and algorithmic trading.
                    </p>
                    <p className="about-text">
                        I’m currently expanding my skills in quantitative modeling, time series forecasting, and data
                        structures used in low-latency execution systems. From Monte Carlo simulations to model-driven
                        strategies, I’m exploring how my background in behavior modeling and statistical genomics can
                        translate into actionable insight in financial environments. I’m excited by the challenge of
                        applying research thinking to fast-paced, high-stakes domains — and I’m actively building toward
                        that path.
                    </p>
                </section>

                <section id="Beyond" className="about-section">
                    <h2 className="about-subtitle">Beyond the Lab</h2>
                    <p className="about-text">
                        When I’m not building models or writing code, I’m sketching, journaling, or reading about
                        Revolutionary-era history. I’m fascinated by the intellectual foundations that shaped modern
                        society — and how philosophy, politics, and science have always been intertwined. I spend time
                        thinking about systems — biological, economic, and societal — and how we can shape them
                        responsibly.
                    </p>
                    <p className="about-text">
                        I believe in being more than just a technician. My creativity feeds my research. My interest in
                        ethics shapes how I think about AI. And my time outside the lab makes me a better collaborator,
                        problem-solver, and systems thinker. Whether I’m designing an experiment or just getting lost in
                        a book, I’m always exploring new connections — and I bring that mindset to everything I build.
                    </p>
                </section>


                <section id="Stack" className="about-section">
                    <h2 className="about-subtitle">Tech Stack & Tools</h2>
                    <div className="tech-stack-grid">
                        {techStack.map((tech, index) => (
                            <div key={index} className="tech-card">
                                <img src={tech.icon} alt={tech.name} className="tech-icon"/>
                                <div className="tech-text">
                                    <h3>{tech.name}</h3>
                                    <p>{tech.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
