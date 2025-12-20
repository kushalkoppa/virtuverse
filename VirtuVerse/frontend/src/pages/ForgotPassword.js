import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      setMessage(response.data.message);
      
      // In development, show the token
      if (response.data.token) {
        setResetToken(response.data.token);
        setMessage('Password reset token generated. In production, this would be sent via email.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const tokenToUse = token || resetToken;
      await axios.post(`${API_URL}/auth/reset-password`, {
        token: tokenToUse,
        password
      });
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🌌 VirtuVerse</h1>
          <p>{token || resetToken ? 'Reset Your Password' : 'Forgot Password?'}</p>
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {!token && !resetToken ? (
          <form onSubmit={handleRequestReset}>
            <p style={{ color: '#666', marginBottom: '1.5rem', textAlign: 'center' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? <span className="loading-spinner"></span> : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <p style={{ color: '#666', marginBottom: '1.5rem', textAlign: 'center' }}>
              Enter your new password below.
            </p>

            {resetToken && (
              <div className="alert alert-info" style={{ marginBottom: '1rem' }}>
                <strong>Development Mode:</strong> Use this token: <code>{resetToken}</code>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? <span className="loading-spinner"></span> : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p>
            Remember your password? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
