import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Users, 
  Clock, 
  Activity,
  ArrowUpRight
} from "lucide-react";
import { FadingDescription } from "./FadingDescription";

export default function DashboardPreview() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-950/20 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div 
          className="bg-background text-center pt-3 pb-2 relative"
          style={{ 
            position: 'sticky', 
            top: '3rem', 
            zIndex: 40 
          }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-dashboard-title">
            Your Analytics,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"> Beautifully Visualized</span>
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
        <FadingDescription className="text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-8">
          A powerful dashboard that gives you complete visibility into your domain traffic.
        </FadingDescription>
        
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-2xl rounded-3xl" />
          
          <Card className="relative p-6 md:p-8 border-white/10 bg-card/80 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
              <div>
                <h3 className="text-xl font-semibold mb-1">Domain Overview</h3>
                <p className="text-sm text-muted-foreground">premium-domain.com</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <Activity className="w-3 h-3 mr-1" /> Online
                </Badge>
                <Badge variant="secondary">Last 30 days</Badge>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard 
                label="Total Visitors"
                value="12,847"
                change="+23.5%"
                trend="up"
                icon={Users}
              />
              <StatCard 
                label="Avg. Session"
                value="2m 34s"
                change="+8.2%"
                trend="up"
                icon={Clock}
              />
              <StatCard 
                label="Load Time"
                value="1.2s"
                change="-12.4%"
                trend="up"
                icon={Activity}
              />
              <StatCard 
                label="Countries"
                value="47"
                change="+5"
                trend="up"
                icon={Globe}
              />
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-4 border-white/5 bg-white/[0.02]">
                  <h4 className="text-sm font-medium mb-4">Traffic Over Time</h4>
                  <div className="h-48 flex items-end gap-1">
                    {[40, 65, 45, 80, 55, 95, 70, 85, 60, 90, 75, 100, 85, 70, 95, 80, 65, 88, 72, 82, 90, 78, 85, 92].map((height, i) => (
                      <div 
                        key={i}
                        className="flex-1 bg-gradient-to-t from-violet-500/40 to-violet-500/80 rounded-t-sm transition-all hover:from-violet-500/60 hover:to-violet-500"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Dec 1</span>
                    <span>Dec 15</span>
                    <span>Dec 30</span>
                  </div>
                </Card>
              </div>
              
              <Card className="p-4 border-white/5 bg-white/[0.02]">
                <h4 className="text-sm font-medium mb-4">Top Countries</h4>
                <div className="space-y-3">
                  <CountryRow country="United States" percentage={42} flag="US" />
                  <CountryRow country="United Kingdom" percentage={18} flag="GB" />
                  <CountryRow country="Germany" percentage={12} flag="DE" />
                  <CountryRow country="Canada" percentage={9} flag="CA" />
                  <CountryRow country="Australia" percentage={7} flag="AU" />
                </div>
              </Card>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <Card className="p-4 border-white/5 bg-white/[0.02]">
                <h4 className="text-sm font-medium mb-4">Traffic Sources</h4>
                <div className="space-y-3">
                  <SourceRow source="Direct" percentage={45} color="violet" />
                  <SourceRow source="Search Engines" percentage={28} color="fuchsia" />
                  <SourceRow source="Social Media" percentage={15} color="cyan" />
                  <SourceRow source="Referrals" percentage={12} color="amber" />
                </div>
              </Card>
              
              <Card className="p-4 border-white/5 bg-white/[0.02]">
                <h4 className="text-sm font-medium mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  <ActivityRow time="2 min ago" location="New York, US" action="Page View" />
                  <ActivityRow time="5 min ago" location="London, UK" action="Page View" />
                  <ActivityRow time="12 min ago" location="Berlin, DE" action="Make Offer Click" />
                  <ActivityRow time="18 min ago" location="Toronto, CA" action="Page View" />
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, change, trend, icon: Icon }: {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: typeof Users;
}) {
  return (
    <Card className="p-4 border-white/5 bg-white/[0.02]">
      <div className="flex items-start justify-between mb-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <div className={`flex items-center gap-1 text-xs ${trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </Card>
  );
}

function CountryRow({ country, percentage, flag }: { country: string; percentage: number; flag: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-4 rounded-sm bg-muted flex items-center justify-center text-[10px] font-bold">
        {flag}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm">{country}</span>
          <span className="text-xs text-muted-foreground">{percentage}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function SourceRow({ source, percentage, color }: { source: string; percentage: number; color: string }) {
  const colors: Record<string, string> = {
    violet: "from-violet-500 to-violet-400",
    fuchsia: "from-fuchsia-500 to-fuchsia-400",
    cyan: "from-cyan-500 to-cyan-400",
    amber: "from-amber-500 to-amber-400"
  };
  
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors[color]}`} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm">{source}</span>
          <span className="text-xs text-muted-foreground">{percentage}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ActivityRow({ time, location, action }: { time: string; location: string; action: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
        <ArrowUpRight className="w-4 h-4 text-violet-400" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{action}</p>
        <p className="text-xs text-muted-foreground">{location}</p>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  );
}
