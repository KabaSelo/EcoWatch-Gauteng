import { Card, CardContent } from '@/components/ui/card';
import { TreePine, Users, Shield, BarChart3 } from 'lucide-react';

interface StatsSectionProps {
  incidentCount: number;
  guidesCount: number;
}

export default function StatsSection({ incidentCount, guidesCount }: StatsSectionProps) {
  return (
    <div className="bg-card py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-card-foreground mb-4 font-['Poppins']" data-testid="text-stats-title">
            Making a Difference Together
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-stats-description">
            Real-time impact of our environmental monitoring community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center hover-elevate" data-testid="card-stat-incidents">
            <CardContent className="pt-6">
              <div className="bg-primary/10 rounded-full p-3 inline-block mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-2" data-testid="text-incident-count">
                {incidentCount}
              </div>
              <p className="text-muted-foreground">Incidents Reported</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover-elevate" data-testid="card-stat-guides">
            <CardContent className="pt-6">
              <div className="bg-accent/10 rounded-full p-3 inline-block mb-4">
                <TreePine className="w-8 h-8 text-accent-foreground" />
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-2" data-testid="text-guides-count">
                {guidesCount}
              </div>
              <p className="text-muted-foreground">Environmental Guides</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover-elevate" data-testid="card-stat-coverage">
            <CardContent className="pt-6">
              <div className="bg-chart-3/10 rounded-full p-3 inline-block mb-4">
                <Shield className="w-8 h-8 text-chart-3" />
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-2" data-testid="text-coverage-areas">
                15
              </div>
              <p className="text-muted-foreground">Areas Monitored</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover-elevate" data-testid="card-stat-community">
            <CardContent className="pt-6">
              <div className="bg-chart-2/10 rounded-full p-3 inline-block mb-4">
                <Users className="w-8 h-8 text-chart-2" />
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-2" data-testid="text-community-size">
                24/7
              </div>
              <p className="text-muted-foreground">Always Available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}