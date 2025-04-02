# Hospital Information System API

A RESTful API for a Hospital Information System built with Node.js, Express, and MySQL.

## Features

- User Management
- Doctor Management
- Patient Management
- Test Group and Test Management
- Test Package Management
- Patient Case Management
- Billing Management

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd HIS-API
```

2. Install dependencies:

```bash
npm install
```

3. Create a MySQL database:

```sql
CREATE DATABASE HIS;
```

4. Import the database schema using the SQL file provided.

5. Configure the environment variables by editing the `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=HIS
```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server using nodemon, which will automatically restart when file changes are detected.

### Production Mode

```bash
npm start
```

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Test Groups

- `GET /api/testgroups` - Get all test groups
- `GET /api/testgroups/:id` - Get test group by ID
- `POST /api/testgroups` - Create new test group
- `PUT /api/testgroups/:id` - Update test group
- `DELETE /api/testgroups/:id` - Delete test group

### Tests

- `GET /api/tests` - Get all tests
- `GET /api/tests/:id` - Get test by ID
- `GET /api/tests/group/:groupId` - Get tests by group ID
- `POST /api/tests` - Create new test
- `PUT /api/tests/:id` - Update test
- `DELETE /api/tests/:id` - Delete test

### Test Packages

- `GET /api/testpackages` - Get all test packages
- `GET /api/testpackages/:id` - Get test package by ID
- `GET /api/testpackages/:id/tests` - Get tests in a package
- `POST /api/testpackages` - Create new test package
- `PUT /api/testpackages/:id` - Update test package
- `DELETE /api/testpackages/:id` - Delete test package

### Patients

- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `GET /api/patients/search?search=term` - Search patients by name
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Patient Cases

- `GET /api/patientcases` - Get all patient cases
- `GET /api/patientcases/:id` - Get patient case by ID
- `GET /api/patientcases/patient/:patientId` - Get cases by patient ID
- `GET /api/patientcases/doctor/:doctorId` - Get cases by doctor ID
- `POST /api/patientcases` - Create new patient case
- `PUT /api/patientcases/:id` - Update patient case
- `DELETE /api/patientcases/:id` - Delete patient case

### Billing

- `GET /api/billing` - Get all billings
- `GET /api/billing/:id` - Get billing by ID
- `GET /api/billing/patient/:patientId` - Get billings by patient ID
- `POST /api/billing` - Create new billing
- `PUT /api/billing/:id` - Update billing
- `DELETE /api/billing/:id` - Delete billing 

## Sample Usage

### GET all Users:

```
const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("http://127.0.0.1:3000/api/users", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

### CREATE new record:

```
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "username": "abby",
  "password": "pass2",
  "email": "abby@mail.net"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://127.0.0.1:3000/api/users", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  ```
  
### GET single record:

```
const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("http://127.0.0.1:3000/api/users/2", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

### UPDATE record:

```
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "username": "abby",
  "password": "pass3",
  "email": "abby@mail.net"
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://127.0.0.1:3000/api/users/2", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```