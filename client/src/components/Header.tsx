import { Leaf, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full p-2">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary font-['Poppins']" data-testid="text-app-title">
                EcoWatch Gauteng
              </h1>
              <p className="text-sm text-muted-foreground">Environmental Reporting</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span data-testid="text-phone-number">0638051811</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span data-testid="text-email">ecowatchgauteng@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}