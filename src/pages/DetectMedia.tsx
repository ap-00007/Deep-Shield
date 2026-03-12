import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link as LinkIcon, Video, Image, Mic, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const modes = [
  { id: "video", icon: Video, label: "Video Analysis" },
  { id: "image", icon: Image, label: "Image Analysis" },
  { id: "audio", icon: Mic, label: "Audio Analysis" },
];

const statusMessages = [
  "Extracting frames...",
  "Detecting faces...",
  "Analyzing facial artifacts...",
  "Evaluating temporal inconsistencies...",
  "Generating deepfake probability...",
];

const DetectMedia = () => {
  const [selectedMode, setSelectedMode] = useState("video");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const startAnalysis = useCallback(() => {
    setAnalyzing(true);
    setProgress(0);
    setStatusIdx(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/results"), 500);
          return 100;
        }
        return p + 2;
      });
    }, 80);

    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx++;
      if (msgIdx >= statusMessages.length) {
        clearInterval(msgInterval);
      } else {
        setStatusIdx(msgIdx);
      }
    }, 800);
  }, [navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Detect Media</h1>
          <p className="text-muted-foreground">Upload media for AI-powered deepfake analysis</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!analyzing ? (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Detection modes */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {modes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMode(m.id)}
                    className={`glass-card p-4 flex flex-col items-center gap-2 transition-all duration-200 ${
                      selectedMode === m.id
                        ? "border-accent bg-accent-secondary/40 ring-1 ring-accent/30"
                        : "hover:border-accent/30"
                    }`}
                  >
                    <m.icon className="w-5 h-5 text-foreground/70" />
                    <span className="text-xs font-medium">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Upload zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); startAnalysis(); }}
                className={`glass-card border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragOver ? "border-accent bg-accent-secondary/30 scale-[1.01]" : "border-border hover:border-accent/50"
                }`}
                onClick={startAnalysis}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground font-medium mb-1">Upload media to analyze for deepfake manipulation</p>
                <p className="text-sm text-muted-foreground mb-6">Supported: MP4, MOV, JPG, PNG, WAV</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="outline" className="rounded-xl gap-2 border-accent/30">
                    <Upload className="w-4 h-4" /> Upload File
                  </Button>
                  <Button variant="outline" className="rounded-xl gap-2 border-accent/30">
                    <LinkIcon className="w-4 h-4" /> Paste Media URL
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 text-center"
            >
              {/* Scanning animation */}
              <div className="relative w-32 h-32 mx-auto mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-accent/30 border-t-accent"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-3 rounded-full border-2 border-accent-secondary/50 border-b-primary"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-display font-bold">{progress}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-4 max-w-sm mx-auto">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Status */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={statusIdx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                >
                  {progress >= 100 ? (
                    <><CheckCircle2 className="w-4 h-4 text-success" /> Analysis complete</>
                  ) : (
                    <><Loader2 className="w-4 h-4 animate-spin" /> {statusMessages[statusIdx]}</>
                  )}
                </motion.div>
              </AnimatePresence>

              {selectedMode === "audio" && (
                <div className="mt-6 flex items-end justify-center gap-0.5 h-12">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, Math.random() * 40 + 4, 4] }}
                      transition={{ duration: 0.5 + Math.random(), repeat: Infinity, delay: i * 0.05 }}
                      className="w-1 bg-accent rounded-full"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default DetectMedia;
