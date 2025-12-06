import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

interface HeaderProps {
  onCtaClick?: () => void;
}

export default function Header({ onCtaClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-violet-500 flex items-center justify-center">
            <Link className="w-3 h-3 text-white" />
          </div>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-400" style={{ fontFamily: 'var(--font-title)', fontSize: '1.625rem', letterSpacing: '0.02em' }} data-testid="text-logo">cord.to</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-problem">
            The Problem
          </a>
          <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-benefits">
            Benefits
          </a>
          <a href="#integrations" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-integrations">
            Integrations
          </a>
        </nav>
        
        <Button 
          onClick={onCtaClick}
          className="hover-elevate active-elevate-2 min-h-9 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-title focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border-primary-border shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 border-0 text-white shadow-lg shadow-orange-500/30 sm:text-[10.4px] px-2 sm:px-3 py-0.5 gradient-outline font-black pt-[0px] pb-[0px] text-[14px]"
          data-testid="button-header-cta"
        >
          <span className="hidden sm:inline">TAKE CONTROL</span>
          <span className="sm:hidden">TAKE CONTROL</span>
        </Button>
      </div>
    </header>
  );
}
