import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

class Particle {
    constructor(x, y, color, canvasWidth, canvasHeight) {
        this.originX = x;
        this.originY = y;
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = 4; // Increased dot size for better visibility
        
        // Random starting position for scatter
        this.scatterX = Math.random() * canvasWidth;
        this.scatterY = Math.random() * canvasHeight;
        
        // Start scattered
        this.x = this.scatterX;
        this.y = this.scatterY;
        
        this.ease = 0.05 + Math.random() * 0.05;
        this.isScattered = true;
    }

    update() {
        let targetX = this.isScattered ? this.scatterX : this.originX;
        let targetY = this.isScattered ? this.scatterY : this.originY;

        this.x += (targetX - this.x) * this.ease;
        this.y += (targetY - this.y) * this.ease;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

export default function ParticleTransition({ onComplete }) {
    const canvasRef = useRef(null);
    const [particlesArray, setParticlesArray] = useState([]);
    const [isReassembling, setIsReassembling] = useState(false);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        // Match window size
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const image = new Image();
        
        let isDone = false;
        const safeComplete = () => {
            if (!isDone) {
                isDone = true;
                onComplete();
            }
        };

        const fallbackTimer = setTimeout(() => {
            console.warn("ParticleTransition image load timed out. Skipping.");
            safeComplete();
        }, 1500);

        image.onerror = () => {
            console.error("Failed to load image for ParticleTransition. Skipping transition.");
            safeComplete();
        };

        image.onload = () => {
            clearTimeout(fallbackTimer);
            try {
                // Draw image in center to read pixels
                const imgWidth = Math.min(1200, width * 0.9); // Make the logo much bigger
                const imgHeight = (image.height / image.width) * imgWidth;
                const offsetX = (width - imgWidth) / 2;
                const offsetY = (height - imgHeight) / 2;
                
                ctx.drawImage(image, offsetX, offsetY, imgWidth, imgHeight);
                const pixels = ctx.getImageData(0, 0, width, height).data;
                ctx.clearRect(0, 0, width, height);

                const pArray = [];
                
                // Loop through pixels, step by 8 for better performance with large images
                for (let y = 0; y < height; y += 8) {
                    for (let x = 0; x < width; x += 8) {
                        const index = (y * width + x) * 4;
                        const alpha = pixels[index + 3];
                        
                        if (alpha > 50) { // If pixel is visible
                            const red = pixels[index];
                            const green = pixels[index + 1];
                            const blue = pixels[index + 2];
                            const color = `rgba(${red},${green},${blue}, ${alpha/255})`;
                            pArray.push(new Particle(x, y, color, width, height));
                        }
                    }
                }
                particlesRef.current = pArray;
                setParticlesArray(pArray);
                
                // Start scattered, wait a moment, then reassemble
                setTimeout(() => {
                    particlesRef.current.forEach(p => p.isScattered = false);
                    setIsReassembling(true);
                }, 500);

                // Wait for reassembly (approx 2s), then finish
                setTimeout(() => {
                    safeComplete();
                }, 3000);
            } catch (err) {
                console.error("Error during ParticleTransition processing:", err);
                safeComplete();
            }
        };
        
        image.src = '/particle_logo_clean.png'; // Use the version with true transparency

        let animationFrameId;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particlesRef.current.length; i++) {
                particlesRef.current[i].update();
                particlesRef.current[i].draw(ctx);
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: '#020205',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </motion.div>
    );
}
