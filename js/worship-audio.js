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
        
        // Live Gospel Radio Stream - Black Gospel Radio 365
        this.radioStream = {
            name: "Black Gospel Radio 365",
            url: "https://live365.com/station/Black-Gospel-Radio-365-a24152",
            streamUrl: "http://ice.live365.com/stream/a24152", // Live365 stream URL format
            description: "All GOSPEL. Only GOSPEL. All The Time!",
            type: "live_radio"
        };
        
        // Fallback gospel tracks in case radio stream fails
        this.gospelTracks = [
            {
                name: "Sacred Harmony (Generated)",
                url: "generated", // Use our harmonic progression
                duration: 0, // Continuous
                type: "generated"
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
        // Setup radio stream audio element
        this.radioElement = new Audio();
        this.radioElement.volume = this.volume;
        this.radioElement.crossOrigin = "anonymous";
        
        // Try multiple stream URLs for better compatibility
        this.streamUrls = [
            "https://ice.live365.com/stream/a24152",
            "http://ice.live365.com/stream/a24152", 
            "https://stream.live365.com/a24152"
        ];
        
        // Add event listeners for radio stream
        this.radioElement.addEventListener('error', (e) => {
            console.log('Radio stream failed, trying next URL or fallback...');
            this.tryNextStream();
        });
        
        this.radioElement.addEventListener('loadstart', () => {
            console.log('📻 Loading Black Gospel Radio 365...');
        });
        
        this.radioElement.addEventListener('canplay', () => {
            console.log('📻 Black Gospel Radio 365 ready to play');
            this.updateCurrentTrackDisplay(this.radioStream.name);
        });
        
        // Create audio elements for fallback tracks
        this.gospelTracks.forEach((track, index) => {
            if (track.type === 'generated') {
                // Skip setting up audio element for generated tracks
                return;
            }
            
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
    
    // Try different stream URLs for radio
    tryNextStream() {
        if (!this.streamUrls || this.streamUrls.length === 0) {
            console.log('📻 All radio stream URLs failed, falling back to generated harmony');
            this.playGeneratedHarmony();
            return;
        }
        
        const nextUrl = this.streamUrls.shift();
        console.log(`📻 Trying stream URL: ${nextUrl}`);
        
        this.radioElement.src = nextUrl;
        this.radioElement.load();
        
        // Try to play after loading
        setTimeout(() => {
            this.radioElement.play().catch(e => {
                console.log(`Failed to play stream ${nextUrl}:`, e.message);
                this.tryNextStream();
            });
        }, 1000);
    }
    
    // Play generated harmony as fallback
    playGeneratedHarmony() {
        this.currentTrack = { name: "Sacred Harmony (Generated)", element: null };
        this.updateCurrentTrackDisplay("Sacred Harmony (Generated)");
        
        // Start continuous harmony generation
        this.harmonyInterval = setInterval(() => {
            if (this.isPlaying) {
                this.playHarmony();
            }
        }, 8000);
        
        // Play initial harmony
        this.playHarmony();
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
            
            console.log('📻 Starting Black Gospel Radio 365...');
            
            // First try to play the radio stream
            this.radioElement.src = this.streamUrls[0];
            this.radioElement.load();
            
            const playPromise = this.radioElement.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('📻 Black Gospel Radio 365 playing successfully!');
                    this.currentTrack = { 
                        name: this.radioStream.name, 
                        element: this.radioElement,
                        type: 'live_radio'
                    };
                    this.updateCurrentTrackDisplay(this.radioStream.name + " - Live Stream");
                }).catch(e => {
                    console.log('📻 Radio stream failed, trying alternatives...');
                    this.tryNextStream();
                });
            }
            
            // Update UI
            this.updateWorshipButton();
            
            console.log('🎵 Gospel worship music started');
            
        } catch (error) {
            console.error('Failed to start worship audio:', error);
            // Fallback to generated harmony
            this.playGeneratedHarmony();
        }
    }
    
    stopWorship() {
        this.isPlaying = false;
        
        // Stop radio stream
        if (this.radioElement) {
            this.radioElement.pause();
            this.radioElement.src = '';
        }
        
        // Stop current track
        if (this.currentTrack && this.currentTrack.element && this.currentTrack.type !== 'live_radio') {
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
        
        // Reset stream URLs for next time
        this.streamUrls = [
            "https://ice.live365.com/stream/a24152",
            "http://ice.live365.com/stream/a24152", 
            "https://stream.live365.com/a24152"
        ];
        
        // Clear current track
        this.currentTrack = null;
        
        this.updateWorshipButton();
        this.updateCurrentTrackDisplay('');
        console.log('🎵 Gospel worship music stopped');
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
        
        // Random track selection for variety
        this.currentIndex = Math.floor(Math.random() * this.gospelTracks.length);
        const track = this.gospelTracks[this.currentIndex];
        
        if (track.element) {
            this.currentTrack = track;
            track.element.volume = this.volume;
            
            // Update now playing display
            this.updateCurrentTrackDisplay(track.name);
            
            track.element.play().catch(e => {
                console.log('Failed to play track:', e);
                // Fall back to harmony if track fails
                this.playHarmony();
                setTimeout(() => this.playNext(), 5000);
            });
        } else {
            // If no tracks available, continue with harmony
            this.playHarmony();
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
        
        // Update radio stream volume
        if (this.radioElement) {
            this.radioElement.volume = this.volume;
        }
        
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
                text.textContent = 'Black Gospel Radio 365';
                if (nowPlaying) nowPlaying.style.display = 'none';
            }
        }
    }
    
    updateCurrentTrackDisplay(trackName) {
        const currentTrackElement = document.getElementById('currentTrack');
        if (currentTrackElement) {
            currentTrackElement.textContent = trackName || 'Peaceful Worship';
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
