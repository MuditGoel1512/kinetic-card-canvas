
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
  gradientFrom = 'from-purple-500',
  gradientTo = 'to-blue-600',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useMousePosition();
  const [mouseEnterPosition, setMouseEnterPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    setMouseEnterPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const calculateRotation = () => {
    if (!cardRef.current || !isHovered) return { x: 0, y: 0 };
    
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((mousePosition.x - cardCenterX) / (cardRect.width / 2)) * 10;
    const rotateX = -((mousePosition.y - cardCenterY) / (cardRect.height / 2)) * 10;
    
    return { x: rotateX, y: rotateY };
  };

  const rotation = calculateRotation();

  return (
    <div
      ref={cardRef}
      className={`relative perspective-1000 ${className}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative flex flex-col rounded-xl overflow-hidden ${isHovered ? 'z-10' : ''}`}
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)`
            : 'rotateX(0) rotateY(0) scale3d(1, 1, 1)',
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card background with gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-80`}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-10px)',
            transition: 'all 0.3s ease-out',
            opacity: isHovered ? '0.9' : '0.8',
          }}
        />
        
        {/* Glass overlay */}
        <div
          className="absolute inset-0 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl shadow-xl"
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
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 shadow-lg">
                Learn More
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
              }px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)` : '',
            opacity: isHovered ? '1' : '0',
            transition: 'opacity 0.3s ease-out',
          }}
        />
      </div>
      
      {/* Card shadow */}
      <div
        className="absolute bottom-0 left-1/2 w-[90%] h-[10px] rounded-full bg-black/20 blur-md -translate-x-1/2"
        style={{
          transform: isHovered 
            ? 'translate(-50%, 20px) scale(0.95)' 
            : 'translate(-50%, 12px) scale(0.85)',
          opacity: isHovered ? '0.3' : '0.2',
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        }}
      />
    </div>
  );
};

export default Card3D;
