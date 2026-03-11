import { motion } from "framer-motion";
import { FileVideo, Image, Mic, BarChart3, AlertTriangle, CheckCircle2, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";

const analyses = [
  { name: "interview_clip.mp4", type: "Video", time: "2 hours ago", result: "Fake", confidence: 87 },
  { name: "portrait_photo.jpg", type: "Image", time: "5 hours ago", result: "Authentic", confidence: 12 },
  { name: "voice_recording.wav", type: "Audio", time: "1 day ago", result: "Suspicious", confidence: 63 },
  { name: "news_segment.mp4", type: "Video", time: "2 days ago", result: "Fake", confidence: 91 },
  { name: "headshot.png", type: "Image", time: "3 days ago", result: "Authentic", confidence: 8 },
  { name: "podcast_clip.wav", type: "Audio", time: "4 days ago", result: "Suspicious", confidence: 55 },
];

const filters = ["All", "Video", "Image", "Audio"];

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? analyses : analyses.filter((a) => a.type === activeFilter);

  const totalAnalyzed = analyses.length;
  const fakeDetected = analyses.filter((a) => a.result === "Fake").length;
  const avgConfidence = Math.round(analyses.reduce((s, a) => s + a.confidence, 0) / analyses.length);

  const typeIcon = (type: string) => {
    if (type === "Video") return FileVideo;
    if (type === "Image") return Image;
    return Mic;
  };

  const resultStyle = (result: string) => {
    if (result === "Fake") return "status-red bg-status-red";
    if (result === "Suspicious") return "status-orange bg-status-orange";
    return "status-green bg-status-green";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold mb-8">
          Dashboard
        </motion.h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Analyzed", value: totalAnalyzed, icon: BarChart3 },
            { label: "Fake Detected", value: fakeDetected, icon: AlertTriangle },
            { label: "Avg Confidence", value: `${avgConfidence}%`, icon: CheckCircle2 },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <s.icon className="w-4 h-4" /> {s.label}
              </div>
              <div className="text-2xl font-display font-bold">{s.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === f ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-sm text-muted-foreground">
                <th className="text-left p-4 font-medium">File Name</th>
                <th className="text-left p-4 font-medium hidden sm:table-cell">Type</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Uploaded</th>
                <th className="text-left p-4 font-medium">Result</th>
                <th className="text-right p-4 font-medium">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const Icon = typeIcon(a.type);
                return (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="p-4">
                      <Link to="/results" className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{a.name}</span>
                      </Link>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{a.type}</td>
                    <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{a.time}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${resultStyle(a.result)}`}>
                        {a.result}
                      </span>
                    </td>
                    <td className="p-4 text-right text-sm font-medium">{a.confidence}%</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
