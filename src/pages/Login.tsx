import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from '@/utils/hooks';
import { FormInput, SubmitBtn } from '@/components/form';
import { loginUser } from '@/features/thunks/authThunk';
import { LoginUserData } from '@/types/auth';
import { toast } from 'react-toastify';
import { showCurrentUser } from '@/features/thunks/userThunk';
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const credentials = Object.fromEntries(formData) as LoginUserData;

    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      if (!result.isVerified) {
        toast.error(
          'Please verify your email. Check your inbox for verification link.',
          {
            autoClose: 5000,
          },
        );
        return; // Don't navigate if not verified
      }
      await dispatch(showCurrentUser());
      toast.success('Logged in Successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate('/');
    } catch (error: any) {
      // Check specifically for verification error
      if (error === 'Please verify your email') {
        toast.error(
          'Please verify your email. Check your inbox for verification link.',
          {
            autoClose: 5000,
          },
        );
      } else {
        toast.error(error || 'Login failed');
      }
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] grid place-items-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h4 className="text-2xl sm:text-3xl font-bold">Login</h4>
            <FormInput type="email" label="email" name="email" />

            <FormInput type="password" label="password" name="password" />

            <SubmitBtn
              text={isLoading ? 'Loading...' : 'Login'}
              disabled={isLoading}
            />

            <p className="text-sm">
              Not a member yet?{' '}
              <Link
                to="/register"
                className="text-blue-600 hover:underline capitalize"
              >
                register
              </Link>
            </p>
            <p className="text-sm">
              Forgot your password?{' '}
              <Link
                to="/user/forgot-password"
                className="text-blue-600 hover:underline capitalize"
              >
                Reset Password
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;
