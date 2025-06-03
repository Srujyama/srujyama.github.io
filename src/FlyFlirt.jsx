import React from 'react';
import Header from './Header';
import './Resume.css';
import './Projects.css';
import { motion } from 'framer-motion';

export default function FlyFlirt() {
    return (
        <div className="resume-container">
            <Header />
            <section className="neural-section">
                <motion.h1
                    className="resume-title"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1 className="neural-title text-fade-in">FlyFlirt</h1>
                </motion.h1>
                <p className="neural-sub text-fade-in delay-1">
                    Computer vision pipeline to detect mating behavior in <i>Drosophila melanogaster</i>.
                </p>
            </section>

            <section className="project-detail-section text-fade-in delay-2">
                <h2 className="section-header">Overview</h2>
                <p>
                    FlyFlirt is a desktop application for high-throughput behavioral analysis of fruit flies, designed to identify and quantify mating events using video processing, real-time tracking, and statistical logic.
                </p>

                <h2 className="section-header">Key Features</h2>
                <ul>
                    <li>Interactive PyQt6 GUI for video upload, ROI selection, and live preview</li>
                    <li>Real-time blob detection and mating status inference using OpenCV</li>
                    <li>Gender-based trail mapping and center-duration tracking</li>
                    <li>Supports bulk video queuing and automated export of behavior metrics</li>
                    <li>Grace frame handling and edge-based ROI voiding</li>
                </ul>

                <h2 className="section-header">Technologies Used</h2>
                <p>Python, PyQt6, OpenCV, NumPy, Pandas, SciPy, JSON</p>

                <h2 className="section-header">Core Algorithms</h2>
                <p>
                    Mating detection relies on a combination of:
                </p>
                <ul>
                    <li>Blob-based fly detection (area filtering)</li>
                    <li>ROI masking and tracking over time</li>
                    <li>Temporal correlation of fly count transitions and positional overlap</li>
                    <li>Mode-based size estimation for gender distinction</li>
                </ul>

                <h2 className="section-header">Outputs</h2>
                <ul>
                    <li>Per-ROI mating durations and verified start times</li>
                    <li>Center-based durations split by gender</li>
                    <li>CSV and JSON exports for downstream statistical analysis</li>
                </ul>

                <h2 className="section-header">Demo & GitHub</h2>
                <p>
                    View the full source code on GitHub: <br />
                    <a href="https://github.com/Srujyama/Drosophila-Desire-Detector" target="_blank" rel="noopener noreferrer" className="link-highlight">
                        github.com/Srujyama/Drosophila-Desire-Detector
                    </a>
                </p>
            </section>
        </div>
    );
}
