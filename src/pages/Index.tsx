
import React from 'react';
import { Card3D } from '@/components/Card3D';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 py-20 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">Interactive 3D Cards</h1>
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
      <div className="mt-16 text-white/70 text-center">
        <p className="mb-4">Hover over the cards to see the 3D effect in action!</p>
        <p>Click on a card to toggle between limited tilt and full 360° rotation modes.</p>
      </div>
    </div>
  );
};

export default Index;
