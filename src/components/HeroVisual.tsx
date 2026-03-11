import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroVisual = () => {
  const [progress, setProgress] = useState(0);
  const [markers, setMarkers] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 92 ? 0 : p + 1));
    }, 60);
    setMarkers([
      { x: 35, y: 30, delay: 0.5 },
      { x: 60, y: 45, delay: 1 },
      { x: 45, y: 65, delay: 1.5 },
      { x: 55, y: 25, delay: 2 },
    ]);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* Face outline */}
      <div className="absolute inset-8 rounded-3xl bg-gradient-to-br from-accent-secondary/60 to-accent/20 border border-accent/30 overflow-hidden">
        {/* Scan line */}
        <div className="scan-line" />
        
        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Face silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 100 120" className="w-40 h-48 text-accent/40">
            <ellipse cx="50" cy="50" rx="30" ry="38" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="38" cy="42" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="62" cy="42" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="50" cy="55" rx="3" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 40 68 Q 50 75 60 68" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Detection markers */}
        {markers.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: m.delay, duration: 0.3 }}
            className="absolute w-6 h-6 border-2 border-warning rounded-sm"
            style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-warning/10"
            />
          </motion.div>
        ))}
      </div>

      {/* Probability meter */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 glass-card p-3 w-28"
      >
        <div className="text-xs text-muted-foreground mb-1 font-medium">Deepfake Score</div>
        <div className="text-2xl font-display font-bold text-foreground">{progress}%</div>
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-success via-warning to-danger"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroVisual;
