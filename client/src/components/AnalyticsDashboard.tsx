import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, AlertTriangle, MapPin, Calendar } from 'lucide-react';

// todo: remove mock functionality - replace with real analytics data
interface AnalyticsData {
  totalIncidents: number;
  incidentsByType: Array<{ type: string; count: number; color: string }>;
  recentIncidents: Array<{
    id: string;
    type: string;
    location: string;
    date: string;
    status: 'pending' | 'resolved' | 'investigating';
  }>;
  monthlyTrends: Array<{ month: string; incidents: number }>;
}

const mockAnalyticsData: AnalyticsData = {
  totalIncidents: 0, // This starts at 0 and will increase with actual reports
  incidentsByType: [
    { type: 'Illegal Dumping', count: 0, color: 'bg-chart-1' },
    { type: 'Water Contamination', count: 0, color: 'bg-chart-2' },
    { type: 'Air Pollution', count: 0, color: 'bg-chart-3' },
    { type: 'Sewage Spills', count: 0, color: 'bg-chart-4' },
    { type: 'Chemical Spills', count: 0, color: 'bg-chart-5' },
  ],
  recentIncidents: [], // This will be populated as users submit reports
  monthlyTrends: [
    { month: 'Jan', incidents: 0 },
    { month: 'Feb', incidents: 0 },
    { month: 'Mar', incidents: 0 },
    { month: 'Apr', incidents: 0 },
    { month: 'May', incidents: 0 },
    { month: 'Jun', incidents: 0 },
  ]
};

interface AnalyticsDashboardProps {
  analyticsData?: AnalyticsData;
}

export default function AnalyticsDashboard({ analyticsData = mockAnalyticsData }: AnalyticsDashboardProps) {
  const maxCount = Math.max(...analyticsData.incidentsByType.map(item => item.count), 1);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 font-['Poppins']" data-testid="text-analytics-title">
            Environmental Impact Analytics
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-analytics-description">
            Real-time data showing the environmental monitoring efforts across Gauteng Province.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-primary/10 rounded-full p-3 inline-block mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-2" data-testid="text-total-incidents">
                {analyticsData.totalIncidents}
              </div>
              <p className="text-muted-foreground">Total Incidents Reported</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-chart-2/10 rounded-full p-3 inline-block mb-4">
                <TrendingUp className="w-8 h-8 text-chart-2" />
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-2" data-testid="text-monthly-average">
                {analyticsData.totalIncidents > 0 ? Math.round(analyticsData.totalIncidents / 6) : 0}
              </div>
              <p className="text-muted-foreground">Monthly Average</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-chart-3/10 rounded-full p-3 inline-block mb-4">
                <AlertTriangle className="w-8 h-8 text-chart-3" />
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-2" data-testid="text-pending-reports">
                {analyticsData.recentIncidents.filter(i => i.status === 'pending').length}
              </div>
              <p className="text-muted-foreground">Pending Reports</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-chart-4/10 rounded-full p-3 inline-block mb-4">
                <MapPin className="w-8 h-8 text-chart-4" />
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-2" data-testid="text-areas-covered">
                15
              </div>
              <p className="text-muted-foreground">Areas Monitored</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Incidents by Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Incidents by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.totalIncidents === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No incidents reported yet</p>
                    <p className="text-sm">Data will appear as reports are submitted</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {analyticsData.incidentsByType.map((item, index) => (
                    <div key={index} className="space-y-2" data-testid={`chart-bar-${index}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.type}</span>
                        <span className="text-sm text-muted-foreground">{item.count}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${(item.count / maxCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.totalIncidents === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No trend data yet</p>
                    <p className="text-sm">Charts will show as data accumulates</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {analyticsData.monthlyTrends.map((month, index) => (
                    <div key={index} className="flex justify-between items-center py-2" data-testid={`trend-month-${index}`}>
                      <span className="text-sm font-medium">{month.month}</span>
                      <span className="text-sm text-muted-foreground">{month.incidents} incidents</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Environmental Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsData.recentIncidents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg mb-2">No incidents reported yet</p>
                  <p className="text-sm">
                    When users submit environmental incident reports, they will appear here with real-time status updates.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {analyticsData.recentIncidents.map((incident) => (
                  <div key={incident.id} className="border rounded-lg p-4" data-testid={`incident-${incident.id}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{incident.type}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        incident.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {incident.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">📍 {incident.location}</p>
                    <p className="text-xs text-muted-foreground">Reported: {incident.date}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Real-Time Data</h3>
          <p className="text-muted-foreground text-sm">
            All analytics are based on actual incident reports submitted by the community. 
            Data updates automatically as new reports are filed.
          </p>
        </div>
      </div>
    </div>
  );
}