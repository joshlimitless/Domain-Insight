import { Card } from "@/components/ui/card";
import { 
  Activity, 
  Zap, 
  Globe, 
  Clock, 
  Search, 
  Code2,
  TrendingUp,
  MapPin,
  Timer
} from "lucide-react";

const benefits = [
  {
    icon: Activity,
    title: "Lander Uptime Monitoring",
    description: "Know immediately when your sales landers go down. Get alerts and track uptime history across all your domains.",
    gradient: "from-emerald-500 to-teal-500",
    stats: "99.9% uptime tracked"
  },
  {
    icon: Zap,
    title: "Loading Speed Metrics",
    description: "Measure how fast your landers load for visitors worldwide. Slow pages lose buyers.",
    gradient: "from-amber-500 to-orange-500",
    stats: "< 2s avg load time"
  },
  {
    icon: Globe,
    title: "Geographic Analytics",
    description: "See exactly which countries and cities your traffic comes from. Understand your audience demographics.",
    gradient: "from-violet-500 to-purple-500",
    stats: "195+ countries"
  },
  {
    icon: Clock,
    title: "Session Duration",
    description: "Track how long visitors stay on your landing pages. Longer sessions often mean more interested buyers.",
    gradient: "from-fuchsia-500 to-pink-500",
    stats: "Avg 45s sessions"
  },
  {
    icon: Search,
    title: "Traffic Source Discovery",
    description: "Learn how visitors found your domain - direct, search, referral, or social. Optimize your marketing.",
    gradient: "from-cyan-500 to-blue-500",
    stats: "Full referrer data"
  },
  {
    icon: Code2,
    title: "Third-Party Integration",
    description: "Insert code from Google Analytics, Phantom, Seline, and other analytics providers of your choice.",
    gradient: "from-rose-500 to-red-500",
    stats: "Unlimited scripts"
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/5 to-transparent blur-3xl rounded-full -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-fuchsia-500/5 to-transparent blur-3xl rounded-full -translate-y-1/2" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div 
          className="bg-background text-center pt-8 pb-4 relative"
          style={{ 
            position: 'sticky', 
            top: '4rem', 
            zIndex: 40 
          }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-benefits-title">
            Stop Parking Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"> Profit Away</span>
          </h2>
          <div 
            className="absolute left-0 right-0 h-12 pointer-events-none"
            style={{
              bottom: 0,
              transform: 'translateY(100%)',
              background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)'
            }}
          />
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-8">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">cord.to</span> provides in-depth analytics so you can make data-driven decisions about your domain portfolio.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className="group p-6 border-white/5 bg-white/[0.02] hover-elevate transition-all duration-300"
              data-testid={`card-benefit-${index}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} p-[1px] mb-4`}>
                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-foreground" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {benefit.description}
              </p>
              
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${benefit.gradient} bg-opacity-10 border border-white/5`}>
                {benefit.title.includes("Uptime") && <TrendingUp className="w-3 h-3" />}
                {benefit.title.includes("Speed") && <Timer className="w-3 h-3" />}
                {benefit.title.includes("Geographic") && <MapPin className="w-3 h-3" />}
                {benefit.title.includes("Session") && <Clock className="w-3 h-3" />}
                {benefit.title.includes("Source") && <Search className="w-3 h-3" />}
                {benefit.title.includes("Integration") && <Code2 className="w-3 h-3" />}
                {benefit.stats}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
