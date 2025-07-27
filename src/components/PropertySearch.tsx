import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, MapPin, Calendar, User, DollarSign, Hash, ArrowRight } from 'lucide-react';

interface Property {
  id: string;
  address: string;
  owner: string;
  area: number;
  propertyType: string;
  registrationDate: string;
  value: number;
  status: 'active' | 'pending' | 'transferred';
  coordinates: { lat: number; lng: number };
  documentHash: string;
}

interface PropertySearchProps {
  properties: Property[];
  onTransfer: (propertyId: string, newOwner: string) => void;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({ properties, onTransfer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [transferOwner, setTransferOwner] = useState('');

  const filteredProperties = properties.filter(property =>
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTransfer = () => {
    if (selectedProperty && transferOwner.trim()) {
      onTransfer(selectedProperty.id, transferOwner.trim());
      setTransferOwner('');
      setSelectedProperty(null);
    }
  };

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'transferred': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-retro-dark border-2 border-retro-terminal shadow-lg">
        <CardHeader className="border-b border-retro-terminal">
          <CardTitle className="flex items-center space-x-2 font-retro text-retro-terminal text-xl tracking-wider">
            <Search className="h-5 w-5" />
            <span>PROPERTY_SEARCH.EXE</span>
          </CardTitle>
          <CardDescription className="font-terminal text-retro-phosphor">
            &gt; Search database by address, owner_name, or property_id
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="search" className="font-terminal text-retro-terminal">SEARCH_QUERY:</Label>
              <Input
                id="search"
                placeholder="> Enter search parameters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1 bg-retro-dark border-retro-terminal text-retro-terminal font-terminal placeholder:text-retro-matrix"
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" size="icon" className="border-retro-terminal text-retro-terminal hover:bg-retro-terminal hover:text-retro-dark">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="bg-retro-dark border-2 border-retro-terminal hover:border-retro-phosphor transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-retro-terminal/5 to-transparent group-hover:from-retro-terminal/10"></div>
            <CardHeader className="pb-3 relative z-10 border-b border-retro-terminal/50">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-terminal text-retro-terminal">{property.address}</CardTitle>
                <Badge className="bg-retro-matrix text-retro-dark font-terminal border border-retro-terminal">
                  {property.status.toUpperCase()}
                </Badge>
              </div>
              <CardDescription className="flex items-center space-x-1 font-terminal text-retro-phosphor">
                <Hash className="h-3 w-3" />
                <span className="text-xs">{property.id}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-retro-phosphor" />
                  <span className="font-terminal text-retro-terminal">{property.owner}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-retro-phosphor" />
                  <span className="font-terminal text-retro-terminal">{property.area} sq ft</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-retro-phosphor" />
                  <span className="font-terminal text-retro-terminal">${property.value.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-retro-phosphor" />
                  <span className="font-terminal text-retro-terminal">{property.registrationDate}</span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-retro-terminal/50">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full border-retro-terminal text-retro-terminal hover:bg-retro-terminal hover:text-retro-dark font-terminal"
                      onClick={() => setSelectedProperty(property)}
                    >
                      Transfer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md bg-retro-dark border-2 border-retro-terminal">
                    <DialogHeader>
                      <DialogTitle className="font-retro text-retro-terminal tracking-wider">PROPERTY_RECORD.LOG</DialogTitle>
                      <DialogDescription className="font-terminal text-retro-phosphor">
                        &gt; Blockchain record for {property.address}
                      </DialogDescription>
                    </DialogHeader>
                    
                    {selectedProperty && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <Label className="text-muted-foreground">Property ID</Label>
                            <p className="font-mono text-xs break-all">{selectedProperty.id}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Document Hash</Label>
                            <p className="font-mono text-xs break-all">{selectedProperty.documentHash}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Type</Label>
                            <p>{selectedProperty.propertyType}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Status</Label>
                            <Badge className={getStatusColor(selectedProperty.status)}>
                              {selectedProperty.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <Label htmlFor="transfer-owner">Transfer Ownership</Label>
                          <div className="flex space-x-2 mt-2">
                            <Input
                              id="transfer-owner"
                              placeholder="New owner name..."
                              value={transferOwner}
                              onChange={(e) => setTransferOwner(e.target.value)}
                            />
                            <Button 
                              onClick={handleTransfer}
                              disabled={!transferOwner.trim()}
                              size="sm"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            This will initiate a blockchain transaction
                          </p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && searchTerm && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
            <p className="text-muted-foreground">
              No properties match your search criteria. Try a different search term.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};