// client/src/tests/integration/Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/Login';
import { authService } from '../../services/api';

// Mock the API service
jest.mock('../../services/api');
// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Integration', () => {
  it('submits the form and redirects on success', async () => {
    // 1. Setup Mock API response
    authService.login.mockResolvedValue({
      data: { token: 'fake-token', user: { name: 'Test User' } }
    });

    // 2. Render Component
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // 3. Simulate User Input
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // 4. Click Submit
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // 5. Assertions
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/'); // Expect redirect to home
    });
  });

  it('displays error message on failure', async () => {
    // Setup Mock API failure
    authService.login.mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } }
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check if error appears
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});