import React, { useState } from 'react';

export const QuietClubSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section
      className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto"
      id="vision"
    >
      <div className="glass-card rounded-[36px] p-8 sm:p-14 text-center border border-white/50 shadow-glass">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#131C24] tracking-tight mb-4">
          Join the Quiet Club
        </h3>
        <p className="text-base sm:text-lg text-[#131C24]/80 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
          Receive seasonal printable puzzle samples, author essays on mindful
          creativity, and early access to numbered limited editions.
        </p>

        {subscribed ? (
          <div className="p-4 bg-white/40 border border-white/60 rounded-full max-w-md mx-auto text-[#131C24] font-bold text-sm sm:text-base animate-in zoom-in-95 duration-200">
            ✦ Welcome to the Quiet Club! Check your inbox for your starter pack.
          </div>
        ) : (
          <form
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your favorite email address..."
              required
              className="flex-1 px-6 py-3.5 rounded-full bg-white/95 border border-white text-[#131C24] placeholder-[#131C24]/50 focus:outline-none focus:ring-2 focus:ring-[#D95C14] text-sm shadow-sm"
            />
            <button
              type="submit"
              className="pill-press px-8 py-3.5 rounded-full bg-[#131C24] hover:bg-black text-white font-bold text-sm shadow-pill transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}

        <span className="block text-xs text-[#131C24]/60 mt-4 font-medium">
          No spam. Only quiet puzzles twice a month. Unsubscribe anytime.
        </span>
      </div>
    </section>
  );
};
