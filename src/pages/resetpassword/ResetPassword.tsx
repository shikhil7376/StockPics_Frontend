import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword,resetPasswordRequest,verifyOTP } from '../../api/user';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 1: Request OTP, 2: Verify OTP
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    setLoading(true);
    try {
      const response = await resetPasswordRequest(email);
      if (response?.data.success) {
        toast.success('OTP sent to your email!');
        setStep(2); // Move to OTP verification step
      } else {
        toast.error('Error sending OTP. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const response = await verifyOTP(email, otp);
      if (response?.data.success) {
        if (newPassword !== confirmPassword) {
          toast.error("Passwords don't match!");
        } else if (newPassword.length < 6) {
          toast.error('Password should be at least 6 characters.');
        } else {
          const resetResponse = await resetPassword(email, newPassword);
          if (resetResponse?.data.success) {
            toast.success('Password reset successful!');
            navigate('/login');
          }
        }
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-[95%] sm:w-full max-w-md">
        {step === 1 ? (
          <div>
            <h1 className="text-3xl font-semibold mb-8 text-left">Reset Password</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleEmailSubmit(); }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-400 text-white font-semibold shadow-lg text-small px-6 py-2 rounded-full"
                  disabled={loading}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-semibold mb-8 text-left">Verify OTP</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleOtpSubmit(); }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 font-semibold" htmlFor="otp">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter OTP"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 font-semibold" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 font-semibold" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-400 text-white font-semibold shadow-lg text-small px-6 py-2 rounded-full"
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
