
import React, { useEffect } from 'react';
import { Card3D } from '@/components/Card3D';

const Index = () => {
  // Add global styles using useEffect and a style element
  useEffect(() => {
    // Create style element
    const styleEl = document.createElement('style');
    // Set the CSS text content
    styleEl.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0);
        }
        25% {
          transform: translateY(-20px) translateX(10px);
        }
        50% {
          transform: translateY(0) translateX(20px);
        }
        75% {
          transform: translateY(20px) translateX(10px);
        }
        100% {
          transform: translateY(0) translateX(0);
        }
      }
      
      @keyframes smoke {
        0% {
          transform: translateY(0) scale(1);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-15px) scale(1.5);
          opacity: 0.3;
        }
        100% {
          transform: translateY(-30px) scale(1);
          opacity: 0;
        }
      }
    `;
    // Append to head
    document.head.appendChild(styleEl);
    
    // Cleanup function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-gray-900 to-black py-20 px-4 flex flex-col items-center relative overflow-hidden">
      {/* Floating particles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-500/10"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px 2px rgba(34, 211, 238, 0.1)',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-100 mb-2 text-center">Interactive 3D Cards</h1>
      <p className="text-cyan-300/70 mb-10 max-w-lg text-center">Experience the power of 3D transformations and immersive effects with our interactive cards collection</p>
      
      <div className="max-w-5xl w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card3D
          title="Galactic Explorer"
          subtitle="Journey beyond the stars"
          content="Navigate through nebulas and black holes in your own spacecraft. Experience zero gravity and collect rare cosmic artifacts."
          image="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdhbGF4eXxlbnwwfHwwfHx8MA%3D%3D"
          gradientFrom="from-blue-900"
          gradientTo="to-cyan-800"
          className="h-[400px]"
          stats={[
            { label: "Distance", value: "392 light years" },
            { label: "Discovered", value: "2186" }
          ]}
          badge="Premium Adventure"
        />
        <Card3D
          title="Deep Sea Discovery"
          subtitle="Secrets of the abyss"
          content="Pilot a submersible to 3,800 meters below sea level. Encounter bioluminescent creatures and explore hydrothermal vents."
          image="https://images.unsplash.com/photo-1551244072-5d12893278ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2NlYW4lMjBkZXB0aHxlbnwwfHwwfHx8MA%3D%3D"
          gradientFrom="from-cyan-900"
          gradientTo="to-teal-800"
          className="h-[400px]"
          stats={[
            { label: "Depth", value: "3,800m" },
            { label: "Temperature", value: "2°C" }
          ]}
          badge="Expert Only"
        />
        <Card3D
          title="Summit Challenge"
          subtitle="Conquer the impossible"
          content="Scale the world's most dangerous peaks with elite climbers. Brave extreme conditions and navigate treacherous terrain."
          image="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdW50YWlufGVufDB8fDB8fHww"
          gradientFrom="from-slate-800"
          gradientTo="to-zinc-900"
          className="h-[400px]"
          stats={[
            { label: "Elevation", value: "8,849m" },
            { label: "Success Rate", value: "12%" }
          ]}
          badge="Ultimate Challenge"
        />
      </div>
      
      <div className="mt-16 text-cyan-300/50 text-center max-w-md">
        <p className="mb-4">Hover over the cards to see the 3D effect and smoke animation in action!</p>
        <p>Click on a card to toggle between limited tilt and full 360° rotation modes.</p>
      </div>
    </div>
  );
};

export default Index;
