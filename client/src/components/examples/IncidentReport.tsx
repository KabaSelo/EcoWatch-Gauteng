import IncidentReport from '../IncidentReport';

export default function IncidentReportExample() {
  return <IncidentReport onSubmit={(report) => console.log('Report submitted:', report)} />;
}