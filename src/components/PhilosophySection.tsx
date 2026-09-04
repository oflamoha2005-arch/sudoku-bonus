import React from 'react';

export const PhilosophySection: React.FC = () => {
  const values = [
    {
      icon: '✦',
      title: 'Curiosity',
      desc: 'Expanding vocabulary and finding delight in obscure discoveries.',
    },
    {
      icon: '⏳',
      title: 'Slowness',
      desc: 'Honoring the unhurried joy of analog pencil on heavy cream paper.',
    },
    {
      icon: '🌿',
      title: 'Mindfulness',
      desc: 'Natural flow state created through clean, elegant, frustration-free grids.',
    },
    {
      icon: '📖',
      title: 'Craft',
      desc: 'Sustainable paper mills, cloth hardcovers, and heirloom durability.',
    },
  ];

  return (
    <section
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto text-center"
      id="story"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#131C24]/30 bg-white/10 backdrop-blur-sm mb-6">
        <span className="text-xs font-black tracking-wider uppercase text-[#131C24]">
          ✦ OUR PHILOSOPHY
        </span>
      </div>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#131C24] mb-8 leading-tight">
        "Made for Curious Minds and Quiet Afternoons"
      </h2>
      <p className="text-lg sm:text-xl text-[#131C24]/85 font-medium leading-relaxed max-w-3xl mx-auto mb-14">
        In an era of endless notifications and fleeting blue-light screens,
        Oufellia crafts tangible paper objects that reward single-task absorption.
        We believe solving a word grid or tracing a hand-drawn labyrinth is a
        gentle rebellion: a deliberate return to peaceful curiosity and deep focus.
      </p>

      {/* 4 Tactile Core Value Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
        {values.map((val) => (
          <div
            key={val.title}
            className="glass-card p-6 rounded-3xl shadow-sm hover:border-white/70 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-2xl mb-3">{val.icon}</div>
            <h4 className="font-black text-[#131C24] text-base">{val.title}</h4>
            <p className="text-xs sm:text-sm text-[#131C24]/75 mt-1.5 font-medium leading-relaxed">
              {val.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
