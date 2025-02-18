import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FormInput, SubmitBtn } from '@/components/form';
import { useDispatch, useSelector } from '@/utils/hooks';
import { RegisterUserData } from '@/types/auth';
import { registerUser, verifyRegisterToken } from '@/features/thunks/authThunk';

import { toast } from 'react-toastify';
import { useEffect } from 'react';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const { isLoading, success } = useSelector((state) => state.auth);
  const inviteToken = query.get('token');
  const email = query.get('email') as string;

  const verifyToken = async () => {
    if (!inviteToken || !email) {
      navigate('/login');
      return;
    }
    try {
      await dispatch(verifyRegisterToken({ inviteToken, email })).unwrap();
    } catch (error) {
      toast.error('Use the link provided in your email to register', {
        autoClose: 5000,
      });
      navigate('/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData) as RegisterUserData;

    try {
      await dispatch(registerUser(userData));
      toast.success('Registered Successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error('Use the link provided in your email to register', {
        autoClose: 5000,
      });
      navigate('/login');
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  if (success) {
    return (
      <section className="h-screen grid place-items-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center space-y-4">
            <h4 className="text-2xl font-bold">Registration Successful!</h4>
            <p className="text-gray-600">
              Please check your email to verify your account.
            </p>
            <p className="text-sm text-gray-500">
              An email has been sent with verification instructions.
            </p>
            <Link
              to="/login"
              className="text-primary hover:underline block mt-4"
            >
              Back to Login
            </Link>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] grid place-items-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h4 className="text-2xl sm:text-3xl font-bold">Register</h4>

            <FormInput type="text" label="username" name="name" />

            <FormInput
              type="email"
              label="email"
              name="email"
              defaultValue={email}
              readOnly={true}
            />

            <FormInput type="password" label="password" name="password" />
            <p className="text-xs text-gray-500">
              Password must contain at least one uppercase letter, one lowercase
              letter, and one number
            </p>

            <SubmitBtn
              text={isLoading ? 'Loading...' : 'Register'}
              disabled={isLoading}
            />

            <p className="text-sm">
              Already a member?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:underline capitalize"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Register;
