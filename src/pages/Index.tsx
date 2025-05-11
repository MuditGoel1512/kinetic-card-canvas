
import React from 'react';
import { Card3D } from '@/components/Card3D';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">Interactive 3D Cards</h1>
      <div className="max-w-5xl w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card3D
          title="Cosmic Adventure"
          subtitle="Explore the universe"
          content="Embark on a journey through space and time. Discover new planets and encounter exotic alien species."
          image="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdhbGF4eXxlbnwwfHwwfHx8MA%3D%3D"
          gradientFrom="from-purple-600"
          gradientTo="to-blue-500"
          className="h-[400px]"
        />
        <Card3D
          title="Ocean Depths"
          subtitle="Underwater mysteries"
          content="Dive into the deep blue sea and uncover the secrets hidden beneath the waves. Meet fascinating marine creatures."
          image="https://images.unsplash.com/photo-1551244072-5d12893278ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2NlYW4lMjBkZXB0aHxlbnwwfHwwfHx8MA%3D%3D"
          gradientFrom="from-teal-500"
          gradientTo="to-blue-600"
          className="h-[400px]"
        />
        <Card3D
          title="Mountain Peak"
          subtitle="Reach for the sky"
          content="Scale the highest mountains and feel the exhilaration of standing above the clouds. Breathtaking views await you."
          image="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdW50YWlufGVufDB8fDB8fHww"
          gradientFrom="from-amber-500"
          gradientTo="to-rose-500"
          className="h-[400px]"
        />
      </div>
      <div className="mt-16 text-white/70 text-center">
        <p className="mb-4">Hover over the cards to see the 3D effect in action!</p>
        <p>Move your mouse around to change the perspective view.</p>
      </div>
    </div>
  );
};

export default Index;
