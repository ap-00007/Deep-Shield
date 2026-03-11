import { motion } from "framer-motion";
import { Code, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const codeSnippet = `curl -X POST https://api.deepshield.ai/v1/detect \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "media=@video.mp4"`;

const responseExample = `{
  "id": "ds_abc123",
  "result": "Fake",
  "confidence": 0.87,
  "frames_analyzed": 450,
  "detections": [
    {
      "type": "facial_blending",
      "region": "jawline",
      "confidence": 0.92
    }
  ]
}`;

const ApiPage = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold mb-2">
          API Documentation
        </motion.h1>
        <p className="text-muted-foreground mb-10">Integrate deepfake detection into your applications</p>

        {/* Endpoint */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-0.5 rounded-md bg-foreground text-background text-xs font-bold">POST</span>
            <code className="text-sm font-mono">/api/v1/detect</code>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Submit a media file for deepfake analysis. Supports video, image, and audio formats.
          </p>

          <h4 className="text-sm font-semibold mb-2">Request</h4>
          <div className="relative">
            <pre className="bg-foreground text-background p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
              {codeSnippet}
            </pre>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyCode}
              className="absolute top-2 right-2 text-background/60 hover:text-background hover:bg-background/10"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </motion.div>

        {/* Response */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-6"
        >
          <h4 className="text-sm font-semibold mb-3">Response</h4>
          <pre className="bg-foreground text-background p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
            {responseExample}
          </pre>
        </motion.div>

        {/* Params */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h4 className="text-sm font-semibold mb-3">Parameters</h4>
          <div className="space-y-3">
            {[
              { param: "media", type: "file", desc: "Media file to analyze (MP4, JPG, PNG, WAV)" },
              { param: "mode", type: "string", desc: "Analysis mode: video, image, or audio (auto-detected if omitted)" },
              { param: "detail_level", type: "string", desc: "Response detail: summary or full (default: full)" },
            ].map((p) => (
              <div key={p.param} className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl">
                <code className="text-xs font-mono bg-accent-secondary/50 px-1.5 py-0.5 rounded font-semibold">{p.param}</code>
                <div className="flex-1">
                  <span className="text-xs text-muted-foreground">{p.type}</span>
                  <p className="text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ApiPage;
