
import React, { useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { Star, Clock } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
}

interface Card3DProps {
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  stats?: Stat[];
  badge?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  title,
  subtitle,
  content,
  image,
  className = '',
  gradientFrom = 'from-blue-900',
  gradientTo = 'to-cyan-800',
  stats,
  badge,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useMousePosition();
  const [rotationMode, setRotationMode] = useState<'limited' | 'full'>('limited');
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    setRotationMode(prev => prev === 'limited' ? 'full' : 'limited');
  };

  const calculateRotation = () => {
    if (!cardRef.current || !isHovered) return { x: 0, y: 0, z: 0 };
    
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    // Calculate rotation based on mouse position relative to card center
    if (rotationMode === 'limited') {
      const rotateY = ((mousePosition.x - cardCenterX) / (cardRect.width / 2)) * 15;
      const rotateX = -((mousePosition.y - cardCenterY) / (cardRect.height / 2)) * 15;
      return { x: rotateX, y: rotateY, z: 0 };
    } else {
      // Full 360 rotation mode
      const dx = mousePosition.x - cardCenterX;
      const dy = mousePosition.y - cardCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate angle in degrees
      const angleY = (dx / cardRect.width) * 180;
      const angleX = -(dy / cardRect.height) * 180;
      const angleZ = (distance / Math.max(cardRect.width, cardRect.height)) * 45;
      
      return { x: angleX, y: angleY, z: angleZ };
    }
  };

  const rotation = calculateRotation();

  return (
    <div
      ref={cardRef}
      className={`relative perspective-1000 cursor-pointer ${className}`}
      style={{ perspective: '1500px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* Smoke effect overlay - appears on hover */}
      <div 
        className={`absolute inset-0 w-full h-full pointer-events-none z-10 opacity-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : ''}`}
        style={{
          transform: 'translateZ(30px)',
        }}
      >
        <div className="smoke-container absolute inset-0 overflow-hidden rounded-xl">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="smoke-particle absolute"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                backgroundColor: 'transparent',
                boxShadow: '0 0 40px 20px rgba(131, 242, 255, 0.15)',
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: isHovered ? 0.8 : 0,
                filter: 'blur(8px)',
                animation: `smoke ${Math.random() * 4 + 3}s linear infinite`,
                transform: `scale(${isHovered ? 1 : 0})`,
                transition: 'all 0.8s ease-out',
              }}
            />
          ))}
        </div>
      </div>

      <div
        className={`relative flex flex-col rounded-xl overflow-hidden h-full ${isHovered ? 'z-10' : ''}`}
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg) scale3d(1.05, 1.05, 1.05)`
            : 'rotateX(0) rotateY(0) scale3d(1, 1, 1)',
          transition: isHovered
            ? 'transform 0.15s ease-out'
            : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card background with gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-90`}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-10px)',
            transition: 'all 0.3s ease-out',
            opacity: isHovered ? '1' : '0.9',
          }}
        />
        
        {/* Glass overlay */}
        <div
          className="absolute inset-0 backdrop-blur-md bg-black/30 border border-white/10 rounded-xl shadow-2xl"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
          }}
        />

        {/* Particles effect (small dots in background) */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: isHovered ? 0.7 : 0.3,
                transition: 'opacity 0.5s ease-out',
              }}
            />
          ))}
        </div>

        {/* Badge - if provided */}
        {badge && (
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1 border border-white/20"
            style={{
              transformStyle: 'preserve-3d',
              transform: isHovered ? 'translateZ(80px)' : 'translateZ(30px)',
              transition: 'all 0.3s ease-out',
            }}
          >
            <Star className="w-3 h-3" />
            <span>{badge}</span>
          </div>
        )}

        {/* Content container */}
        <div
          className="relative p-6 flex flex-col h-full z-10"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered ? 'translateZ(50px)' : 'translateZ(20px)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {/* Image with improved animation */}
          {image && (
            <div
              className="mb-4 overflow-hidden rounded-lg relative"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered ? 'translateZ(30px)' : 'translateZ(10px)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <img
                src={image}
                alt={title}
                className="w-full h-40 object-cover rounded-lg transition-all duration-500"
                style={{
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'none',
                }}
              />
            </div>
          )}

          {/* Card content */}
          <div className="flex-1 flex flex-col">
            <div
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered ? 'translateZ(60px)' : 'translateZ(30px)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
              {subtitle && (
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-lg text-white/80">{subtitle}</h4>
                  <div className="flex-grow h-px bg-white/20"></div>
                </div>
              )}
            </div>
            <p
              className="text-white/70 mb-4 flex-1"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered ? 'translateZ(40px)' : 'translateZ(20px)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              {content}
            </p>
            
            {/* Stats bar */}
            {stats && stats.length > 0 && (
              <div 
                className="grid grid-cols-2 gap-2 mb-4"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isHovered ? 'translateZ(50px)' : 'translateZ(25px)',
                  transition: 'transform 0.3s ease-out',
                }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                    <div className="text-xs text-white/50">{stat.label}</div>
                    <div className="text-sm font-semibold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}
            
            <div
              className="mt-auto flex justify-between items-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered ? 'translateZ(70px)' : 'translateZ(40px)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="flex items-center gap-1 text-xs text-white/50">
                <Clock className="w-3 h-3" />
                <span>Limited Time</span>
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 shadow-lg group">
                {rotationMode === 'limited' ? (
                  <span className="group-hover:scale-105 inline-block transition-transform">Enable 360°</span>
                ) : (
                  <span className="group-hover:scale-105 inline-block transition-transform">Limit Rotation</span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced shine effect */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
          style={{
            background: isHovered ? 
              `radial-gradient(circle at ${
                mousePosition.x - cardRef.current?.getBoundingClientRect().left || 0
              }px ${
                mousePosition.y - cardRef.current?.getBoundingClientRect().top || 0
              }px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)` : '',
            opacity: isHovered ? '1' : '0',
            transition: 'opacity 0.3s ease-out',
          }}
        />
      </div>
      
      {/* Card shadow */}
      <div
        className="absolute bottom-0 left-1/2 w-[90%] h-[10px] rounded-full bg-blue-900/30 blur-md -translate-x-1/2"
        style={{
          transform: isHovered 
            ? 'translate(-50%, 20px) scale(0.95)' 
            : 'translate(-50%, 12px) scale(0.85)',
          opacity: isHovered ? '0.5' : '0.3',
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        }}
      />
    </div>
  );
};

export default Card3D;
