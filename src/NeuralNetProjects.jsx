import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function NeuralNetProjects() {
    const canvasRef = useRef()
    const seed = 40
    const navigate = useNavigate()

    useEffect(() => {
        let p5Instance
        const sketch = (s) => {
            const localNavigate = navigate;

        const projects = [
            { title: 'FlyFlirt', url: '/flyflirt', description: 'OpenCV + behavioral genetics.' },
            { title: 'CarpetCleanChangePoints', url: '/carpetcleanchangepoints', description: 'Recombination detection at scale.' },
            { title: 'FlyVialTracker', url: '/flyvialtracker', description: 'Trackes the status of your Fly Vials.' },
            { title: 'StockQuant', url: '/stockquant', description: 'Using math to choose stocks.' }
        ]


            const neurons = []
            const connections = []
            const layers = [7, 9, 7]
            const layerSpacing = (window.innerWidth - 300) / (layers.length - 1)
            const nodeSpacing = 100
            const radius = 18

            let t = 0

            const seededRandom = (() => {
                let x = Math.sin(seed) * 10000
                return () => {
                    x = Math.sin(x) * 10000
                    return x - Math.floor(x)
                }
            })()

            const projectIndices = new Set()
            while (projectIndices.size < projects.length) {
                const randLayer = Math.floor(seededRandom() * layers.length)
                const randNode = Math.floor(seededRandom() * layers[randLayer])
                projectIndices.add(`${randLayer}-${randNode}`)
            }

            s.setup = () => {
                s.createCanvas(s.windowWidth, s.windowHeight).parent(canvasRef.current)
                s.noStroke()
                s.textFont('Courier New')

                let x = 150
                layers.forEach((count, i) => {
                    const layer = []
                    const offset = (s.height - count * nodeSpacing) / 2 + nodeSpacing / 2
                    for (let j = 0; j < count; j++) {
                        const y = offset + j * nodeSpacing
                        const key = `${i}-${j}`
                        const projIndex = Array.from(projectIndices).indexOf(key)
                        const linkedProject = projIndex !== -1 ? projects[projIndex] : null
                        layer.push({ x, y, r: radius, active: false, linkedProject })
                    }
                    neurons.push(layer)
                    x += layerSpacing
                })

                for (let l = 0; l < neurons.length - 1; l++) {
                    for (let from of neurons[l]) {
                        for (let to of neurons[l + 1]) {
                            const connectLeftToRight = seededRandom() > 0.5
                            if (connectLeftToRight) {
                                connections.push({ from, to, progress: 0 })
                            } else {
                                connections.push({ from: to, to: from, progress: 0 })
                            }
                        }
                    }
                }

            }

            const getRainbowColor = (offset) => {
                const r = Math.floor(127 * Math.sin(0.03 * t + offset) + 128)
                const g = Math.floor(127 * Math.sin(0.03 * t + offset + 2) + 128)
                const b = Math.floor(127 * Math.sin(0.03 * t + offset + 4) + 128)
                return [r, g, b, 100]
            }

            s.draw = () => {
                s.clear()
                s.strokeWeight(1.5)
                let hovering = false
                t += 1

                // Animate connections line-by-line
                for (let conn of connections) {
                    if (conn.progress < 1) {
                        conn.progress += 0.02
                    }
                    const x = s.lerp(conn.from.x, conn.to.x, conn.progress)
                    const y = s.lerp(conn.from.y, conn.to.y, conn.progress)
                    const [r, g, b, a] = getRainbowColor((conn.from.y + conn.to.y + t) / 60)
                    s.stroke(r, g, b, a)
                    s.line(conn.from.x, conn.from.y, x, y)
                }

                // Draw all neurons
                for (let layer of neurons) {
                    for (let node of layer) {
                        if (node.linkedProject) {
                            const [r, g, b, a] = getRainbowColor((node.y + t) / 30)
                            s.fill(r, g, b, a)
                            s.stroke(r, g, b, a + 50)
                            s.strokeWeight(2)
                            s.ellipse(node.x, node.y, node.r * 2.5)
                        } else {
                            s.noStroke()
                            s.fill(255, 80)
                            s.ellipse(node.x, node.y, node.r * 2)
                        }
                    }
                }

                // Tooltip
                for (let layer of neurons) {
                    for (let node of layer) {
                        const d = s.dist(s.mouseX, s.mouseY, node.x, node.y)
                        node.active = d < radius + 8
                        if (node.active) hovering = true

                        if (node.active && node.linkedProject) {
                            const boxWidth = 300
                            const boxHeight = 80
                            const padding = 14
                            let tooltipX = node.x + 25
                            let tooltipY = node.y - boxHeight / 2

                            // Keep tooltip within canvas
                            if (tooltipX + boxWidth > s.width) tooltipX = node.x - boxWidth - 25
                            if (tooltipX < 0) tooltipX = 5
                            if (tooltipY < 0) tooltipY = 5
                            if (tooltipY + boxHeight > s.height) tooltipY = s.height - boxHeight - 5

                            const [r, g, b, a] = getRainbowColor((node.y + t) / 30)

                            s.fill(20, 20, 20, 220)
                            s.stroke(r, g, b, 180)
                            s.strokeWeight(1.5)
                            s.rect(tooltipX, tooltipY, boxWidth, boxHeight, 12)

                            s.noFill()
                            for (let i = 1; i <= 4; i++) {
                                s.stroke(r, g, b, 40 / i)
                                s.strokeWeight(i)
                                s.rect(tooltipX - i, tooltipY - i, boxWidth + i * 2, boxHeight + i * 2, 12)
                            }


                            // Tooltip text
                            s.noStroke()
                            s.fill(255)
                            s.textSize(15)
                            s.textAlign(s.LEFT, s.TOP)
                            s.text(node.linkedProject.title, tooltipX + padding, tooltipY + padding)

                            s.textSize(12)
                            s.fill(200)
                            s.text(node.linkedProject.description, tooltipX + padding, tooltipY + padding + 24)
                        }

                    }
                }

                s.cursor(hovering ? 'pointer' : 'default')
            }

            s.mousePressed = () => {
                for (let layer of neurons) {
                    for (let node of layer) {
                        if (node.active && node.linkedProject) {
                            localNavigate(node.linkedProject.url)
                        }
                    }
                }
            }

            s.windowResized = () => {
                s.resizeCanvas(s.windowWidth, s.windowHeight)
            }
        }

        p5Instance = new window.p5(sketch)

        return () => {
            if (p5Instance) p5Instance.remove()
        }
    }, [])

    return (
        <div
            ref={canvasRef}
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}
        />
    )
}