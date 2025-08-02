import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import Resume from './Resume.jsx'
import Projects from './Projects.jsx'
import Contact from './Contact.jsx'
import About from './About.jsx'
import FlyFlirt from './FlyFlirt.jsx'

import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/flyflirt" element={<FlyFlirt />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
