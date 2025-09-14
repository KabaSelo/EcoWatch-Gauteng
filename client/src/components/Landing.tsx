import { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';

interface LandingProps {
  onNavigate: (page: 'report' | 'guides' | 'rights' | 'analytics') => void;
  incidentCount?: number;
}

export default function Landing({ onNavigate, incidentCount = 0 }: LandingProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection
        onReportClick={() => onNavigate('report')}
        onGuidesClick={() => onNavigate('guides')}
        onRightsClick={() => onNavigate('rights')}
      />
      <StatsSection incidentCount={incidentCount} guidesCount={13} />
    </div>
  );
}