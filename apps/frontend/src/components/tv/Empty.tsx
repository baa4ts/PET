export const Empty = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex-1 flex flex-col items-center justify-center gap-2 text-zinc-600">
    <Icon size={28} strokeWidth={1.5} />
    <span className="text-xs">{label}</span>
  </div>
);