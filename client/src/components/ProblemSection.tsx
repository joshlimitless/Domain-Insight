import { Lock, Eye, EyeOff, AlertTriangle, X, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const marketplaces = [
  "Afternic",
  "GoDaddy",
  "Spaceship",
  "Dynadot",
  "Sedo",
  "ParkingCrew"
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-950/10 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-problem-title">
            Lost in the Marketplace
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"> Black Hole?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            When you list on marketplaces or use parking services, you lose visibility into your traffic data.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="p-6 border-red-500/20 bg-red-500/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <Lock className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    DNS Lock-In Problem
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Most marketplaces require you to point your DNS to their servers. This means you 
                    <strong className="text-foreground"> cannot install tracking scripts</strong>, 
                    add Google Analytics, or use any third-party analytics tools. Your traffic data 
                    becomes completely invisible to you.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border-amber-500/20 bg-amber-500/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <EyeOff className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Limited or No Analytics</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Even when marketplaces provide analytics, they're often basic hit counters with 
                    delayed data. You don't know <strong className="text-foreground">where visitors come from</strong>, 
                    how long they stay, or what devices they use.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border-violet-500/20 bg-violet-500/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Eye className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Your Data, Their Control</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Being listed on a marketplace doesn't mean you have to sacrifice transparency. 
                    <strong className="text-foreground"> You have the right to your own data</strong>. 
                    Understanding your traffic is crucial for pricing domains correctly and making informed decisions.
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="relative">
            <Card className="p-8 border-white/10">
              <h4 className="text-sm font-medium text-muted-foreground mb-6">Affected Platforms</h4>
              <div className="grid grid-cols-2 gap-4">
                {marketplaces.map((name, i) => (
                  <div 
                    key={name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                    data-testid={`marketplace-${i}`}
                  >
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold">
                      {name.slice(0, 2)}
                    </div>
                    <span className="text-sm">{name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <p className="text-muted-foreground font-medium">Without cord.to</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-red-400">
                        <X className="w-4 h-4" /> No real-time data
                      </div>
                      <div className="flex items-center gap-2 text-red-400">
                        <X className="w-4 h-4" /> No geographic info
                      </div>
                      <div className="flex items-center gap-2 text-red-400">
                        <X className="w-4 h-4" /> No custom tracking
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-muted-foreground font-medium">With cord.to</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Check className="w-4 h-4" /> Real-time analytics
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Check className="w-4 h-4" /> Country & city data
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Check className="w-4 h-4" /> Third-party code
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
