import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, TextField, Button, Snackbar } from '@mui/material';
import { DirectionsCar, Person, Build } from '@mui/icons-material';

const Index = () => {
  const [username, setUsername] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({ year: '', make: '', model: '' });
  const [diagnosticSymptoms, setDiagnosticSymptoms] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCreateProfile = () => {
    if (username) {
      setSnackbarMessage(`Profile created for ${username}`);
      setSnackbarOpen(true);
    }
  };

  const handleAddVehicle = () => {
    if (newVehicle.year && newVehicle.make && newVehicle.model) {
      setVehicles([...vehicles, newVehicle]);
      setNewVehicle({ year: '', make: '', model: '' });
      setSnackbarMessage('Vehicle added to garage');
      setSnackbarOpen(true);
    }
  };

  const handleDiagnose = () => {
    if (diagnosticSymptoms) {
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
          <Typography variant="h6">Auto Vision Pro</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  <Person /> User Profile
                </Typography>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCreateProfile}
                >
                  Create Profile
                </Button>
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
                  {vehicles.map((vehicle, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card>
                        <CardContent>
                          <Typography variant="subtitle1">Vehicle {index + 1}</Typography>
                          <Typography variant="body2" color="text.secondary">
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
