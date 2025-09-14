import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Scale, Globe, Flag, FileText } from 'lucide-react';

const southAfricanLaws = [
  {
    id: 'nema',
    title: 'National Environmental Management Act (NEMA)',
    summary: 'The primary environmental law providing principles for environmental governance',
    details: 'NEMA provides for cooperative environmental governance, environmental impact assessments, and the right to a clean and healthy environment. It establishes the legal framework for environmental protection and sustainable development.',
    keyPoints: [
      'Right to an environment not harmful to health or well-being',
      'Environmental impact assessment requirements',
      'Duty of care towards the environment',
      'Polluter pays principle'
    ]
  },
  {
    id: 'constitution',
    title: 'Constitutional Environmental Rights (Section 24)',
    summary: 'Fundamental right to a healthy environment enshrined in the Constitution',
    details: 'Section 24 of the South African Constitution grants everyone the right to an environment that is not harmful to their health or well-being, and to have the environment protected for the benefit of present and future generations.',
    keyPoints: [
      'Right to an environment not harmful to health',
      'Sustainable development and use of natural resources',
      'Protection for present and future generations',
      'Reasonable legislative measures for protection'
    ]
  },
  {
    id: 'nwa',
    title: 'National Water Act',
    summary: 'Protection of water resources and water quality standards',
    details: 'Ensures sustainable use of water resources, protection of water quality, and equitable access to water. Establishes water use licensing and pollution prevention measures.',
    keyPoints: [
      'Water resource protection',
      'Water use licensing requirements',
      'Pollution prevention and remediation',
      'Sustainable water resource management'
    ]
  },
  {
    id: 'nemwa',
    title: 'National Environmental Management: Waste Act',
    summary: 'Comprehensive waste management and pollution prevention',
    details: 'Regulates waste management activities, promotes waste minimization, and addresses pollution prevention. Establishes licensing requirements for waste activities.',
    keyPoints: [
      'Waste management hierarchy',
      'Extended producer responsibility',
      'Waste facility licensing',
      'Illegal dumping prevention'
    ]
  },
  {
    id: 'nemaa',
    title: 'National Environmental Management: Air Quality Act',
    summary: 'Air quality standards and emission controls',
    details: 'Establishes national ambient air quality standards, controls atmospheric emissions, and provides for air quality monitoring and management.',
    keyPoints: [
      'National ambient air quality standards',
      'Atmospheric emission licensing',
      'Air quality monitoring requirements',
      'Priority area declarations'
    ]
  }
];

const internationalLaws = [
  {
    id: 'stockholm',
    title: 'Stockholm Declaration (1972)',
    summary: 'First major international declaration on environmental rights',
    details: 'Principle 1 states that humans have a fundamental right to freedom, equality and adequate conditions of life, in an environment of quality that permits a life of dignity and well-being.',
    relevance: 'Foundation for environmental law and policy worldwide'
  },
  {
    id: 'rio',
    title: 'Rio Declaration on Environment and Development',
    summary: 'Sustainable development principles and environmental protection',
    details: 'Establishes 27 principles for sustainable development, including the precautionary principle, polluter pays principle, and the right to development.',
    relevance: 'Guides international environmental policy and national legislation'
  },
  {
    id: 'aarhus',
    title: 'Aarhus Convention',
    summary: 'Access to environmental information and public participation',
    details: 'Grants rights regarding access to environmental information, public participation in environmental decision-making, and access to justice in environmental matters.',
    relevance: 'Model for transparent environmental governance'
  },
  {
    id: 'paris',
    title: 'Paris Agreement on Climate Change',
    summary: 'Global commitment to combat climate change',
    details: 'International treaty to limit global warming to well below 2°C above pre-industrial levels, with efforts to limit increase to 1.5°C.',
    relevance: 'South Africa committed to reducing greenhouse gas emissions'
  }
];

export default function EnvironmentalRights() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 font-['Poppins']" data-testid="text-rights-title">
            Environmental Rights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-rights-description">
            Know your environmental rights under South African and international law. 
            Understanding these rights empowers you to protect the environment.
          </p>
        </div>

        {/* South African Laws */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-3">
                <Flag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl" data-testid="text-sa-laws-title">
                  South African Environmental Laws
                </CardTitle>
                <p className="text-muted-foreground">Your rights and protections under national legislation</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {southAfricanLaws.map((law) => (
                <AccordionItem key={law.id} value={law.id}>
                  <AccordionTrigger className="text-left" data-testid={`button-expand-${law.id}`}>
                    <div>
                      <div className="font-semibold">{law.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{law.summary}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 space-y-4">
                      <p className="text-muted-foreground" data-testid={`text-law-details-${law.id}`}>
                        {law.details}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-card-foreground">Key Provisions:</h4>
                        <ul className="space-y-2">
                          {law.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2" data-testid={`text-key-point-${law.id}-${index}`}>
                              <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* International Laws */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-chart-3/10 rounded-lg p-3">
                <Globe className="w-6 h-6 text-chart-3" />
              </div>
              <div>
                <CardTitle className="text-2xl" data-testid="text-international-laws-title">
                  International Environmental Laws
                </CardTitle>
                <p className="text-muted-foreground">Global frameworks that influence South African policy</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-6">
              {internationalLaws.map((law) => (
                <Card key={law.id} className="hover-elevate" data-testid={`card-international-${law.id}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-chart-3 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2" data-testid={`text-international-title-${law.id}`}>
                          {law.title}
                        </h3>
                        <p className="text-muted-foreground mb-3" data-testid={`text-international-summary-${law.id}`}>
                          {law.summary}
                        </p>
                        <p className="text-sm mb-3" data-testid={`text-international-details-${law.id}`}>
                          {law.details}
                        </p>
                        <Badge variant="secondary" data-testid={`badge-relevance-${law.id}`}>
                          {law.relevance}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <h3 className="text-xl font-semibold text-primary mb-3">Need Legal Help?</h3>
          <p className="text-muted-foreground mb-4">
            If you believe your environmental rights have been violated, you can:
          </p>
          <ul className="text-sm space-y-2 max-w-md mx-auto">
            <li>• Contact the Department of Environment, Forestry and Fisheries</li>
            <li>• Report to your local municipality</li>
            <li>• Seek assistance from environmental law organizations</li>
            <li>• Use EcoWatch Gauteng to report incidents</li>
          </ul>
        </div>
      </div>
    </div>
  );
}