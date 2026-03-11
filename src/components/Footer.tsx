import { Shield, Github, FileText, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-muted/30">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">DeepShield AI</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Advanced AI-powered deepfake detection platform for journalists, investigators, and cybersecurity teams. Protecting truth in the age of synthetic media.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm text-foreground mb-3">Platform</h4>
          <div className="space-y-2">
            {[
              { label: "Detect Media", path: "/detect" },
              { label: "Dashboard", path: "/dashboard" },
              { label: "Model Insights", path: "/insights" },
              { label: "API Docs", path: "/api" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm text-foreground mb-3">Resources</h4>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <FileText className="w-3.5 h-3.5" /> Documentation
            </a>
            <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-3.5 h-3.5" /> Contact
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DeepShield AI. All rights reserved. Built for truth verification.
      </div>
    </div>
  </footer>
);

export default Footer;
