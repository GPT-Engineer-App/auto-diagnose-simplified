import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { auth, db } from '../main';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Car, User, Wrench, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const [user, setUser] = useState(null);
  const [newVehicle, setNewVehicle] = useState({ year: '', make: '', model: '' });
  const [diagnosticSymptoms, setDiagnosticSymptoms] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (message, type = "default") => {
    toast({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      description: message,
      variant: type === "error" ? "destructive" : "default",
    });
  };

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles', user?.uid],
    queryFn: async () => {
      if (!user) return [];
      const q = query(collection(db, 'vehicles'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    enabled: !!user,
  });

  const addVehicleMutation = useMutation({
    mutationFn: async (newVehicle) => {
      const docRef = await addDoc(collection(db, 'vehicles'), {
        ...newVehicle,
        userId: user.uid,
      });
      return { id: docRef.id, ...newVehicle };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['vehicles', user?.uid]);
      showToast('Vehicle added to garage');
      setNewVehicle({ year: '', make: '', model: '' });
    },
    onError: (error) => {
      showToast('Error adding vehicle: ' + error.message, 'error');
    },
  });

  const deleteVehicleMutation = useMutation({
    mutationFn: async (vehicleId) => {
      await deleteDoc(doc(db, 'vehicles', vehicleId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['vehicles', user?.uid]);
      showToast('Vehicle removed from garage');
    },
    onError: (error) => {
      showToast('Error removing vehicle: ' + error.message, 'error');
    },
  });

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      showToast('Signed in successfully');
    } catch (error) {
      console.error('Error signing in:', error);
      showToast('Error signing in: ' + error.message, 'error');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      showToast('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      showToast('Error signing out: ' + error.message, 'error');
    }
  };

  const handleAddVehicle = () => {
    if (newVehicle.year && newVehicle.make && newVehicle.model) {
      addVehicleMutation.mutate(newVehicle);
    } else {
      showToast('Please fill in all vehicle details', 'error');
    }
  };

  const handleDeleteVehicle = (vehicleId) => {
    deleteVehicleMutation.mutate(vehicleId);
  };

  const handleDiagnose = () => {
    if (diagnosticSymptoms) {
      // TODO: Implement diagnostic logic with Firebase Cloud Functions
      showToast('Diagnostic request submitted');
    } else {
      showToast('Please enter symptoms or DTCs', 'error');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Auto Vision Pro</h1>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.photoURL} alt={user.displayName} />
                    <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                </div>
              ) : (
                <Button onClick={handleSignIn}>
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <User className="mr-2" /> User Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">Welcome, {user.displayName || user.email}!</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Car className="mr-2" /> My Garage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {vehicles && vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <p className="font-semibold text-gray-800">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="destructive" onClick={() => handleDeleteVehicle(vehicle.id)}>Remove</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={newVehicle.year}
                      onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="make">Make</Label>
                    <Input
                      id="make"
                      value={newVehicle.make}
                      onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700" onClick={handleAddVehicle}>Add Vehicle</Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-3 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Wrench className="mr-2" /> Diagnostics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="symptoms">Enter symptoms or DTCs</Label>
                <Textarea
                  id="symptoms"
                  value={diagnosticSymptoms}
                  onChange={(e) => setDiagnosticSymptoms(e.target.value)}
                  rows={3}
                  className="mt-1"
                />
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={handleDiagnose}>Diagnose</Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Alert>
            <AlertTitle className="text-xl font-bold text-blue-600">Welcome to Auto Vision Pro</AlertTitle>
            <AlertDescription className="mt-2 text-gray-600">
              Please sign in to access Auto Vision Pro features and start managing your vehicles.
            </AlertDescription>
          </Alert>
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default Index;
