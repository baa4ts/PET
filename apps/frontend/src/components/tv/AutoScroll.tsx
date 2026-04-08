export const AutoScroll = ({
    children,
    speed = 30,
    active = true
}: {
    children: React.ReactNode;
    speed?: number;
    active?: boolean;
}) => (
    <div className="overflow-hidden flex-1 relative">
        <style>{`
      @keyframes scroll-up {
        0% { transform: translateY(0); }
        100% { transform: translateY(-50%); }
      }
      .auto-scroll {
        display: flex;
        flex-direction: column;
        animation: scroll-up ${speed}s linear infinite;
      }
      .paused {
        animation: none;
      }
      .auto-scroll:hover {
        animation-play-state: paused;
      }
    `}</style>

        <div className={active ? "auto-scroll" : "auto-scroll paused"}>
            {children}
            {active && children}
        </div>
    </div>
);