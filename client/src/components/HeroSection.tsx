import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QrCode } from 'lucide-react';
import backgroundImage from '@assets/generated_images/Gauteng_conservation_landscape_background_e1bf750a.png';

interface HeroSectionProps {
  onReportClick: () => void;
  onGuidesClick: () => void;
  onRightsClick: () => void;
}

export default function HeroSection({ onReportClick, onGuidesClick, onRightsClick }: HeroSectionProps) {
  return (
    <div 
      className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center text-white mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-['Poppins']" data-testid="text-hero-title">
            Environmental Warriors Unite
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" data-testid="text-hero-description">
            Join the fight to protect our environment. Report hazards, access conservation guides, and know your rights. 
            Together, we environmental warriors can make Gauteng greener and safer for future generations.
          </p>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={onReportClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[200px]"
              data-testid="button-report-incident"
            >
              Report an Incident
            </Button>
            <Button 
              size="lg" 
              onClick={onGuidesClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[200px]"
              data-testid="button-view-guides"
            >
              View Guides
            </Button>
            <Button 
              size="lg" 
              onClick={onRightsClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[200px]"
              data-testid="button-environmental-rights"
            >
              Environmental Rights
            </Button>
          </div>

          {/* QR Code Section */}
          <Card className="inline-block p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="flex flex-col items-center gap-3">
              <QrCode className="w-24 h-24 text-white" data-testid="img-qr-code" />
              <p className="text-sm text-white/90">Scan to access EcoWatch Gauteng</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}