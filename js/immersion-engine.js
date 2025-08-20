// Immersive Experience Engine
// Visual effects, animations, and engagement enhancements

class ImmersionEngine {
    constructor() {
        this.isEnabled = true;
        this.animationQueue = [];
        this.particleSystem = null;
        this.soundEnabled = this.loadSoundPreference();
        this.themes = this.initializeThemes();
        this.effectsLibrary = this.initializeEffects();
        
        this.initializeParticleSystem();
        this.initializeAnimationFramework();
    }

    initializeThemes() {
        return {
            divine: {
                colors: ['#FFD700', '#FFF8DC', '#F0E68C', '#FFFFE0'],
                particles: 'golden',
                intensity: 'high'
            },
            mystical: {
                colors: ['#9370DB', '#8A2BE2', '#9932CC', '#BA55D3'],
                particles: 'ethereal',
                intensity: 'medium'
            },
            ancient: {
                colors: ['#D4AF37', '#B8860B', '#DAA520', '#CD853F'],
                particles: 'ancient',
                intensity: 'low'
            },
            wisdom: {
                colors: ['#4169E1', '#6495ED', '#87CEEB', '#B0E0E6'],
                particles: 'flowing',
                intensity: 'medium'
            }
        };
    }

    initializeEffects() {
        return {
            sealActivation: {
                duration: 2000,
                keyframes: [
                    { transform: 'scale(1) rotate(0deg)', opacity: 1, boxShadow: '0 0 0 rgba(212, 175, 55, 0)' },
                    { transform: 'scale(1.1) rotate(5deg)', opacity: 0.9, boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)' },
                    { transform: 'scale(1.2) rotate(0deg)', opacity: 0.8, boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
                    { transform: 'scale(1) rotate(0deg)', opacity: 1, boxShadow: '0 0 60px rgba(212, 175, 55, 1)' }
                ]
            },
            successCelebration: {
                duration: 3000,
                effects: ['confetti', 'glow', 'pulse', 'ascend']
            },
            mysticalReveal: {
                duration: 1500,
                effects: ['fadeIn', 'typewriter', 'shimmer']
            },
            numberDisplay: {
                duration: 1000,
                effects: ['emergeFromCenter', 'glow', 'solidify']
            }
        };
    }

    // Particle system for visual effects
    initializeParticleSystem() {
        this.particleSystem = {
            canvas: null,
            ctx: null,
            particles: [],
            animationId: null,
            
            init: () => {
                // Create invisible canvas for particle effects
                this.particleSystem.canvas = document.createElement('canvas');
                this.particleSystem.canvas.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 9999;
                `;
                this.particleSystem.ctx = this.particleSystem.canvas.getContext('2d');
                document.body.appendChild(this.particleSystem.canvas);
                this.resizeCanvas();
                
                window.addEventListener('resize', () => this.resizeCanvas());
            },
            
            createParticle: (x, y, type = 'golden') => {
                const particle = {
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    life: 1.0,
                    decay: Math.random() * 0.02 + 0.01,
                    size: Math.random() * 6 + 2,
                    color: this.getParticleColor(type),
                    type: type
                };
                this.particleSystem.particles.push(particle);
            },
            
            update: () => {
                this.particleSystem.particles = this.particleSystem.particles.filter(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.life -= particle.decay;
                    particle.vy -= 0.1; // Gravity effect
                    return particle.life > 0;
                });
            },
            
            render: () => {
                const ctx = this.particleSystem.ctx;
                ctx.clearRect(0, 0, this.particleSystem.canvas.width, this.particleSystem.canvas.height);
                
                this.particleSystem.particles.forEach(particle => {
                    ctx.save();
                    ctx.globalAlpha = particle.life;
                    ctx.fillStyle = particle.color;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                });
            }
        };
        
        this.particleSystem.init();
    }

    resizeCanvas() {
        if (this.particleSystem.canvas) {
            this.particleSystem.canvas.width = window.innerWidth;
            this.particleSystem.canvas.height = window.innerHeight;
        }
    }

    getParticleColor(type) {
        const colors = {
            golden: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'],
            ethereal: ['#9370DB', '#8A2BE2', '#BA55D3', '#DDA0DD'],
            ancient: ['#D4AF37', '#B8860B', '#CD853F', '#DEB887'],
            flowing: ['#4169E1', '#6495ED', '#87CEEB', '#ADD8E6']
        };
        
        const colorArray = colors[type] || colors.golden;
        return colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    // Animation framework
    initializeAnimationFramework() {
        let lastTime = 0;
        const animate = (currentTime) => {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;
            
            this.particleSystem.update();
            this.particleSystem.render();
            
            // Process animation queue
            this.processAnimationQueue(deltaTime);
            
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }

    processAnimationQueue(deltaTime) {
        this.animationQueue = this.animationQueue.filter(animation => {
            animation.elapsed += deltaTime;
            const progress = Math.min(animation.elapsed / animation.duration, 1);
            
            if (animation.update) {
                animation.update(progress);
            }
            
            if (progress >= 1 && animation.complete) {
                animation.complete();
            }
            
            return progress < 1;
        });
    }

    // Main effect triggers
    triggerSealActivation(sealElement, sealNumber) {
        if (!this.isEnabled) return;
        
        // Visual glow effect
        this.addGlowEffect(sealElement);
        
        // Particle burst
        const rect = sealElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        this.createParticleBurst(centerX, centerY, 'golden', 20);
        
        // Number enhancement
        this.enhanceSealNumber(sealElement, sealNumber);
        
        // Sound effect (if enabled)
        this.playSound('sealActivation');
        
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
    }

    addGlowEffect(element) {
        element.style.transition = 'all 0.5s ease';
        element.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.8), inset 0 0 15px rgba(255, 215, 0, 0.3)';
        element.style.borderColor = '#FFD700';
        
        setTimeout(() => {
            element.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.4)';
        }, 1000);
    }

    enhanceSealNumber(sealElement, sealNumber) {
        const numberElement = sealElement.querySelector('.seal-number');
        if (numberElement) {
            // Create floating number effect
            const floatingNumber = document.createElement('div');
            floatingNumber.textContent = sealNumber;
            floatingNumber.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(3);
                font-size: 2em;
                font-weight: bold;
                color: #FFD700;
                text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
                opacity: 0;
                pointer-events: none;
                z-index: 1000;
                transition: all 1s ease;
            `;
            
            sealElement.style.position = 'relative';
            sealElement.appendChild(floatingNumber);
            
            // Animate
            setTimeout(() => {
                floatingNumber.style.opacity = '1';
                floatingNumber.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 100);
            
            setTimeout(() => {
                floatingNumber.style.opacity = '0';
                floatingNumber.style.transform = 'translate(-50%, -70%) scale(0.5)';
                setTimeout(() => {
                    if (floatingNumber.parentNode) {
                        floatingNumber.parentNode.removeChild(floatingNumber);
                    }
                }, 500);
            }, 1500);
        }
    }

    createParticleBurst(x, y, type = 'golden', count = 15) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.particleSystem.createParticle(x, y, type);
            }, i * 50);
        }
    }

    // Success celebration effects
    triggerSuccessCelebration(sealNumber, complexity = 'medium') {
        if (!this.isEnabled) return;
        
        // Screen-wide particle celebration
        this.createScreenCelebration();
        
        // Text animation
        this.animateSuccessText(sealNumber);
        
        // Color theme change
        this.temporaryThemeChange('divine', 3000);
        
        // Sound celebration
        this.playSound('success');
        
        return new Promise(resolve => {
            setTimeout(resolve, 3000);
        });
    }

    createScreenCelebration() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Create multiple burst points
        const burstPoints = [
            { x: width * 0.2, y: height * 0.3 },
            { x: width * 0.8, y: height * 0.3 },
            { x: width * 0.5, y: height * 0.6 },
            { x: width * 0.1, y: height * 0.7 },
            { x: width * 0.9, y: height * 0.7 }
        ];
        
        burstPoints.forEach((point, index) => {
            setTimeout(() => {
                this.createParticleBurst(point.x, point.y, 'golden', 25);
            }, index * 200);
        });
    }

    animateSuccessText(sealNumber) {
        // Create floating success message
        const message = document.createElement('div');
        message.innerHTML = window.BibleGameAI?.generateSuccessMessage(sealNumber, 'medium') || '🎉 Seal Unlocked!';
        message.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(255, 215, 0, 0.95));
            color: #2c1810;
            padding: 20px 30px;
            border-radius: 15px;
            font-size: 1.2em;
            font-weight: bold;
            text-align: center;
            z-index: 10001;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 2px solid #FFD700;
            opacity: 0;
            transform: translateX(-50%) translateY(-20px) scale(0.8);
            transition: all 0.5s ease;
            max-width: 400px;
            white-space: pre-line;
        `;
        
        document.body.appendChild(message);
        
        // Animate in
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        }, 100);
        
        // Animate out
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateX(-50%) translateY(-20px) scale(0.8)';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 500);
        }, 4000);
    }

    temporaryThemeChange(themeName, duration) {
        const theme = this.themes[themeName];
        if (!theme) return;
        
        // Apply theme to body
        const originalFilter = document.body.style.filter;
        document.body.style.filter = `hue-rotate(${Math.random() * 60 - 30}deg) brightness(1.1) saturate(1.2)`;
        
        setTimeout(() => {
            document.body.style.filter = originalFilter;
        }, duration);
    }

    // Modal enhancement effects
    enhanceModalAppearance(modal, sealType) {
        if (!this.isEnabled) return;
        
        // Add mystical entrance effect
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8) rotateY(10deg)';
        modal.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1) rotateY(0deg)';
        }, 50);
        
        // Add floating particles around modal
        const rect = modal.getBoundingClientRect();
        this.createModalParticles(rect);
        
        // Add pulsing border effect
        this.addPulsingBorder(modal);
    }

    createModalParticles(rect) {
        const particleCount = 8;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radius = Math.max(rect.width, rect.height) / 2 + 50;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            setTimeout(() => {
                this.particleSystem.createParticle(x, y, 'ethereal');
            }, i * 100);
        }
    }

    addPulsingBorder(element) {
        const pulsingAnimation = {
            duration: 2000,
            elapsed: 0,
            update: (progress) => {
                const intensity = Math.sin(progress * Math.PI * 4) * 0.5 + 0.5;
                const shadowBlur = 10 + intensity * 20;
                const shadowColor = `rgba(212, 175, 55, ${0.3 + intensity * 0.4})`;
                element.style.boxShadow = `0 0 ${shadowBlur}px ${shadowColor}`;
            },
            complete: () => {
                element.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.5)';
            }
        };
        
        this.animationQueue.push(pulsingAnimation);
    }

    // Drag and drop enhancement
    enhanceDragAndDrop() {
        // Add visual feedback for drag operations
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('drag-item')) {
                e.target.style.transform = 'rotate(5deg) scale(1.05)';
                e.target.style.opacity = '0.8';
                e.target.style.zIndex = '1000';
                
                // Create trail effect
                this.createDragTrail(e.target);
            }
        });
        
        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('drag-item')) {
                e.target.style.transform = '';
                e.target.style.opacity = '';
                e.target.style.zIndex = '';
            }
        });
        
        document.addEventListener('dragover', (e) => {
            if (e.target.classList.contains('drop-zone')) {
                e.target.style.background = 'rgba(212, 175, 55, 0.2)';
                e.target.style.borderColor = '#FFD700';
                e.target.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.5)';
            }
        });
        
        document.addEventListener('dragleave', (e) => {
            if (e.target.classList.contains('drop-zone')) {
                e.target.style.background = '';
                e.target.style.borderColor = '';
                e.target.style.boxShadow = '';
            }
        });
    }

    createDragTrail(element) {
        // Implementation for drag trail effect
        const trail = [];
        const maxTrailLength = 5;
        
        const updateTrail = (e) => {
            trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            if (trail.length > maxTrailLength) {
                trail.shift();
            }
            
            // Render trail particles
            trail.forEach((point, index) => {
                const age = Date.now() - point.time;
                if (age < 1000) {
                    setTimeout(() => {
                        this.particleSystem.createParticle(point.x, point.y, 'flowing');
                    }, index * 50);
                }
            });
        };
        
        document.addEventListener('dragover', updateTrail);
        
        // Cleanup
        setTimeout(() => {
            document.removeEventListener('dragover', updateTrail);
        }, 5000);
    }

    // Sound system (optional)
    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Create simple audio feedback using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            const frequencies = {
                sealActivation: [440, 554, 659], // A major chord
                success: [523, 659, 784, 1047], // C major arpeggio
                error: [220, 185] // Lower frequencies for errors
            };
            
            const freq = frequencies[type] || frequencies.sealActivation;
            
            freq.forEach((frequency, index) => {
                setTimeout(() => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    
                    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
                    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                    
                    osc.start(audioContext.currentTime);
                    osc.stop(audioContext.currentTime + 0.5);
                }, index * 100);
            });
        } catch (error) {
            // Silently fail if audio is not supported
        }
    }

    // Sound preference management
    loadSoundPreference() {
        try {
            const saved = localStorage.getItem('gameSound');
            return saved ? JSON.parse(saved) : true; // Default enabled
        } catch (error) {
            return true;
        }
    }

    saveSoundPreference() {
        try {
            localStorage.setItem('gameSound', JSON.stringify(this.soundEnabled));
        } catch (error) {
            // Silently fail
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.saveSoundPreference();
        return this.soundEnabled;
    }

    // Progress enhancement
    enhanceProgressBar(progressElement, percentage) {
        if (!this.isEnabled) return;
        
        // Add glow effect based on progress
        const glowIntensity = percentage / 100;
        progressElement.style.boxShadow = `0 0 ${10 + glowIntensity * 20}px rgba(212, 175, 55, ${0.3 + glowIntensity * 0.4})`;
        
        // Add particles at progress bar end
        if (percentage > 0) {
            const rect = progressElement.getBoundingClientRect();
            const x = rect.left + (rect.width * percentage / 100);
            const y = rect.top + rect.height / 2;
            
            this.particleSystem.createParticle(x, y, 'golden');
        }
    }

    // Public API methods
    enable() {
        this.isEnabled = true;
        console.log('🎨 Immersion effects enabled');
    }

    disable() {
        this.isEnabled = false;
        console.log('🎨 Immersion effects disabled');
    }

    enableSound() {
        this.soundEnabled = true;
        console.log('🔊 Sound effects enabled');
    }

    disableSound() {
        this.soundEnabled = false;
        console.log('🔇 Sound effects disabled');
    }

    // Initialize the immersion engine
    static initialize() {
        if (!window.ImmersionEngine) {
            window.ImmersionEngine = new ImmersionEngine();
            console.log('🎭 Immersion Engine initialized successfully!');
        }
        return window.ImmersionEngine;
    }
}

// Export and initialize
window.ImmersionEngine = ImmersionEngine;
ImmersionEngine.initialize();
