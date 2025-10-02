import './App.css'
import 'react-vertical-timeline-component/style.min.css'
import { useEffect, useMemo, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { FileText, Download, Github, ExternalLink, Rocket, BookOpen, Trophy, Medal, ChevronDown } from "lucide-react"

/* ────────────────────────────────────────────────────────────────────────── */
/* Minimal UI components (no libs)                                           */
/* ────────────────────────────────────────────────────────────────────────── */
function Card({ children, className = "", style = {} }) {
    const base = {
        borderRadius: 14,
        border: '1px solid var(--border)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
        boxShadow: 'var(--shadow-1)',
        padding: '18px',
        transition: 'transform var(--dur-3) var(--ease), box-shadow var(--dur-3) var(--ease), border-color var(--dur-2) var(--ease)',
    }
    return (
        <article
            className={className}
            style={base}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.45)'; e.currentTarget.style.borderColor = 'rgba(0,255,255,0.28)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-1)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
            {children}
        </article>
    )
}
function CardHeader({ children }) { return <div style={{ marginBottom: 8 }}>{children}</div> }
function CardTitle({ children, className = "" }) { return <h3 className={className} style={{ margin: 0, fontSize: '1.15rem', color: 'var(--fg)' }}>{children}</h3> }
function CardDescription({ children }) { return <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.9rem' }}>{children}</p> }
function CardContent({ children, className = "" }) { return <div className={className} style={{ display: 'grid', gap: 10 }}>{children}</div> }
function CardFooter({ children, className = "" }) { return <div className={className} style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>{children}</div> }

function Badge({ children }) {
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid var(--border)',
                borderRadius: 999,
                padding: '4px 8px',
                fontSize: '.75rem',
                fontWeight: 600,
                color: 'var(--fg)',
                background: 'rgba(255,255,255,0.04)',
            }}
        >
      {children}
    </span>
    )
}


/* ────────────────────────────────────────────────────────────────────────── */
/* Links                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */
const highlightLinks = [
    { label: '/resume',       href: '#resume'       },
    { label: '/projects',     href: '#projects'     },
    { label: '/papers', href: '#papers' },
    { label: '/honors',       href: '#honors'       },
]

const socialLinks = [
    { img: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', alt: 'LinkedIn', href: 'https://linkedin.com/in/srujanyamali' },
    { img: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',   alt: 'GitHub',   href: 'https://github.com/Srujyama' },
    { img: 'https://cdn-icons-png.flaticon.com/512/561/561127.png', alt: 'Email',    href: 'mailto:srujanyamali@berkeley.edu' },
]

/* ────────────────────────────────────────────────────────────────────────── */
/* Projects (2)                                                              */
/* ────────────────────────────────────────────────────────────────────────── */
const projectsData = [
    {
        name: "DrosophilaCV",
        title: "Real-Time Behavioral Detection & Tracking",
        description:
            "End-to-end tool with OpenCV + PyQt6 for tracking mating / thigmotaxis behavior. Processed a 730 GB dataset; >90% manual time saved.",
        stack: ["Python", "OpenCV", "PyQt6", "NumPy", "Pandas"],
        links: [
            { label: "GitHub", href: "https://github.com/Srujyama/Drosophila-Desire-Detector", icon: <Github size={16} /> },
            { label: "Abstract", href: "https://www.ibangs.org/assets/documents/IBANGS%20Annual%20Meeting%202024_%20Genes%2C%20Brain%20and%20Behavior.pdf", icon: <ExternalLink size={16} /> },
        ],
        next: [
            "Plugin system for custom classifiers",
            "Parquet export + built-in visualization dashboard",
            "Cross-platform binaries (Win/macOS/Linux)",
        ],
    },
    {
        name: "RedCarpet",
        title: "Genomic Changepoint Heat-Map Engine",
        description:
            "Changepoint detection across large sequences with clustering and batch heatmaps; parallelized and built for scale.",
        stack: ["Python", "ruptures", "NumPy", "SciPy", "scikit-learn", "Matplotlib"],
        links: [
            { label: "GitHub", href: "https://github.com/microbialARC/Redcarpet", icon: <Github size={16} /> },
            { label: "Abstract", href: "https://icmsmeetings.eventsair.com/isssi-2024/speakers", icon: <ExternalLink size={16} /> },
        ],
        next: [
            "CLI (detect, cluster, visualize)",
            "HDF5/TileDB backing for 10k+ genomes",
            "Bayesian segment merging + QC report",
        ],
    },
    {
        name: "DrosophilaVialTracker",
        title: "Vial Tracking App for D. melanogaster",
        description:
            "Desktop GUI to log vial color/genotype/temperature, auto-calc flip & virgin-collection dates, batch-add rows, update/remove entries, and persist to JSON.",
        stack: ["Python", "PyQt6", "JSON"],
        links: [
            { label: "GitHub", href: "https://github.com/Srujyama/DrosophilaVialTracker", icon: <Github size={16} /> },
        ],
        next: [
            "CSV/Excel import-export + filtering",
            "Editable column for notes & vial status",
            "Configurable day offsets (flip/virgin collection)",
            "Notifications (email/desktop) for upcoming flips",
            "Optional SQLite backend for multi-user lab PCs"
        ]
    },
    {
        name: "PDBAtomDistanceTool",
        title: "Swing + BioJava PDB Renderer & Atom Distance Tool",
        description:
            "Java desktop app using BioJava + Jmol to load and render PDB files. Provides interactive visualization, spin toggling, and utilities for measuring atomic distances.",
        stack: ["Java", "Swing", "BioJava", "Jmol"],
        links: [
            { label: "GitHub", href: "https://github.com/Srujyama/PDBAtomDistanceTool", icon: <Github size={16} /> },
        ],
        next: [
            "Add atom/chain distance measurement interface",
            "Support multiple PDB file overlays & alignments",
            "Export rendered structures to PNG/SVG",
            "Configurable visualization styles (cartoon, sticks)",
        ]
    },
]

/* ────────────────────────────────────────────────────────────────────────── */
/* Publications & Awards data                                                */
/* ────────────────────────────────────────────────────────────────────────── */
const papersData = [
    {
        authors: "R. Oliver, S. Yamali, S. Knox, T. Dadyala, L. Shao",
        title: "High-Throughput Behavioral Assay Unveils Female Courtship in Drosophila",
        venue: "International Behavioral & Neural Genetics Society (IBANGS), Western University, London, ON, Canada",
        year: "2024",
        links: [
            { label: "Abstract", href: "https://www.ibangs.org/assets/documents/IBANGS%20Annual%20Meeting%202024_%20Genes%2C%20Brain%20and%20Behavior.pdf" }
        ]
    },
    {
        authors: "R. Oliver, S. Yamali, S. Knox, T. Dadyala, L. Shao",
        title: "High-Throughput Behavioral Assay Unveils Female Courtship in Drosophila",
        venue: "Sexually Dimorphic Circuits & Behaviors, Janelia Research Campus (HHMI), Ashburn, VA",
        year: "2024",
        links: []
    },
    {
        authors: "A. Moustafa, E. Theiller, A. Lal, S. Yamali, A. Feder, A. Narechania, P. Planet",
        title: "Redcarpet: A Tool for Rapid Recombination Detection in Staphylococcus aureus and Other Species Amidst Expanding Genomic Databases",
        venue: "19th International Symposium on Staphylococci and Staphylococcal Infections (ISSSI), Perth, Australia",
        year: "2024",
        links: [
            { label: "Abstract", href: "https://icmsmeetings.eventsair.com/isssi-2024/speakers" },
            { label: "Project", href: "https://github.com/microbialARC/Redcarpet" }
        ]
    }
]

const awardsData = [
    { title: "Semi-Finalist: USA Biology Olympiad", org: "USABO Committee", date: "Mar 2024" },
    { title: "First Place Category — Delaware Valley Science Fair (Behavior)", org: "Delaware Valley University", date: "Apr 2024" },
    { title: "First Place in Zoology", org: "Del-Tech Stanton Campus", date: "Nov 2022" },
    { title: "Second Place — Healthcare Administration (State)", org: "Business Professionals of America", date: "Feb 2023" },
    { title: "Second Place — Digital Communication (Nationals)", org: "Business Professionals of America", date: "Apr 2023" },
    { title: "Finalist — Information Technology Concepts (Nationals)", org: "Business Professionals of America", date: "Apr 2023" },
    { title: "First Place — Website Design (State)", org: "Business Professionals of America", date: "Feb 2023", note: "$1,500 scholarship" },
    { title: "Third Place — Technology Problem Solving", org: "Technology Student Association", date: "Apr 2023" },
    { title: "Tenth Place — Agricultural Science", org: "Science Olympiad", date: "Mar 2023" },
]



/* ────────────────────────────────────────────────────────────────────────── */
/* Timeline data                                                             */
/* ────────────────────────────────────────────────────────────────────────── */
const timelineData = [
    {
        title: 'Assistant Bioinformatician',
        org: "Children’s Hospital of Philadelphia · Moustafa Lab",
        location: 'Philadelphia, PA',
        date: 'Nov 2023 – Aug 2025',
        bullets: [
            'Designed program to analyze evolutionary relationships in bacterial proteomic data using time-series analysis and data structures.',
            'Integrated kernel-based probabilistic changepoint analysis to identify recombination breakpoints across 75,000+ genomes (~37TB).',
            'Validated on known recombination events; produced high-resolution visualizations for comparative genomics.',
        ],
        type: 'work',
    },
    {
        title: 'Research Assistant',
        org: 'University of Delaware · Shao Lab',
        location: 'Newark, DE',
        date: 'Jun 2023 – Aug 2024',
        bullets: [
            'Used OpenCV to analyze D. melanogaster mating behaviors across 730GB of data; studied effects of addictive agents.',
            'Investigated NPF signaling and reward perception; explored reduction of addiction.',
            'Built high-throughput thigmotaxis capture/analysis pipeline for anxiety-modeling studies.',
        ],
        type: 'work',
    },
    {
        title: 'Research Intern',
        org: 'Cornell University · Hein Lab',
        location: 'Remote',
        date: 'Mar 2024 – Aug 2024',
        bullets: [
            'Developed ML models to analyze ecological interactions in coral reef fish populations.',
            'Applied YOLO-based detection to automate identification and tracking under predation.',
            'Assisted in inferring decision-making rules via stochastic models.',
        ],
        type: 'work',
    },
    {
        title: 'Research Trainee',
        org: 'Perelman School of Medicine · Gupta Lab',
        location: 'Philadelphia, PA',
        date: 'Jul 2023 – Aug 2023',
        bullets: [
            'Protein purification/crystallization; SDS-PAGE & Western blot validation.',
            'Cell cultures using inverse PCR for point mutation in E. coli.',
            'Assisted X-ray crystallography data collection/analysis.',
        ],
        type: 'work',
    },
    {
        title: 'Bachelors of Arts in Molecular and Cellular Biology & Computer Science',
        org: 'University of California, Berkeley',
        location: '',
        date: 'Aug 2025 – May 2029',
        bullets: [
            'Coursework and projects spanning computational biology, algorithms, and systems.',
        ],
        type: 'education',
    },
]

/* ────────────────────────────────────────────────────────────────────────── */
/* Matrix + cells                                                            */
/* ────────────────────────────────────────────────────────────────────────── */
const symbols = ['6.626', '1.618', '2.718', '3.141']
const randIndex = () => Math.floor(Math.random() * symbols.length)

function MatrixCell({ isHighlight, label, href, style }) {
    const [value, setValue] = useState(() => symbols[randIndex()])

    useEffect(() => {
        if (!isHighlight) {
            const id = setInterval(() => {
                setValue(symbols[randIndex()])
            }, 1500 + Math.random() * 1500)
            return () => clearInterval(id)
        }
    }, [isHighlight])

    const className = isHighlight ? 'grid-item highlight fade-in' : 'grid-item fade-in'

    return isHighlight ? (
        <a
            href={href}
            className={className}
            style={style}
            aria-label={`Jump to ${label.replace('/', '')} section`}
            role="gridcell"
        >
            {label}
        </a>
    ) : (
        <div
            className={className}
            style={style}
            role="presentation"
            aria-hidden="true"
        >
            {value}
        </div>
    )
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Timeline                                                                  */
/* ────────────────────────────────────────────────────────────────────────── */
function ResumeTimeline() {
    const getLogoForItem = (item) => {
        const org = item.org.toLowerCase()
        if (
            org.includes('perelman') ||
            org.includes("children’s hospital of philadelphia") ||
            org.includes("children's hospital of philadelphia")
        ) return '/UniversityofPennsylvania_Shield_RGB-2.png'
        if (org.includes('cornell')) return '/Cornell_University_seal.png'
        if (org.includes('princeton')) return '/Princeton_seal.png'
        if (org.includes('berkeley')) return '/Seal_of_University_of_California_Berkeley.png'
        if (org.includes('delaware')) return '/ud-seal-ocm.png'
        return null
    }

    const palette = {
        work: {
            iconBg: 'rgba(14,165,233,0.25)',
            iconBorder: '1px solid rgba(14,165,233,0.45)',
            contentBg: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(14,165,233,0.06))',
            contentBorder: '1px solid rgba(14,165,233,0.25)',
            accent: '#0ea5e9',
        },
        education: {
            iconBg: 'rgba(34,197,94,0.25)',
            iconBorder: '1px solid rgba(34,197,94,0.45)',
            contentBg: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(34,197,94,0.06))',
            contentBorder: '1px solid rgba(34,197,94,0.25)',
            accent: '#22c55e',
        },
    }

    return (
        <VerticalTimeline lineColor="rgba(255,255,255,0.18)" layout="1-column-left">
            {timelineData.map((item, i) => {
                const c = palette[item.type] ?? palette.work
                const logo = getLogoForItem(item)
                const initials = item.org.replace(/·.+$/, '').match(/\b[A-Z]/g)?.slice(0,3).join('') || '•'

                return (
                    <VerticalTimelineElement
                        key={i}
                        date={item.date}
                        icon={
                            <div className="vt-icon-inner" aria-hidden="true">
                                {logo ? (
                                    <img src={logo} alt={`${item.org} logo`} className="vt-logo" width="32" height="32" loading="lazy" decoding="async" />
                                ) : (
                                    <span className="vt-initials">{initials}</span>
                                )}
                            </div>
                        }
                        iconStyle={{
                            background: c.iconBg,
                            backdropFilter: 'blur(6px)',
                            color: '#fff',
                            borderRadius: 12,
                            border: c.iconBorder,
                        }}
                        contentStyle={{
                            background: c.contentBg,
                            color: 'var(--fg)',
                            border: c.contentBorder,
                            borderRadius: 14,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                        }}
                        contentArrowStyle={{ borderRight: '7px solid rgba(255,255,255,0.06)' }}
                    >
                        <div className="vt-toprow">
              <span className="vt-badge" style={{ borderColor: c.accent, color: c.accent }}>
                {item.type === 'education' ? 'Education' : 'Experience'}
              </span>
                            <span className="vt-date">{item.date}</span>
                        </div>

                        <h3 className="vt-title">{item.title}</h3>

                        <div className="vt-orgline">
              <span className="vt-org" style={{ background: `linear-gradient(90deg, ${c.accent}33, transparent)` }}>
                {item.org}{item.location ? ` · ${item.location}` : ''}
              </span>
                        </div>

                        <ul className="vt-list">
                            {item.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                        </ul>
                    </VerticalTimelineElement>
                )
            })}
        </VerticalTimeline>
    )
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Projects (no external UI libs)                                            */
/* ────────────────────────────────────────────────────────────────────────── */
function ProjectsSection() {
    return (
        <section id="projects" className="section">
            <header className="resume-header">
                <h2 className="resume-title">Projects</h2>
                <p className="resume-sub">Selected builds from research and engineering</p>
                <div className="resume-divider" />
            </header>

            {/* Responsive grid using plain CSS grid via inline styles */}
            <div
                style={{
                    display: 'grid',
                    gap: 18,
                    gridTemplateColumns: 'repeat(12, 1fr)',
                }}
            >
                {projectsData.map((p, idx) => (
                    <div key={idx} style={{ gridColumn: 'span 6' }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">{p.title}</CardTitle>
                                <CardDescription>{p.name}</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p style={{ color: 'var(--muted)', margin: 0 }}>{p.description}</p>

                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {p.stack.map((s, i) => <Badge key={i}>{s}</Badge>)}
                                </div>

                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: '.9rem', marginBottom: 4 }}>
                                        <span>Next Up</span>
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: '1.05rem', color: 'var(--muted)' }}>
                                        {p.next.map((t, i) => <li key={i} style={{ margin: '.25rem 0' }}>{t}</li>)}
                                    </ul>
                                </div>
                            </CardContent>

                            <CardFooter>
                                {p.links.map((l, i) => (
                                    <a
                                        key={i}
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: 'none',
                                            background: '#ffffff',
                                            color: '#0f172a',
                                            border: '1px solid #e5e7eb',
                                            padding: '.55rem .85rem',
                                            borderRadius: 10,
                                            fontWeight: 600,
                                            fontSize: '.92rem',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 8,
                                        }}
                                    >
                                        {l.icon}{l.label}
                                    </a>
                                ))}
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Simple responsive tweak without extra CSS */}
            <style>{`
        @media (max-width: 900px){
          #projects .section-grid-item { grid-column: span 12 !important; }
        }
      `}</style>
        </section>
    )
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Publications & Honors sections                                            */
/* ────────────────────────────────────────────────────────────────────────── */
function PapersSection() {
    return (
        <section id="papers" className="section">
            <header className="resume-header">
                <h2 className="resume-title">Publications & Conferences</h2>
                <p className="resume-sub">Selected abstracts, posters, and talks</p>
                <div className="resume-divider" />
            </header>

            <div style={{ display:'grid', gap: 14 }}>
                {papersData.map((p, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardTitle className="text-xl" style={{ lineHeight: 1.35 }}>{p.title}</CardTitle>
                            <CardDescription>{p.authors}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p style={{ margin: 0, color: 'var(--muted)' }}>
                                {p.venue} · {p.year}
                            </p>
                        </CardContent>
                        {p.links?.length ? (
                            <CardFooter>
                                {p.links.map((l, j) => (
                                    <a
                                        key={j}
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: 'none',
                                            background: '#ffffff',
                                            color: '#0f172a',
                                            border: '1px solid #e5e7eb',
                                            padding: '.5rem .8rem',
                                            borderRadius: 10,
                                            fontWeight: 600,
                                            fontSize: '.9rem',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 8,
                                        }}
                                    >
                                        <ExternalLink size={16} /> {l.label}
                                    </a>
                                ))}
                            </CardFooter>
                        ) : null}
                    </Card>
                ))}
            </div>
        </section>
    )
}

function HonorsSection() {
    const [expandedAward, setExpandedAward] = useState(null)

    const awardsGrouped = [
        {
            id: 'presidential',
            title: 'Presidential Volunteer Service Award - Gold',
            org: 'United States Government',
            date: 'May 2024',
            description: 'Recognized for exceptional volunteer service contributions to the community.',
            logo: '/prez_volunteer_awardlogo_april_09_flat_custom.jpg'
        },
        {
            id: 'dvsf',
            title: '1st Place in Behavior at Delaware Valley Science Fair',
            org: 'Delaware Valley Science Fair',
            date: 'Apr 2024',
            description: 'First place in behavior category at the most competitive regional science fair.',
            logo: '/DVSF.jpeg'
        },
        {
            id: 'usabo',
            title: 'USA Biology Olympiad Semi-Finalist',
            org: 'Center for Excellence in Education',
            date: 'Mar 2024',
            description: 'The USA Biology Olympiad, or USABO, is a prestigious biology competition for high school students in the United States. Launched in 2002, USABO\'s mission is to recognize and empower up-and-coming life science students through rigorous biology exams and international networking opportunities. Qualified for the Semifinals round, placing amongst the top 10% of national test-takers.',
            logo: '/USABO.jpg'
        },
        {
            id: 'apscholar',
            title: 'AP Scholar with Distinction',
            org: 'College Board',
            date: 'Jul 2023',
            description: 'Granted to students who receive an average score of at least 3.5 on all AP Exams taken, and scores of 3 or higher on five or more of these exams.',
            logo: '/ap_logo.png'
        },
        {
            id: 'bpa',
            title: 'BPA Awards',
            org: 'Business Professionals of America',
            date: '2023-2025',
            description: 'Multiple state and national level achievements in business and technology competitions.',
            logo: '/BPA.jpg',
            hasExpand: true,
            categories: [
                {
                    label: 'National',
                    items: [
                        'Eighth place in Information Technology Concepts (2023)',
                        'Seventh place in Parliamentary Procedure Concepts (2023)',
                        'Second place in Digital Communication (2023)',
                        'Second place in Healthcare Administration Concepts (2024)'
                    ]
                },
                {
                    label: 'State',
                    items: [
                        'First place in Website Design (2023) - $1,500 scholarship',
                        'Second place in Healthcare Administration (2023)',
                        'First place in Healthcare Administration Concepts (2024)',
                        'Second place in Website Design (2024)',
                        'First place in Meeting and Event Planning Concepts (2025)',
                        'Second place in Administrative Support Concepts (2025)',
                        'Third place in Digital Communication & Design Concepts (2025)',
                        'Third place in Project Management Concepts (2025)',
                        'Third place in Website Design (2025)'
                    ]
                }
            ]
        },
        {
            id: 'tsa',
            title: 'TSA Awards',
            org: 'Technology Student Association',
            date: '2023-2024',
            description: 'State-level recognition in biotechnology, music production, and problem-solving competitions.',
            logo: '/Technology_Student_Association_Emblem.svg.png',
            hasExpand: true,
            categories: [
                {
                    label: 'State',
                    items: [
                        'Second place in Biotechnology Design (2023, 2024)',
                        'Third place in Music Production (2023, 2024)',
                        'Third place in Extemporaneous Speech (2024)',
                        'Third place in Technology Problem Solving (2023)'
                    ]
                }
            ]
        }
    ]

    const toggleAward = (id) => {
        setExpandedAward(expandedAward === id ? null : id)
    }

    return (
        <section id="honors" className="section">
            <header className="resume-header">
                <h2 className="resume-title">Awards & Honors</h2>
                <p className="resume-sub">Recognitions and achievements</p>
                <div className="resume-divider" />
            </header>

            <div className="awards-grid">
                {awardsGrouped.map((award) => (
                    <div key={award.id} className="award-card-new">
                        <div
                            className="award-main"
                            onClick={() => award.hasExpand && toggleAward(award.id)}
                            style={{ cursor: award.hasExpand ? 'pointer' : 'default' }}
                        >
                            <div className="award-icon-wrapper">
                                <img
                                    src={award.logo}
                                    alt={`${award.org} logo`}
                                    className="award-logo-img"
                                />
                            </div>

                            <div className="award-content-main">
                                <div className="award-top-row">
                                    <h3 className="award-title-new">{award.title}</h3>
                                    <span className="award-date-badge">{award.date}</span>
                                </div>
                                <p className="award-org-new">{award.org}</p>
                                {award.description && (
                                    <p className="award-description">{award.description}</p>
                                )}

                                {award.hasExpand && (
                                    <button className="expand-btn" aria-label="Expand details">
                                        <ChevronDown
                                            size={20}
                                            style={{
                                                transform: expandedAward === award.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease'
                                            }}
                                        />
                                        <span>{expandedAward === award.id ? 'Show less' : 'Show details'}</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {award.hasExpand && (
                            <div
                                className="award-expand-content"
                                style={{
                                    maxHeight: expandedAward === award.id ? '1000px' : '0',
                                    opacity: expandedAward === award.id ? 1 : 0,
                                }}
                            >
                                {award.categories.map((cat, idx) => (
                                    <div key={idx} className="award-category">
                                        <h4 className="category-label">{cat.label}</h4>
                                        <ul className="category-list">
                                            {cat.items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

/* ────────────────────────────────────────────────────────────────────────── */
/* App                                                                        */
/* ────────────────────────────────────────────────────────────────────────── */
export default function App() {
    const positionsToLinks = useMemo(() => {
        const map = new Map()
        ;[26, 33, 77, 84].forEach((pos, i) => map.set(pos, highlightLinks[i]))
        return map
    }, [])

    const gridItems = useMemo(() => {
        return Array.from({ length: 144 }, (_, i) => {
            const link = positionsToLinks.get(i) || null
            const row = Math.floor(i / 12)
            const col = i % 12
            const delay = (row + col) * 100
            return (
                <MatrixCell
                    key={i}
                    isHighlight={!!link}
                    label={link?.label}
                    href={link?.href}
                    style={{ animationDelay: `${delay}ms` }}
                />
            )
        })
    }, [positionsToLinks])

    const [showInfo, setShowInfo] = useState(false)

    return (
        <>
            {/* HERO */}
            <section className="hero">
                <div className="matrix-container">
                    <h1 className="matrix-title text-fade-in">Srujan Yamali</h1>
                    <p className="matrix-sub text-fade-in delay-1">CS + Bio @ UC Berkeley</p>

                    <div className="social-icons" aria-label="Social links">
                        {socialLinks.map((s, idx) => (
                            <a
                                href={s.href}
                                key={idx}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.alt}
                                referrerPolicy="no-referrer"
                            >
                                <img
                                    src={s.img}
                                    alt=""
                                    className="icon"
                                    width="32"
                                    height="32"
                                    loading="lazy"
                                    decoding="async"
                                    aria-hidden="true"
                                />
                            </a>
                        ))}
                    </div>

                    <div className="matrix-grid" role="grid" aria-label="Matrix navigation grid">
                        {gridItems}
                    </div>

                    <button
                        className="info-button fade-in"
                        onClick={() => setShowInfo(prev => !prev)}
                        aria-expanded={showInfo}
                        aria-controls="numbers-meaning"
                    >
                        {showInfo ? 'Hide' : 'What do the numbers mean?'}
                    </button>

                    <div
                        id="numbers-meaning"
                        className="info-panel"
                        style={{
                            maxHeight: showInfo ? '60vh' : 0,
                            opacity: showInfo ? 1 : 0,
                            transform: showInfo ? 'translateY(0)' : 'translateY(8px)',
                            pointerEvents: showInfo ? 'auto' : 'none',
                        }}
                    >
                        <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                            <li><b>6.626</b> — Planck's constant (<i>h</i>).</li>
                            <li><b>1.618</b> — Golden ratio (φ).</li>
                            <li><b>2.718</b> — Euler’s number (<i>e</i>).</li>
                            <li><b>3.141</b> — π (pi).</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* RESUME */}
            <section id="resume" className="section">
                <header className="resume-header">
                    <h2 className="resume-title">Resume</h2>
                    <p className="resume-sub">Experience, research, and education</p>
                    <div className="resume-divider" />
                </header>

                <div className="resume-actions">
                    <a
                        href="/Srujan_Yamali__Software_Resume_Sept_2025.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-btn"
                    >
                        <FileText className="resume-icon" aria-hidden="true" />
                        <span>View</span>
                    </a>
                    <a
                        href="/Srujan_Yamali__Software_Resume_Sept_2025.pdf"
                        download
                        className="resume-btn"
                    >
                        <Download className="resume-icon" aria-hidden="true" />
                        <span>Download</span>
                    </a>
                </div>

                <ResumeTimeline />
            </section>

            {/* PROJECTS */}
            <ProjectsSection />

            {/* PUBLICATIONS */}
            <PapersSection />

            {/* HONORS */}
            <HonorsSection />
        </>
    )
}
