// Contact.jsx
import React, { useRef, useEffect } from 'react'
import Header from './Header'
import './Contact.css'
import './Resume.css'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

export default function Contact() {
    const formRef = useRef(null)
    const visualCanvasRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        emailjs.sendForm(
            'service_o9hbnhr',
            'template_klwich',
            formRef.current,
            'WJj5STkWZ0l_D2Bvg'

        ).then((result) => {
            alert("Message sent successfully!")
            formRef.current.reset()
        }).catch((error) => {
            alert("Failed to send message. Try again.")
            console.error(error.text)
        })
    }

    useEffect(() => {
        const canvas = visualCanvasRef.current
        const ctx = canvas.getContext('2d')

        const dpr = window.devicePixelRatio || 1
        canvas.width = canvas.clientWidth * dpr
        canvas.height = canvas.clientHeight * dpr
        ctx.scale(dpr, dpr)


        const nodes = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 3 + Math.random() * 2,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        }))

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x
                    const dy = nodes[i].y - nodes[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 100) {
                        ctx.strokeStyle = `rgba(173,216,230,${1 - dist / 100})`
                        ctx.beginPath()
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.lineTo(nodes[j].x, nodes[j].y)
                        ctx.stroke()
                    }
                }
            }

            for (const n of nodes) {
                ctx.beginPath()
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
                ctx.fillStyle = '#6abfff'
                ctx.shadowColor = '#6abfff'
                ctx.shadowBlur = 10
                ctx.fill()
                ctx.shadowBlur = 0
            }

            for (const n of nodes) {
                n.x += n.dx
                n.y += n.dy
                if (n.x < 0 || n.x > canvas.width) n.dx *= -1
                if (n.y < 0 || n.y > canvas.height) n.dy *= -1
            }

            requestAnimationFrame(draw)
        }

        draw()
    }, [])

    return (
        <div className="resume-container">
            <Header />

            <motion.h1
                className="resume-title about-main-title"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Contact Me
            </motion.h1>

            <div className="contact-page">
                <motion.div
                    className="contact-form-container side-by-side"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="form-content">
                        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                            <label>Your Name</label>
                            <input type="text" name="name" placeholder="What is your name?" required />

                            <label>Your Email</label>
                            <input type="email" name="email" placeholder="What is your email address?" required />

                            <label>Your Message</label>
                            <textarea name="message" rows="6" placeholder="What do you want to say?" required></textarea>

                            <button type="submit">Send</button>
                        </form>
                    </div>
                    <div className="canvas-content">
                        <canvas ref={visualCanvasRef} className="bioquant-canvas" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
