import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Video, Image, Mic, Upload, ArrowRight, Target, Layers, BarChart3, Shield, Cpu, FileSearch, ChevronRight } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const features = [
  {
    icon: Video,
    title: "Video Deepfake Detection",
    desc: "Frame-by-frame analysis identifies facial inconsistencies and unnatural motion artifacts.",
  },
  {
    icon: Image,
    title: "Image Manipulation Detection",
    desc: "AI detects blending artifacts, texture inconsistencies, and GAN-generated features.",
  },
  {
    icon: Mic,
    title: "Audio Voice Clone Detection",
    desc: "Spectral analysis identifies synthetic speech patterns and cloned voices.",
  },
];

const pipeline = [
  { icon: Upload, label: "Upload Media" },
  { icon: Layers, label: "AI Frame Extraction" },
  { icon: FileSearch, label: "Feature Analysis" },
  { icon: Target, label: "Manipulation Detection" },
  { icon: BarChart3, label: "Detailed Report" },
];

const stats = [
  { value: "92%", label: "Detection Accuracy" },
  { value: "1,000+", label: "Frames per Video" },
  { value: "3 Types", label: "Video, Image, Audio" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-secondary/30 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={fadeUp} custom={0}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-secondary text-xs font-medium text-foreground/70 border border-accent/20">
                  <Shield className="w-3 h-3" /> AI-Powered Media Forensics
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-balance">
                Detect AI Manipulated Media with{" "}
                <span className="gradient-text">Precision</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Analyze videos, images, and audio to uncover deepfake manipulation using advanced AI forensic analysis.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
                <Link to="/detect">
                  <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-xl px-6 h-11 font-medium gap-2">
                    Analyze Media <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/results">
                  <Button variant="outline" className="rounded-xl px-6 h-11 font-medium border-accent/30 hover:bg-accent-secondary/50">
                    View Demo
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-secondary/60 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-foreground/70" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground">Our AI pipeline processes media through five stages</p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4">
          {pipeline.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card-hover p-5 flex flex-col items-center gap-3 w-40"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-secondary to-accent/30 flex items-center justify-center">
                <step.icon className="w-5 h-5 text-foreground/70" />
              </div>
              <span className="text-sm font-medium text-center">{step.label}</span>
              {i < pipeline.length - 1 && (
                <ChevronRight className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full text-muted-foreground/30 w-4 h-4" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="container mx-auto px-4 py-16">
        <div className="glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">{s.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
