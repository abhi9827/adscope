export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center relative">
      {/* Ambient Pulsing Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-[60px] animate-pulse"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-space-lg">
        {/* Sleek Custom Loader */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-outline-variant/30"></div>
          <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        
        {/* Animated Text */}
        <div className="flex items-center gap-2 font-label-md text-label-md uppercase tracking-widest text-primary animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          Fetching Creative Intelligence...
        </div>
      </div>
    </div>
  );
}
