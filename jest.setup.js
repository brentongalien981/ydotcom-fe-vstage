const { AuthProvider, useAuth } = require('./src/tests/__mocks__/AuthContext'); // Import your mocked AuthProvider

// Set up the mock for AuthContext globally
// jest.mock('./src/context/AuthContext', () => ({
//   AuthProvider,
//   useAuth
// }));