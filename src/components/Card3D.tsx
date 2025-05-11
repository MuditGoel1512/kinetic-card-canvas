
import React, { useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Card3DProps {
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  title,
  subtitle,
  content,
  image,
  className = '',
  gradientFrom = 'from-indigo-900',
  gradientTo = 'to-purple-800',
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

        {/* Content container */}
        <div
          className="relative p-6 flex flex-col h-full z-10"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered ? 'translateZ(50px)' : 'translateZ(20px)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {/* Image */}
          {image && (
            <div
              className="mb-4 overflow-hidden rounded-lg"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered ? 'translateZ(30px)' : 'translateZ(10px)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-40 object-cover rounded-lg transition-transform duration-500"
                style={{
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
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
                <h4 className="text-lg text-white/80 mb-3">{subtitle}</h4>
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
            <div
              className="mt-auto"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered ? 'translateZ(70px)' : 'translateZ(40px)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 shadow-lg">
                {rotationMode === 'limited' ? 'Enable 360° Rotation' : 'Limit Rotation'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Shine effect */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
          style={{
            background: isHovered ? 
              `radial-gradient(circle at ${
                mousePosition.x - cardRef.current?.getBoundingClientRect().left || 0
              }px ${
                mousePosition.y - cardRef.current?.getBoundingClientRect().top || 0
              }px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 80%)` : '',
            opacity: isHovered ? '1' : '0',
            transition: 'opacity 0.3s ease-out',
          }}
        />
      </div>
      
      {/* Card shadow */}
      <div
        className="absolute bottom-0 left-1/2 w-[90%] h-[10px] rounded-full bg-purple-900/30 blur-md -translate-x-1/2"
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
