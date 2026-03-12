import { motion } from "framer-motion";
import { Shield, Monitor, Sparkles, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import MagicBento from "@/components/MagicBento";
import type { BentoCardItem } from "@/components/MagicBento";

const aboutCards: BentoCardItem[] = [
  {
    label: "Mission",
    title: "Defending Media Truth",
    description:
      "DeepShield AI detects manipulated media — deepfake videos, altered images, and synthetic audio — using ML models trained to identify generative AI artifacts that are invisible to the human eye.",
  },
  {
    label: "Pipeline",
    title: "Modular AI Architecture",
    description:
      "Media Ingestion → Frame Extraction → Face Detection → Feature Analysis → Deepfake Classification → Temporal Analysis → Confidence Scoring → Visualization.",
  },
  {
    label: "Core Engine",
    title: "Deep Learning Detection",
    description:
      "Convolutional neural networks analyze every frame for unnatural facial textures, blending artifacts at facial boundaries, inconsistent skin tone and lighting, and abnormal eye-blinking patterns. Each frame receives an individual manipulation probability score that feeds into the final result.",
  },
  {
    label: "Video Intelligence",
    title: "Temporal Consistency Analysis",
    description:
      "Cross-frame analysis reveals irregular facial motion, unnatural lip synchronization, and temporal texture instability that persist across consecutive frames — detecting manipulation even when individual frames appear completely realistic to the human eye.",
  },
  {
    label: "Results",
    title: "Confidence Scoring",
    description:
      "Frame-level classifications and temporal signals are aggregated into a single deepfake probability score, presented with visual heatmaps, forensic timelines, and detailed analysis summaries.",
  },
  {
    label: "Ethics",
    title: "Responsible AI Use",
    description:
      "No system guarantees perfect accuracy. DeepShield AI is an assistive tool — always pair results with human judgment and contextual information. We advocate for transparency, fairness, and accountability.",
  },
];

const roadmap = [
  { icon: Monitor, title: "Browser Extension", desc: "Real-time deepfake detection on social media platforms" },
  { icon: Sparkles, title: "Real-time Stream Analysis", desc: "Live video stream verification for broadcast media" },
  { icon: Building2, title: "Enterprise Tools", desc: "Organization-wide media verification and compliance workflows" },
];

const About = () => (
  <Layout>
    {/* ─── Hero ─── */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-secondary/30 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 pt-10 pb-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-secondary text-xs font-medium text-foreground/70 border border-accent/20 mb-4">
            <Shield className="w-3 h-3" /> About DeepShield AI
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight">
            Defending truth in an era of{" "}
            <span className="gradient-text">synthetic media</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
            DeepShield AI is an artificial intelligence system designed to detect manipulated media such as deepfake
            videos, altered images, and synthetic audio. The platform analyzes digital media using machine learning
            models trained to identify subtle artifacts left behind by generative AI systems.
          </p>
        </motion.div>
      </div>
    </section>

    {/* ─── Bento Grid ─── */}
    <section className="container mx-auto px-4 pb-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-5"
      >
        <h2 className="text-xl font-display font-semibold text-foreground/80">Platform Architecture</h2>
        <p className="text-sm text-muted-foreground mt-1">Six pillars of the DeepShield detection engine</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
        <MagicBento
          cardData={aboutCards}
          textAutoHide={true}
          enableStars
          enableSpotlight={false}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism
          clickEffect
          particleCount={12}
          glowColor="154, 166, 178"
          disableAnimations={false}
        />
      </motion.div>
    </section>

    {/* ─── Roadmap ─── */}
    <section className="container mx-auto px-4 pb-16 max-w-5xl">
      <h2 className="font-display font-semibold text-xl mb-4">Future Development</h2>
      <div className="space-y-3">
        {roadmap.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-secondary/60 flex items-center justify-center flex-shrink-0">
              <r.icon className="w-5 h-5 text-foreground/70" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm">{r.title}</h3>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default About;
