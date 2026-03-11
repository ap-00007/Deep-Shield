import { motion } from "framer-motion";
import { AlertTriangle, Eye, Clock, Lightbulb, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";

const frameData = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  score: Math.random() * 0.4 + (i >= 8 && i <= 14 ? 0.5 : 0.1),
  flagged: i >= 8 && i <= 14,
}));

const explanations = [
  { icon: Eye, text: "Facial blending artifacts detected near jawline", severity: "high" },
  { icon: Clock, text: "Abnormal eye blinking frequency detected", severity: "medium" },
  { icon: Lightbulb, text: "Lighting inconsistency across consecutive frames", severity: "high" },
  { icon: AlertTriangle, text: "Texture distortion near cheek region", severity: "medium" },
];

const Results = () => {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);
  const overallScore = 87;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold mb-8">
          Analysis Results
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Result Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 glass-card p-6 text-center"
          >
            <div className="text-sm text-muted-foreground mb-2 font-medium">Deepfake Probability</div>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="hsl(var(--danger))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${overallScore * 2.51} 251`}
                  initial={{ strokeDasharray: "0 251" }}
                  animate={{ strokeDasharray: `${overallScore * 2.51} 251` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-display font-bold text-foreground">{overallScore}%</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-red border text-sm font-medium status-red">
              <AlertTriangle className="w-3.5 h-3.5" /> High Probability of Manipulation
            </div>
          </motion.div>

          {/* Media Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-4 relative overflow-hidden"
          >
            <div className="aspect-video bg-gradient-to-br from-accent-secondary/40 to-muted rounded-xl relative overflow-hidden">
              {/* Face placeholder with overlay markers */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-48 h-48 text-muted-foreground/20">
                  <ellipse cx="100" cy="90" rx="55" ry="70" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="78" cy="75" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="122" cy="75" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 85 115 Q 100 128 115 115" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              {/* Detection overlays */}
              {[
                { x: "30%", y: "55%", w: 60, h: 20, label: "Jawline blending artifact" },
                { x: "55%", y: "35%", w: 30, h: 15, label: "Eye region anomaly" },
                { x: "42%", y: "48%", w: 25, h: 18, label: "Texture distortion" },
              ].map((region, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                  className="absolute border-2 border-warning/60 rounded-sm group cursor-pointer"
                  style={{ left: region.x, top: region.y, width: region.w, height: region.h }}
                >
                  <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-warning/10"
                  />
                  <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block">
                    <div className="bg-foreground text-background text-xs px-2 py-1 rounded-md whitespace-nowrap">
                      {region.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Frame Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mt-6"
        >
          <h3 className="font-display font-semibold mb-4">Frame Timeline</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {frameData.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFrame(f.id === selectedFrame ? null : f.id)}
                className={`flex-shrink-0 w-14 h-10 rounded-lg border-2 transition-all relative ${
                  selectedFrame === f.id
                    ? "border-accent ring-2 ring-accent/30"
                    : f.flagged
                    ? "border-warning/50 bg-warning/5"
                    : "border-border bg-muted/30"
                }`}
              >
                {f.flagged && (
                  <AlertTriangle className="absolute -top-1.5 -right-1.5 w-3 h-3 text-warning" />
                )}
                <span className="text-[10px] text-muted-foreground">F{f.id + 1}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Confidence Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mt-6"
        >
          <h3 className="font-display font-semibold mb-4">Deepfake Confidence Over Frames</h3>
          <div className="h-40 flex items-end gap-1">
            {frameData.map((f, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${f.score * 100}%` }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                onHoverStart={() => setSelectedFrame(f.id)}
                onHoverEnd={() => setSelectedFrame(null)}
                className={`flex-1 rounded-t-md cursor-pointer transition-colors ${
                  f.flagged ? "bg-warning/60 hover:bg-warning" : "bg-accent/40 hover:bg-accent/60"
                } ${selectedFrame === f.id ? "ring-2 ring-foreground/20" : ""}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
            <span>Frame 1</span>
            <span>Frame 20</span>
          </div>
        </motion.div>

        {/* AI Explanation Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mt-6"
        >
          <h3 className="font-display font-semibold mb-4">AI Forensic Analysis</h3>
          <div className="space-y-3">
            {explanations.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  e.severity === "high" ? "bg-status-red" : "bg-status-orange"
                }`}
              >
                <e.icon className={`w-4 h-4 flex-shrink-0 ${e.severity === "high" ? "status-red" : "status-orange"}`} />
                <span className="text-sm">{e.text}</span>
                <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Results;
