export const AutoScroll = ({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) => (
  <div className="overflow-hidden flex-1 relative">
    <style>{`
      @keyframes scroll-up {
        0% { transform: translateY(0); }
        100% { transform: translateY(-50%); }
      }
      .auto-scroll { animation: scroll-up ${speed}s linear infinite; }
      .auto-scroll:hover { animation-play-state: paused; }
    `}</style>
    <div className="auto-scroll">
      {children}
      {children}
    </div>
  </div>
);