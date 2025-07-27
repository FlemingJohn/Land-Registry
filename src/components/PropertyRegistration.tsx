import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Home, FileText, DollarSign, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PropertyRegistrationData {
  address: string;
  owner: string;
  area: number;
  propertyType: string;
  value: number;
  coordinates: { lat: number; lng: number };
}

interface PropertyRegistrationProps {
  onRegister: (property: PropertyRegistrationData) => void;
}

export const PropertyRegistration: React.FC<PropertyRegistrationProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<PropertyRegistrationData>({
    address: '',
    owner: '',
    area: 0,
    propertyType: '',
    value: 0,
    coordinates: { lat: 0, lng: 0 }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof PropertyRegistrationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCoordinateChange = (field: 'lat' | 'lng', value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [field]: numValue
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.address || !formData.owner || !formData.propertyType || formData.area <= 0 || formData.value <= 0) {
      toast({
        title: "Invalid Form",
        description: "Please fill in all required fields with valid values.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onRegister(formData);
      
      // Reset form
      setFormData({
        address: '',
        owner: '',
        area: 0,
        propertyType: '',
        value: 0,
        coordinates: { lat: 0, lng: 0 }
      });
      
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-retro-dark border-2 border-retro-terminal shadow-lg">
        <CardHeader className="border-b border-retro-terminal">
          <CardTitle className="flex items-center space-x-2 font-retro text-retro-terminal text-xl tracking-wider">
            <Plus className="h-5 w-5" />
            <span>REGISTER_PROPERTY.EXE</span>
          </CardTitle>
          <CardDescription className="font-terminal text-retro-phosphor">
            &gt; Add new property to blockchain registry with cryptographic verification
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="address" className="flex items-center space-x-2 font-terminal text-retro-terminal">
                  <Home className="h-4 w-4" />
                  <span>PROPERTY_ADDRESS *</span>
                </Label>
                <Input
                  id="address"
                  placeholder="> 123 Main Street, City, State"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-1 bg-retro-dark border-retro-terminal text-retro-terminal font-terminal placeholder:text-retro-matrix"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="owner">Property Owner *</Label>
                  <Input
                    id="owner"
                    placeholder="John Doe"
                    value={formData.owner}
                    onChange={(e) => handleInputChange('owner', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="agricultural">Agricultural</SelectItem>
                      <SelectItem value="recreational">Recreational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="area" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Area (sq ft) *</span>
                  </Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="2500"
                    value={formData.area || ''}
                    onChange={(e) => handleInputChange('area', parseInt(e.target.value) || 0)}
                    className="mt-1"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="value" className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Property Value ($) *</span>
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="450000"
                    value={formData.value || ''}
                    onChange={(e) => handleInputChange('value', parseInt(e.target.value) || 0)}
                    className="mt-1"
                    required
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Coordinates */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Geographic Coordinates</Label>
                <p className="text-sm text-muted-foreground">
                  GPS coordinates for precise property location on the blockchain
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    placeholder="40.7128"
                    value={formData.coordinates.lat || ''}
                    onChange={(e) => handleCoordinateChange('lat', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    placeholder="-74.0060"
                    value={formData.coordinates.lng || ''}
                    onChange={(e) => handleCoordinateChange('lng', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">Blockchain Registration</span>
              </div>
              <p className="text-xs text-muted-foreground">
                This property will be permanently recorded on the blockchain with cryptographic proof of ownership. 
                The registration process typically takes 3-5 minutes for network confirmation.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Processing Registration...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Register Property on Blockchain
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};