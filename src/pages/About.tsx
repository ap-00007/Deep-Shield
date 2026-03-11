import { motion } from "framer-motion";
import { Shield, Globe, Scale, Sparkles, Monitor, Building2 } from "lucide-react";
import Layout from "@/components/Layout";

const roadmap = [
  { icon: Monitor, title: "Browser Extension", desc: "Real-time deepfake detection on social media platforms" },
  { icon: Sparkles, title: "Real-time Stream Analysis", desc: "Live video stream verification for broadcast media" },
  { icon: Building2, title: "Enterprise Tools", desc: "Organization-wide media verification and compliance workflows" },
];

const About = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold mb-2">
        About DeepShield AI
      </motion.h1>
      <p className="text-muted-foreground mb-10">Defending truth in an era of synthetic media</p>

      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-foreground/70" />
            <h2 className="font-display font-semibold text-lg">The Rise of Deepfake Misinformation</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI-generated synthetic media has become increasingly sophisticated, enabling convincing face swaps, voice cloning, and video manipulation. These deepfakes pose serious threats to journalism, public trust, and democratic institutions. DeepShield AI was built to combat this growing challenge.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-foreground/70" />
            <h2 className="font-display font-semibold text-lg">AI Media Verification</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our platform empowers journalists, investigators, and cybersecurity teams with state-of-the-art AI tools to verify media authenticity. By analyzing facial artifacts, temporal inconsistencies, and spectral patterns, we provide actionable forensic intelligence.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-5 h-5 text-foreground/70" />
            <h2 className="font-display font-semibold text-lg">Ethical AI Use</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We are committed to responsible AI development. Our detection models are designed to protect individuals and organizations, not to enable surveillance or censorship. We advocate for transparency, fairness, and accountability in all AI applications.
          </p>
        </motion.div>
      </div>

      {/* Roadmap */}
      <h2 className="font-display font-semibold text-xl mt-12 mb-4">Roadmap</h2>
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
    </div>
  </Layout>
);

export default About;
