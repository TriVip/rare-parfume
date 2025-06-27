import React, { useEffect, useState } from 'react';
import { Sparkles, Star, Heart, Zap } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

const HeroEffects: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
    transition: 'transform 0.1s ease-out',
  };

  const reverseParallaxStyle = {
    transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <>
      {/* Interactive Background Elements */}
      <div id="hero-background-elements" className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dynamic gradient orbs that follow mouse */}
        <div 
          id="hero-gradient-orb-1"
          className="absolute w-96 h-96 bg-gradient-to-r from-primary-400/20 to-purple-400/20 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x * 0.8}%`,
            top: `${mousePosition.y * 0.8}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out',
          }}
        />
        <div 
          id="hero-gradient-orb-2"
          className="absolute w-64 h-64 bg-gradient-to-r from-gold-400/15 to-orange-400/15 rounded-full blur-2xl"
          style={{
            left: `${100 - mousePosition.x * 0.6}%`,
            top: `${100 - mousePosition.y * 0.6}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.4s ease-out',
          }}
        />
      </div>

      {/* Parallax Floating Icons */}
      <div id="hero-parallax-icons" className="absolute inset-0 pointer-events-none">
        <div 
          id="hero-sparkles-icon"
          className="absolute top-1/4 left-1/4 opacity-30"
          style={parallaxStyle}
        >
          <Sparkles 
            className="text-primary-400 animate-pulse" 
            size={20}
            style={{ animationDelay: '0s' }}
          />
        </div>
        <div 
          id="hero-star-icon"
          className="absolute top-1/3 right-1/3 opacity-25"
          style={reverseParallaxStyle}
        >
          <Star 
            className="text-gold-400 animate-pulse" 
            size={16}
            style={{ animationDelay: '1s' }}
          />
        </div>
        <div 
          id="hero-heart-icon"
          className="absolute bottom-1/3 left-1/3 opacity-40"
          style={parallaxStyle}
        >
          <Heart 
            className="text-pink-400 animate-pulse" 
            size={18}
            style={{ animationDelay: '2s' }}
          />
        </div>
        <div 
          id="hero-zap-icon"
          className="absolute top-2/3 right-1/4 opacity-35"
          style={reverseParallaxStyle}
        >
          <Zap 
            className="text-purple-400 animate-pulse" 
            size={14}
            style={{ animationDelay: '3s' }}
          />
        </div>
      </div>

      {/* Animated Lines */}
      <div id="hero-animated-lines" className="absolute inset-0 pointer-events-none">
        <div 
          id="hero-line-1"
          className="absolute top-0 left-0 w-full h-full"
          style={parallaxStyle}
        >
          <svg id="hero-svg-1" className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              id="hero-path-1"
              d="M0,20 Q50,60 100,30" 
              stroke="url(#lineGradient1)" 
              strokeWidth="0.5" 
              fill="none"
              className="animate-pulse"
            />
          </svg>
        </div>
        <div 
          id="hero-line-2"
          className="absolute top-0 left-0 w-full h-full"
          style={reverseParallaxStyle}
        >
          <svg id="hero-svg-2" className="w-full h-full opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#eab308" stopOpacity="0" />
                <stop offset="50%" stopColor="#eab308" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              id="hero-path-2"
              d="M100,70 Q50,30 0,80" 
              stroke="url(#lineGradient2)" 
              strokeWidth="0.5" 
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </svg>
        </div>
      </div>

      {/* Interactive Hover Zone */}
      <div 
        id="hero-hover-zone"
        className="absolute inset-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <div id="hero-hover-effects" className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                id={`hero-hover-particle-${i}`}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-gold-400 rounded-full animate-ping opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Particles with Different Speeds */}
      <div id="hero-floating-particles" className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            id={`hero-particle-${i}`}
            className={`absolute w-1 h-1 bg-gradient-to-r ${
              i % 4 === 0 ? 'from-primary-400 to-purple-400' :
              i % 4 === 1 ? 'from-gold-400 to-orange-400' :
              i % 4 === 2 ? 'from-pink-400 to-rose-400' :
              'from-blue-400 to-indigo-400'
            } rounded-full opacity-40 particle`}
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${20 + (i * 5)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + (i % 4) * 2}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default HeroEffects; 