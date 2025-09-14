import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection
      onReportClick={() => console.log('Report clicked')}
      onGuidesClick={() => console.log('Guides clicked')}
      onRightsClick={() => console.log('Rights clicked')}
    />
  );
}