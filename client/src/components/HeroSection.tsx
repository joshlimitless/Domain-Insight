import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Globe, Zap } from "lucide-react";

interface HeroSectionProps {
  onCtaClick?: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/50 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-fuchsia-500/10 to-transparent blur-3xl rounded-full" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-violet-300">Now in Beta</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
            Take Control of Your
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
            Domain Analytics
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10" data-testid="text-hero-subtitle">
          Get clarity into your domain traffic even when using marketplace landers from Afternic, GoDaddy, Spaceship, or parking services like Sedo and ParkingCrew.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button 
            size="lg"
            onClick={onCtaClick}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 border-0 text-white shadow-xl shadow-violet-500/30 px-8"
            data-testid="button-hero-cta"
          >
            Take Control
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-white/10 bg-white/5 backdrop-blur-sm"
            data-testid="button-hero-learn"
          >
            Learn More
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm">
            <Activity className="w-5 h-5 text-violet-400" />
            <span className="text-sm">Real-time Uptime</span>
          </div>
          <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm">
            <Globe className="w-5 h-5 text-fuchsia-400" />
            <span className="text-sm">Geographic Data</span>
          </div>
          <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span className="text-sm">Speed Metrics</span>
          </div>
        </div>
      </div>
    </section>
  );
}
