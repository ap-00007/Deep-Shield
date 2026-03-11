import { motion } from "framer-motion";
import { Scan, Brain, Clock, Target, ArrowRight, Database } from "lucide-react";
import Layout from "@/components/Layout";

const pipelineSteps = [
  { icon: ArrowRight, label: "Media Input" },
  { icon: Scan, label: "Frame Extraction" },
  { icon: Target, label: "Face Detection" },
  { icon: Brain, label: "Feature Extraction" },
  { icon: Target, label: "Deepfake Classification" },
];

const modules = [
  { title: "Face Detection Module", desc: "Uses MTCNN for multi-scale face detection with landmark alignment across all frames.", icon: Scan },
  { title: "Feature Extraction Network", desc: "EfficientNet-based encoder extracts spatial features from detected face crops.", icon: Brain },
  { title: "Temporal Consistency Analyzer", desc: "LSTM-based module analyzes frame-to-frame coherence for video inputs.", icon: Clock },
  { title: "Deepfake Classifier", desc: "Ensemble classifier combines spatial and temporal features for final prediction.", icon: Target },
];

const datasets = [
  { name: "FaceForensics++", size: "1.8M frames", desc: "Multi-method forgery benchmark" },
  { name: "Celeb-DF v2", size: "590K frames", desc: "Celebrity deepfake dataset" },
  { name: "DFDC", size: "100K videos", desc: "Facebook deepfake detection challenge" },
];

const ModelInsights = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold mb-2">
        Model Insights
      </motion.h1>
      <p className="text-muted-foreground mb-10">Understanding how DeepShield AI detects manipulated media</p>

      {/* Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 mb-8"
      >
        <h2 className="font-display font-semibold text-xl mb-6">Detection Pipeline</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {pipelineSteps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-secondary to-accent/30 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-foreground/70" />
                </div>
                <span className="text-xs font-medium text-center">{s.label}</span>
              </div>
              {i < pipelineSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 mb-5" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Architecture Cards */}
      <h2 className="font-display font-semibold text-xl mb-4">Model Architecture</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {modules.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-5"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent-secondary/60 flex items-center justify-center flex-shrink-0">
                <m.icon className="w-4 h-4 text-foreground/70" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm mb-1">{m.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Datasets */}
      <h2 className="font-display font-semibold text-xl mb-4">Training Datasets</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {datasets.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-5"
          >
            <Database className="w-5 h-5 text-muted-foreground mb-2" />
            <h3 className="font-display font-semibold text-sm">{d.name}</h3>
            <p className="text-xs text-accent font-medium mb-1">{d.size}</p>
            <p className="text-xs text-muted-foreground">{d.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </Layout>
);

export default ModelInsights;
