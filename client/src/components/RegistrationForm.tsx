import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  User, 
  Mail, 
  Phone, 
  ArrowRight, 
  Sparkles,
  Shield,
  Zap
} from "lucide-react";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  const registerMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; phone: string }) => {
      const response = await apiRequest("POST", "/api/register", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Welcome to cord.to!",
        description: data.message || "Check your email for next steps.",
      });
      setName("");
      setEmail("");
      setPhone("");
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ name, email, phone });
  };

  return (
    <section id="register" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-950/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-3xl rounded-full" />
      
      <div className="relative z-10 max-w-xl mx-auto px-6">
        <div 
          className="bg-background text-center pt-8 pb-6 relative"
          style={{ 
            position: 'sticky', 
            top: '4rem', 
            zIndex: 40 
          }}
        >
          <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
            <Sparkles className="w-3 h-3 mr-1" /> Early Access
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-register-title">
            Ready to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"> Take Control?</span>
          </h2>
          <p className="text-muted-foreground">
            Join thousands of domain investors who are reclaiming their data.
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
        <div className="mt-2"></div>
        
        <Card className="p-8 border-white/10 bg-card/80 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 focus:border-violet-500/50 focus:ring-violet-500/20"
                  required
                  data-testid="input-name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 focus:border-violet-500/50 focus:ring-violet-500/20"
                  required
                  data-testid="input-email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 focus:border-violet-500/50 focus:ring-violet-500/20"
                  required
                  data-testid="input-phone"
                />
              </div>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 border-0 text-white shadow-xl shadow-violet-500/30 gradient-outline"
              disabled={registerMutation.isPending}
              data-testid="button-submit"
            >
              {registerMutation.isPending ? (
                "Processing..."
              ) : (
                <>
                  Take Control
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-violet-400" />
                Start tracking in minutes
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
