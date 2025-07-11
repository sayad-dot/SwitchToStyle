import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  location: yup.string().required('Location is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

type FormData = yup.InferType<typeof schema>;

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, {
        name: data.name,
        phone: data.phone,
        location: data.location,
      });
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFBC7] via-[#ECEDB0] to-[#FEFBC7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/sts.jpg" alt="Switch To Style" className="h-16 w-16 rounded-full shadow-lg border-4 border-white" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-[#722323]">
          Join Switch To Style
        </h2>
        <p className="mt-2 text-center text-sm text-[#722323]/70">
          Create your account or{' '}
          <Link
            to="/login"
            className="font-medium text-[#722323] hover:text-[#722323]/80 underline decoration-2 underline-offset-2"
          >
            sign in to existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/90 backdrop-blur-sm py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#722323]">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  {...register('name')}
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-3 border border-[#ECEDB0] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#722323] focus:border-transparent bg-white/80 transition-all duration-200"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#722323]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-3 border border-[#ECEDB0] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#722323] focus:border-transparent bg-white/80 transition-all duration-200"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#722323]">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  {...register('phone')}
                  type="tel"
                  autoComplete="tel"
                  className="appearance-none block w-full px-3 py-3 border border-[#ECEDB0] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#722323] focus:border-transparent bg-white/80 transition-all duration-200"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-[#722323]">
                Location
              </label>
              <div className="mt-1">
                <input
                  {...register('location')}
                  type="text"
                  autoComplete="address"
                  className="appearance-none block w-full px-3 py-3 border border-[#ECEDB0] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#722323] focus:border-transparent bg-white/80 transition-all duration-200"
                  placeholder="Enter your location"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#722323]">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-3 border border-[#ECEDB0] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#722323] focus:border-transparent pr-10 bg-white/80 transition-all duration-200"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#722323]/60 hover:text-[#722323]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#722323]/60 hover:text-[#722323]" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#722323]">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-3 border border-[#ECEDB0] rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#722323] focus:border-transparent pr-10 bg-white/80 transition-all duration-200"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-[#722323]/60 hover:text-[#722323]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#722323]/60 hover:text-[#722323]" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#722323] hover:bg-[#722323]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#722323] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;