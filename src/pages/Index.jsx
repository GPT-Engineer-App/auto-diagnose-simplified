import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import { DirectionsCar, Person, Build } from '@mui/icons-material';

const Index = () => {
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
                <TextField fullWidth label="Username" variant="outlined" margin="normal" />
                <Button variant="contained" color="primary" fullWidth>
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
                  {[1, 2, 3].map((vehicle) => (
                    <Grid item xs={12} sm={6} md={4} key={vehicle}>
                      <Card>
                        <CardContent>
                          <Typography variant="subtitle1">Vehicle {vehicle}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Year, Make, Model
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
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
                />
                <Button variant="contained" color="primary">
                  Diagnose
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
