export default function Loading() {
  return (
    <div className="fixed inset-0 bg-space-black flex flex-col items-center justify-center z-50">
      {/* Gamified Cosmic Orbit Loader */}
      <div className="relative w-20 h-20">
        {/* Outer Orbit Line */}
        <div className="absolute inset-0 rounded-full border border-pulsar-lavender/10 animate-[spin_4s_linear_infinite]" />
        
        {/* Middle Pulse Ring */}
        <div className="absolute inset-2 rounded-full border border-primary/20 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
        
        {/* Central Pulsing Planet Core */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-primary-container to-nebula-purple glow-effect animate-pulse" />
      </div>
      
      {/* Loading HUD Message */}
      <span className="mt-8 font-mono text-xs tracking-widest text-on-surface-variant uppercase animate-pulse">
        CALIBRATING HUD CODESYSTEMS...
      </span>
    </div>
  );
}
