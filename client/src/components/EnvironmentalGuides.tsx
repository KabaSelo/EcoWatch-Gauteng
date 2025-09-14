import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, FileText, Clock } from 'lucide-react';

// todo: remove mock functionality - replace with real guide data
const environmentalGuides = [
  {
    id: 1,
    title: 'Water Conservation at Home',
    description: 'Learn practical ways to save water and reduce your household consumption.',
    duration: '8 min',
    type: 'video',
    difficulty: 'Beginner',
    category: 'Water'
  },
  {
    id: 2,
    title: 'Waste Separation and Recycling',
    description: 'Master the art of proper waste sorting for maximum recycling impact.',
    duration: '12 min',
    type: 'video',
    difficulty: 'Beginner',
    category: 'Waste'
  },
  {
    id: 3,
    title: 'Energy-Efficient Living',
    description: 'Reduce your carbon footprint with smart energy consumption habits.',
    duration: '15 min',
    type: 'video',
    difficulty: 'Intermediate',
    category: 'Energy'
  },
  {
    id: 4,
    title: 'Urban Gardening for Beginners',
    description: 'Start your own sustainable garden in small spaces.',
    duration: '20 min',
    type: 'video',
    difficulty: 'Beginner',
    category: 'Gardening'
  },
  {
    id: 5,
    title: 'Air Quality Monitoring',
    description: 'Understand and improve air quality in your community.',
    duration: '10 min',
    type: 'article',
    difficulty: 'Intermediate',
    category: 'Air Quality'
  },
  {
    id: 6,
    title: 'Wildlife Protection Guidelines',
    description: 'How to report and prevent harm to local wildlife.',
    duration: '14 min',
    type: 'video',
    difficulty: 'Intermediate',
    category: 'Wildlife'
  },
  {
    id: 7,
    title: 'Sustainable Transportation',
    description: 'Eco-friendly commuting options for Gauteng residents.',
    duration: '11 min',
    type: 'video',
    difficulty: 'Beginner',
    category: 'Transport'
  },
  {
    id: 8,
    title: 'Chemical Spill Safety',
    description: 'Emergency response procedures for chemical hazards.',
    duration: '18 min',
    type: 'video',
    difficulty: 'Advanced',
    category: 'Safety'
  },
  {
    id: 9,
    title: 'Community Environmental Action',
    description: 'Organize your neighborhood for environmental initiatives.',
    duration: '16 min',
    type: 'article',
    difficulty: 'Intermediate',
    category: 'Community'
  },
  {
    id: 10,
    title: 'Illegal Dumping Prevention',
    description: 'Recognize and report illegal dumping in your area.',
    duration: '9 min',
    type: 'video',
    difficulty: 'Beginner',
    category: 'Waste'
  },
  {
    id: 11,
    title: 'Water Quality Testing',
    description: 'DIY methods to test water quality and contamination.',
    duration: '22 min',
    type: 'video',
    difficulty: 'Advanced',
    category: 'Water'
  },
  {
    id: 12,
    title: 'Green Building Practices',
    description: 'Sustainable construction and renovation techniques.',
    duration: '25 min',
    type: 'article',
    difficulty: 'Advanced',
    category: 'Building'
  },
  {
    id: 13,
    title: 'Environmental Impact Assessment',
    description: 'How to evaluate the environmental impact of projects.',
    duration: '19 min',
    type: 'video',
    difficulty: 'Advanced',
    category: 'Assessment'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Intermediate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function EnvironmentalGuides() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 font-['Poppins']" data-testid="text-guides-title">
            Environmental Guides
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-guides-description">
            Learn how to make a positive environmental impact with our comprehensive guides and tutorials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {environmentalGuides.map((guide) => (
            <Card key={guide.id} className="hover-elevate transition-all duration-200" data-testid={`card-guide-${guide.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="bg-primary/10 rounded-lg p-3">
                    {guide.type === 'video' ? (
                      <Play className="w-6 h-6 text-primary" />
                    ) : (
                      <FileText className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <Badge className={getDifficultyColor(guide.difficulty)} data-testid={`badge-difficulty-${guide.id}`}>
                    {guide.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg" data-testid={`text-guide-title-${guide.id}`}>
                  {guide.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4" data-testid={`text-guide-description-${guide.id}`}>
                  {guide.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span data-testid={`text-guide-duration-${guide.id}`}>{guide.duration}</span>
                  </div>
                  <Badge variant="secondary" data-testid={`badge-category-${guide.id}`}>
                    {guide.category}
                  </Badge>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => console.log(`Opening guide: ${guide.title}`)}
                  data-testid={`button-open-guide-${guide.id}`}
                >
                  {guide.type === 'video' ? 'Watch Guide' : 'Read Guide'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All guides are available offline after first access
          </p>
          <Button variant="outline" size="lg" data-testid="button-download-all">
            Download All Guides for Offline Use
          </Button>
        </div>
      </div>
    </div>
  );
}