import Landing from '../Landing';

export default function LandingExample() {
  return <Landing onNavigate={(page) => console.log('Navigate to:', page)} incidentCount={45} />;
}