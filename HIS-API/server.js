const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const testGroupRoutes = require('./src/routes/testGroupRoutes');
const testRoutes = require('./src/routes/testRoutes');
const testPackageRoutes = require('./src/routes/testPackageRoutes');
const patientRoutes = require('./src/routes/patientRoutes');
const patientCaseRoutes = require('./src/routes/patientCaseRoutes');
const billingRoutes = require('./src/routes/billingRoutes');

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/testgroups', testGroupRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/testpackages', testPackageRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/patientcases', patientCaseRoutes);
app.use('/api/billing', billingRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Hospital Information System API' });
});

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 