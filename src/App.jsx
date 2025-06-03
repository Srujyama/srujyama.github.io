import './App.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const highlightLinks = [
    { label: '/resume', href: '/resume' },
    { label: '/projects', href: '/projects' },
    { label: '/contact', href: '/contact' },
    { label: '/about', href: '/about' }
]

const socialLinks = [
    { img: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', alt: 'LinkedIn', href: 'https://linkedin.com/in/srujanyamali' },
    { img: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', alt: 'GitHub', href: 'https://github.com/srujyama' },
    { img: 'https://cdn-icons-png.flaticon.com/512/561/561127.png', alt: 'Email', href: 'mailto:srujanyamali@berkeley.edu' }
]

const symbols = ['4096', '1.618', '2.718', '3.141']

function MatrixCell({ isHighlight, label, href, style }) {
    const [value, setValue] = useState(symbols[Math.floor(Math.random() * symbols.length)])

    useEffect(() => {
        if (!isHighlight) {
            const interval = setInterval(() => {
                const next = symbols[Math.floor(Math.random() * symbols.length)]
                setValue(next)
            }, 500 + Math.random() * 700)
            return () => clearInterval(interval)
        }
    }, [isHighlight])

    const className = isHighlight ? "grid-item highlight fade-in" : "grid-item fade-in"

    return isHighlight ? (
        <Link to={href} className={className} style={style}>
            {label}
        </Link>
    ) : (
        <div className={className} style={style}>
            {value}
        </div>
    )
}


function App() {
    const highlightPositions = [26, 33, 77, 121] // randomly chosen positions

    const gridItems = Array.from({ length: 144 }, (_, i) => {
        const linkIndex = highlightPositions.indexOf(i)
        const link = linkIndex !== -1 ? highlightLinks[linkIndex] : null

        const row = Math.floor(i / 12)
        const col = i % 12
        const delay = (row + col) * 100 // delay in ms based on diagonal index

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

    return (
        <div className="matrix-container">
            <h1 className="matrix-title text-fade-in">Srujan Yamali</h1>
            <p className="matrix-sub text-fade-in delay-1">CS + Bio @ UC Berkeley</p>


            <div className="social-icons">
                {socialLinks.map((s, idx) => (
                    <a href={s.href} key={idx} target="_blank" rel="noopener noreferrer">
                        <img src={s.img} alt={s.alt} className="icon"/>
                    </a>
                ))}
            </div>


            <div className="matrix-grid">
                {gridItems}
            </div>
        </div>
    )
}

export default App
