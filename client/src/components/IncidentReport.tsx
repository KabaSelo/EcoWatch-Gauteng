import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Camera, Upload, Wifi, WifiOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const hazardTypes = [
  { value: 'illegal-dumping', label: 'Illegal Dumping' },
  { value: 'animal-dumping', label: 'Animal Dumping' },
  { value: 'sewage-spill', label: 'Sewage Spill' },
  { value: 'illegal-electricity', label: 'Illegal Electricity Connections' },
  { value: 'chemical-spill', label: 'Chemical Spills' },
  { value: 'air-pollution', label: 'Air Pollution' },
  { value: 'noise-pollution', label: 'Noise Pollution' },
  { value: 'deforestation', label: 'Deforestation' },
  { value: 'water-contamination', label: 'Water Contamination' },
  { value: 'wildlife-poaching', label: 'Wildlife Poaching' },
  { value: 'other', label: 'Other Environmental Hazard' }
];

const knownPlaces = [
  { value: 'mall-eastgate', label: 'Eastgate Shopping Centre' },
  { value: 'mall-sandton', label: 'Sandton City Mall' },
  { value: 'clinic-bara', label: 'Chris Hani Baragwanath Hospital' },
  { value: 'clinic-charlotte', label: 'Charlotte Maxeke Hospital' },
  { value: 'rank-bree', label: 'Bree Street Taxi Rank' },
  { value: 'rank-noord', label: 'Noord Street Taxi Rank' },
  { value: 'school-wits', label: 'University of the Witwatersrand' },
  { value: 'school-uj', label: 'University of Johannesburg' },
  { value: 'other', label: 'Other Location' }
];

interface IncidentReportProps {
  onSubmit?: (report: any) => void;
}

export default function IncidentReport({ onSubmit }: IncidentReportProps) {
  const [hazardType, setHazardType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [knownPlace, setKnownPlace] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOnline] = useState(navigator.onLine);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 20MB. Large images will be automatically compressed.",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:image/...;base64, prefix
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let imageData = null;
      let imageName = null;
      
      // Convert image to base64 if present
      if (selectedFile) {
        imageData = await convertFileToBase64(selectedFile);
        imageName = selectedFile.name;
      }
      
      const reportData = {
        hazardType,
        description,
        location,
        knownPlace: knownPlace || null,
        contactInfo: contactInfo || null,
        imageData,
        imageName,
        status: 'pending' as const
      };
      
      if (!isOnline) {
        // Save to localStorage for offline submission later
        const offlineReports = JSON.parse(localStorage.getItem('offlineReports') || '[]');
        offlineReports.push({ ...reportData, timestamp: new Date().toISOString() });
        localStorage.setItem('offlineReports', JSON.stringify(offlineReports));
        
        toast({
          title: "Report Saved Offline",
          description: "Report saved locally. It will be sent when you're back online."
        });
      } else {
        // Submit to API
        const response = await apiRequest('POST', '/api/incidents', reportData);
        const result = await response.json();
        
        if (result.success) {
          toast({
            title: "Report Submitted Successfully",
            description: "Your environmental incident has been reported to relevant authorities."
          });
          
          // Call onSubmit callback if provided
          if (onSubmit) {
            onSubmit(result.incident);
          }
        } else {
          throw new Error(result.error || 'Failed to submit report');
        }
      }
      
      // Reset form
      setHazardType('');
      setDescription('');
      setLocation('');
      setKnownPlace('');
      setContactInfo('');
      setSelectedFile(null);
      
    } catch (error) {
      console.error('Error submitting incident:', error);
      toast({
        title: "Error Submitting Report",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-primary font-['Poppins']" data-testid="text-report-title">
                Report Environmental Incident
              </CardTitle>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <><Wifi className="w-4 h-4 text-green-500" /><span className="text-sm text-green-600">Online</span></>
                ) : (
                  <><WifiOff className="w-4 h-4 text-amber-500" /><span className="text-sm text-amber-600">Offline</span></>
                )}
              </div>
            </div>
            <p className="text-muted-foreground" data-testid="text-report-description">
              Help protect our environment by reporting hazards in your area. All reports are sent to relevant authorities.
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="hazard-type">Type of Environmental Hazard *</Label>
                <Select value={hazardType} onValueChange={setHazardType} required>
                  <SelectTrigger data-testid="select-hazard-type">
                    <SelectValue placeholder="Select hazard type" />
                  </SelectTrigger>
                  <SelectContent>
                    {hazardTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the environmental hazard in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                  required
                  data-testid="input-description"
                />
              </div>

              <div className="space-y-4">
                <Label>Location Information</Label>
                
                <div>
                  <Label htmlFor="known-place">Known Place (Optional)</Label>
                  <Select value={knownPlace} onValueChange={setKnownPlace}>
                    <SelectTrigger data-testid="select-known-place">
                      <SelectValue placeholder="Select a known place" />
                    </SelectTrigger>
                    <SelectContent>
                      {knownPlaces.map((place) => (
                        <SelectItem key={place.value} value={place.value}>{place.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Address or Location Description *</Label>
                  <Input
                    id="location"
                    placeholder="Enter street address or describe the location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    data-testid="input-location"
                  />
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Map Integration</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Interactive map for location pinning will be available soon. For now, please provide detailed address information above.
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="photo">Photo Evidence (Optional)</Label>
                <div className="mt-2">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    data-testid="input-photo"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground mt-2" data-testid="text-selected-file">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Max file size: 20MB. Large images will be automatically compressed.
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="contact">Contact Information (Optional)</Label>
                <Input
                  id="contact"
                  placeholder="Phone number or email for follow-up"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  data-testid="input-contact"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting} data-testid="button-submit-report">
                <Upload className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Submitting...' : (isOnline ? 'Submit Report' : 'Save Offline')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}