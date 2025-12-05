import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Plug, ArrowRight, Check } from "lucide-react";
import { SiGoogle } from "react-icons/si";

const integrations = [
  {
    name: "Google Analytics",
    description: "Connect your GA4 property for advanced tracking and reporting",
    icon: SiGoogle,
    color: "from-blue-500 to-blue-600",
    features: ["Event tracking", "Conversion goals", "Audience insights"]
  },
  {
    name: "Phantom",
    description: "Advanced visitor fingerprinting and behavior analysis",
    icon: Code2,
    color: "from-violet-500 to-purple-600",
    features: ["Session replay", "Heatmaps", "Funnel analysis"]
  },
  {
    name: "Seline",
    description: "Privacy-focused analytics with GDPR compliance",
    icon: Code2,
    color: "from-emerald-500 to-teal-600",
    features: ["Cookie-less tracking", "EU hosting", "Real-time data"]
  }
];

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-fuchsia-950/10 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div 
          className="bg-background text-center pt-8 pb-6 relative"
          style={{ 
            position: 'sticky', 
            top: '4rem', 
            zIndex: 40 
          }}
        >
          <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
            <Plug className="w-3 h-3 mr-1" /> Integrations
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-integrations-title">
            Your Favorite Tools,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"> Connected</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insert code from Google Analytics, Phantom, Seline, and other third-party providers. 
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">cord.to</span> gives you full control.
          </p>
          <div 
            className="absolute left-0 right-0 h-12 pointer-events-none"
            style={{
              bottom: 0,
              transform: 'translateY(100%)',
              background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)'
            }}
          />
        </div>
        <div className="mt-8"></div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <Card 
              key={integration.name}
              className="group p-6 border-white/5 bg-white/[0.02] hover-elevate transition-all duration-300"
              data-testid={`card-integration-${index}`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${integration.color} p-[1px] mb-5`}>
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                  <integration.icon className="w-6 h-6" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{integration.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {integration.description}
              </p>
              
              <ul className="space-y-2">
                {integration.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        
        <Card className="p-8 border-white/5 bg-gradient-to-r from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-2">Custom Script Support</h3>
              <p className="text-muted-foreground max-w-xl">
                Need something else? <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">cord.to</span> supports any JavaScript snippet. Add custom tracking, 
                chat widgets, or any other third-party code to your domain landers.
              </p>
            </div>
            <div className="flex items-center gap-2 text-violet-400">
              <Code2 className="w-5 h-5" />
              <span className="font-medium">Full code access</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
