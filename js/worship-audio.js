/**
 * Worship Audio Engine - Scroll of Seven Seals
 * Provides background gospel music and worship sounds
 */

class WorshipAudio {
    constructor() {
        this.isPlaying = false;
        this.currentTrack = null;
        this.volume = 0.3;
        this.tracks = [];
        this.currentIndex = 0;
        this.fadeInterval = null;
        
        // Initialize audio context
        this.audioContext = null;
        this.setupAudioContext();
        
        // Gospel music tracks (using free/public domain sources)
        this.gospelTracks = [
            {
                name: "Amazing Grace - Instrumental",
                url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder - will be replaced
                duration: 180,
                type: "hymn"
            },
            {
                name: "How Great Thou Art - Piano",
                url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
                duration: 240,
                type: "hymn"
            },
            {
                name: "Blessed Assurance - Orchestral",
                url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
                duration: 200,
                type: "hymn"
            }
        ];
        
        // Ambient worship sounds
        this.ambientSounds = [
            {
                name: "Church Bells",
                url: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=", // Empty audio
                loop: true,
                volume: 0.2
            },
            {
                name: "Peaceful Atmosphere",
                url: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=", // Empty audio
                loop: true,
                volume: 0.15
            }
        ];
        
        this.setupAudioElements();
    }
    
    setupAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    setupAudioElements() {
        // Create audio elements for tracks
        this.gospelTracks.forEach((track, index) => {
            const audio = new Audio();
            audio.src = track.url;
            audio.loop = false;
            audio.volume = this.volume;
            audio.preload = 'metadata';
            track.element = audio;
            
            // Add event listeners
            audio.addEventListener('ended', () => this.playNext());
            audio.addEventListener('error', (e) => {
                console.log(`Failed to load track: ${track.name}`);
                this.playNext();
            });
        });
        
        // Create ambient sound elements
        this.ambientSounds.forEach(sound => {
            const audio = new Audio();
            audio.src = sound.url;
            audio.loop = sound.loop;
            audio.volume = sound.volume;
            audio.preload = 'metadata';
            sound.element = audio;
        });
    }
    
    // Generate simple tones as placeholder music
    generateSimpleTone(frequency, duration, type = 'sine') {
        if (!this.audioContext) return null;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
        
        return oscillator;
    }
    
    // Play peaceful harmonic progression
    playHarmony() {
        if (!this.audioContext) return;
        
        const chords = [
            [261.63, 329.63, 392.00], // C major
            [349.23, 440.00, 523.25], // F major
            [392.00, 493.88, 587.33], // G major
            [261.63, 329.63, 392.00]  // C major
        ];
        
        let time = this.audioContext.currentTime;
        chords.forEach((chord, index) => {
            chord.forEach(frequency => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(frequency, time);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, time);
                gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, time + 0.1);
                gainNode.gain.linearRampToValueAtTime(0, time + 1.8);
                
                oscillator.start(time);
                oscillator.stop(time + 2);
            });
            time += 2;
        });
    }
    
    async startWorship() {
        if (this.isPlaying) return;
        
        try {
            // Resume audio context if suspended
            if (this.audioContext && this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            
            this.isPlaying = true;
            
            // Start with harmonic progression
            this.playHarmony();
            
            // Set interval to play harmony every 8 seconds
            this.harmonyInterval = setInterval(() => {
                if (this.isPlaying) {
                    this.playHarmony();
                }
            }, 8000);
            
            // Update UI
            this.updateWorshipButton();
            
            console.log('🎵 Worship music started');
            
        } catch (error) {
            console.error('Failed to start worship audio:', error);
        }
    }
    
    stopWorship() {
        this.isPlaying = false;
        
        // Stop current track
        if (this.currentTrack && this.currentTrack.element) {
            this.fadeOut(this.currentTrack.element);
        }
        
        // Stop harmony
        if (this.harmonyInterval) {
            clearInterval(this.harmonyInterval);
            this.harmonyInterval = null;
        }
        
        // Stop ambient sounds
        this.ambientSounds.forEach(sound => {
            if (sound.element) {
                this.fadeOut(sound.element);
            }
        });
        
        this.updateWorshipButton();
        console.log('🎵 Worship music stopped');
    }
    
    toggleWorship() {
        if (this.isPlaying) {
            this.stopWorship();
        } else {
            this.startWorship();
        }
    }
    
    playNext() {
        if (!this.isPlaying) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.gospelTracks.length;
        const track = this.gospelTracks[this.currentIndex];
        
        if (track.element) {
            this.currentTrack = track;
            track.element.volume = this.volume;
            track.element.play().catch(e => {
                console.log('Failed to play track:', e);
                setTimeout(() => this.playNext(), 1000);
            });
        }
    }
    
    fadeOut(audioElement) {
        if (!audioElement) return;
        
        const fadeAudio = setInterval(() => {
            if (audioElement.volume > 0.1) {
                audioElement.volume -= 0.1;
            } else {
                clearInterval(fadeAudio);
                audioElement.pause();
                audioElement.volume = this.volume;
            }
        }, 100);
    }
    
    fadeIn(audioElement) {
        if (!audioElement) return;
        
        audioElement.volume = 0;
        audioElement.play();
        
        const fadeAudio = setInterval(() => {
            if (audioElement.volume < this.volume - 0.1) {
                audioElement.volume += 0.1;
            } else {
                clearInterval(fadeAudio);
                audioElement.volume = this.volume;
            }
        }, 100);
    }
    
    setVolume(newVolume) {
        this.volume = Math.max(0, Math.min(1, newVolume));
        
        if (this.currentTrack && this.currentTrack.element) {
            this.currentTrack.element.volume = this.volume;
        }
        
        this.ambientSounds.forEach(sound => {
            if (sound.element) {
                sound.element.volume = sound.volume * this.volume;
            }
        });
    }
    
    updateWorshipButton() {
        const button = document.getElementById('worshipToggle');
        const icon = document.getElementById('worshipIcon');
        const text = document.getElementById('worshipText');
        const nowPlaying = document.getElementById('nowPlaying');
        
        if (button && icon && text) {
            if (this.isPlaying) {
                button.classList.add('bg-red-600', 'hover:bg-red-700');
                button.classList.remove('bg-gold-mystique');
                icon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
                text.textContent = 'Pause Worship';
                if (nowPlaying) nowPlaying.style.display = 'flex';
            } else {
                button.classList.remove('bg-red-600', 'hover:bg-red-700');
                button.classList.add('bg-gold-mystique');
                icon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
                text.textContent = 'Divine Worship Sounds';
                if (nowPlaying) nowPlaying.style.display = 'none';
            }
        }
    }
    
    // Play special sound effects
    playBellTone() {
        if (this.audioContext) {
            // Create a bell-like sound
            const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    this.generateSimpleTone(freq, 0.5, 'sine');
                }, index * 200);
            });
        }
    }
    
    playSuccessChord() {
        if (this.audioContext) {
            // Play a triumphant chord
            const chord = [261.63, 329.63, 392.00, 523.25]; // C major chord
            chord.forEach(frequency => {
                this.generateSimpleTone(frequency, 1.0, 'triangle');
            });
        }
    }
    
    playStartSound() {
        this.playBellTone();
        setTimeout(() => this.playSuccessChord(), 500);
    }
}

// Global instance
window.worshipAudio = new WorshipAudio();

// Global functions for HTML onclick handlers
function toggleWorship() {
    window.worshipAudio.toggleWorship();
}

function adjustWorshipVolume(volume) {
    window.worshipAudio.setVolume(volume);
    
    // Update volume display
    const volumeDisplay = document.querySelector('#volumeSlider + span');
    if (volumeDisplay) {
        volumeDisplay.textContent = Math.round(volume * 100) + '%';
    }
    
    // Update slider background
    const slider = document.getElementById('volumeSlider');
    if (slider) {
        const percentage = volume * 100;
        slider.style.background = `linear-gradient(to right, #d4af37 0%, #d4af37 ${percentage}%, #4a5568 ${percentage}%, #4a5568 100%)`;
    }
}

// Auto-start on page load if desired
document.addEventListener('DOMContentLoaded', function() {
    // Don't auto-start - let user initiate
    console.log('🎵 Worship Audio Engine loaded');
});
