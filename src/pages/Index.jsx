import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, TextField, Button, Snackbar } from '@mui/material';
import { DirectionsCar, Person, Build } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { auth, db } from '../main';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const Index = () => {
  const [user, setUser] = useState(null);
  const [newVehicle, setNewVehicle] = useState({ year: '', make: '', model: '' });
  const [diagnosticSymptoms, setDiagnosticSymptoms] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

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
      setSnackbarMessage('Vehicle added to garage');
      setSnackbarOpen(true);
      setNewVehicle({ year: '', make: '', model: '' });
    },
  });

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSnackbarMessage('Signed in successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error signing in:', error);
      setSnackbarMessage('Error signing in');
      setSnackbarOpen(true);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSnackbarMessage('Signed out successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error signing out:', error);
      setSnackbarMessage('Error signing out');
      setSnackbarOpen(true);
    }
  };

  const handleAddVehicle = () => {
    if (newVehicle.year && newVehicle.make && newVehicle.model) {
      addVehicleMutation.mutate(newVehicle);
    }
  };

  const handleDiagnose = () => {
    if (diagnosticSymptoms) {
      // TODO: Implement diagnostic logic with Firebase Cloud Functions
      setSnackbarMessage('Diagnostic request submitted');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Auto Vision Pro</Typography>
          {user ? (
            <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
          ) : (
            <Button color="inherit" onClick={handleSignIn}>Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {user ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    <Person /> User Profile
                  </Typography>
                  <Typography>
                    Welcome, {user.displayName || user.email}!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  <DirectionsCar /> My Garage
                </Typography>
                <Grid container spacing={2}>
                  {vehicles && vehicles.map((vehicle) => (
                    <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="subtitle1">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Year"
                      variant="outlined"
                      value={newVehicle.year}
                      onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Make"
                      variant="outlined"
                      value={newVehicle.make}
                      onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Model"
                      variant="outlined"
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleAddVehicle}
                >
                  Add Vehicle
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  <Build /> Diagnostics
                </Typography>
                <TextField
                  fullWidth
                  label="Enter symptoms or DTCs"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  value={diagnosticSymptoms}
                  onChange={(e) => setDiagnosticSymptoms(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDiagnose}
                >
                  Diagnose
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5" sx={{ mt: 4, textAlign: 'center' }}>
          Please sign in to access Auto Vision Pro features.
        </Typography>
      )}
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Index;
