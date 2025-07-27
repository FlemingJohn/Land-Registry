import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Home, FileText, Users, Clock } from 'lucide-react';
import { PropertySearch } from './PropertySearch';
import { PropertyRegistration } from './PropertyRegistration';
import { TransactionHistory } from './TransactionHistory';
import { useToast } from '@/hooks/use-toast';

// Mock blockchain data structure
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

interface Transaction {
  id: string;
  propertyId: string;
  fromOwner: string;
  toOwner: string;
  timestamp: string;
  value: number;
  status: 'completed' | 'pending' | 'failed';
  blockHash: string;
}

// Mock data
const mockProperties: Property[] = [];

const mockTransactions: Transaction[] = [];

export const LandRegistry = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [activeTab, setActiveTab] = useState('search');
  const { toast } = useToast();

  const handlePropertyRegistration = (newProperty: Omit<Property, 'id' | 'registrationDate' | 'status' | 'documentHash'>) => {
    const property: Property = {
      ...newProperty,
      id: `0x${Math.random().toString(16).substr(2, 8)}`,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      documentHash: `0x${Math.random().toString(16).substr(2, 16)}...`
    };
    
    setProperties(prev => [...prev, property]);
    
    // Simulate blockchain confirmation
    setTimeout(() => {
      setProperties(prev => 
        prev.map(p => p.id === property.id ? { ...p, status: 'active' as const } : p)
      );
      toast({
        title: "Property Registered",
        description: `Property at ${property.address} has been successfully registered on the blockchain.`,
      });
    }, 3000);

    toast({
      title: "Registration Submitted",
      description: "Your property registration is being processed on the blockchain...",
    });
  };

  const handlePropertyTransfer = (propertyId: string, newOwner: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    const transaction: Transaction = {
      id: `tx_${Math.random().toString(16).substr(2, 6)}`,
      propertyId,
      fromOwner: property.owner,
      toOwner: newOwner,
      timestamp: new Date().toISOString(),
      value: property.value,
      status: 'pending',
      blockHash: `0xblock${Math.random().toString(16).substr(2, 8)}...`
    };

    setTransactions(prev => [...prev, transaction]);
    
    // Simulate blockchain confirmation
    setTimeout(() => {
      setProperties(prev => 
        prev.map(p => p.id === propertyId ? { ...p, owner: newOwner } : p)
      );
      setTransactions(prev => 
        prev.map(t => t.id === transaction.id ? { ...t, status: 'completed' as const } : t)
      );
      toast({
        title: "Transfer Completed",
        description: `Property ownership has been successfully transferred to ${newOwner}.`,
      });
    }, 4000);

    toast({
      title: "Transfer Initiated",
      description: "Property transfer is being processed on the blockchain...",
    });
  };

  return (
    <div className="min-h-screen bg-background font-terminal relative overflow-hidden">
      {/* Retro scanning line effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-retro-terminal to-transparent animate-retro-scan opacity-20"></div>
      </div>
      
      {/* Header */}
      <header className="border-b-2 border-retro-terminal bg-card shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-retro-matrix/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-retro-terminal rounded border-2 border-retro-terminal animate-phosphor-glow">
                <Home className="h-8 w-8 text-retro-dark" />
              </div>
              <div>
                <h1 className="text-3xl font-retro font-bold text-retro-terminal tracking-wider">
                  LAND_REGISTRY.EXE
                </h1>
                <p className="text-sm text-retro-phosphor font-terminal animate-terminal-blink">
                  &gt; BLOCKCHAIN PROPERTY MANAGEMENT SYSTEM_
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-retro-matrix text-retro-dark font-terminal border-2 border-retro-terminal">
                NET_STATUS: ONLINE
              </Badge>
              <Badge className="bg-retro-terminal text-retro-dark font-terminal border-2 border-retro-terminal">
                BLOCK: #1,234,567
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-retro-dark border-2 border-retro-terminal">
            <TabsTrigger value="search" className="flex items-center space-x-2 font-terminal text-retro-terminal data-[state=active]:bg-retro-terminal data-[state=active]:text-retro-dark">
              <Search className="h-4 w-4" />
              <span>SEARCH</span>
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center space-x-2 font-terminal text-retro-terminal data-[state=active]:bg-retro-terminal data-[state=active]:text-retro-dark">
              <Plus className="h-4 w-4" />
              <span>REGISTER</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center space-x-2 font-terminal text-retro-terminal data-[state=active]:bg-retro-terminal data-[state=active]:text-retro-dark">
              <Clock className="h-4 w-4" />
              <span>LOGS</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2 font-terminal text-retro-terminal data-[state=active]:bg-retro-terminal data-[state=active]:text-retro-dark">
              <FileText className="h-4 w-4" />
              <span>STATS</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <PropertySearch 
              properties={properties} 
              onTransfer={handlePropertyTransfer}
            />
          </TabsContent>

          <TabsContent value="register">
            <PropertyRegistration onRegister={handlePropertyRegistration} />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory transactions={transactions} />
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-retro-dark border-2 border-retro-terminal shadow-lg">
              <CardHeader className="border-b border-retro-terminal">
                <CardTitle className="font-retro text-retro-terminal text-xl tracking-wider">
                  SYSTEM_ANALYTICS.LOG
                </CardTitle>
                <CardDescription className="font-terminal text-retro-phosphor">
                  &gt; Overview of blockchain network activity
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-retro-matrix/20 border border-retro-terminal rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-retro-terminal/10 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="text-4xl font-retro font-bold text-retro-terminal animate-phosphor-glow">
                        {properties.length}
                      </div>
                      <div className="text-sm text-retro-phosphor font-terminal mt-2">TOTAL_PROPERTIES</div>
                    </div>
                  </div>
                  <div className="text-center p-6 bg-retro-matrix/20 border border-retro-terminal rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-retro-terminal/10 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="text-4xl font-retro font-bold text-retro-terminal animate-phosphor-glow">
                        {transactions.length}
                      </div>
                      <div className="text-sm text-retro-phosphor font-terminal mt-2">TOTAL_TRANSACTIONS</div>
                    </div>
                  </div>
                  <div className="text-center p-6 bg-retro-matrix/20 border border-retro-terminal rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-retro-terminal/10 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-retro font-bold text-retro-terminal animate-phosphor-glow">
                        ${properties.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-retro-phosphor font-terminal mt-2">TOTAL_VALUE</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};