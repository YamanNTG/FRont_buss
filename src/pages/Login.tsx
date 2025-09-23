import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { FormInput, SubmitBtn } from '@/components/form';
import { LoginPayload } from '@/types/auth';
import { toast } from 'react-toastify';
import { userUserActions } from '@/hooks/useUser';
import { useAuthActions, useAuthUser } from '@/hooks/useAuth';
import { loginSchema } from '@/utils/schemas';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading } = useAuthUser();
  const { showCurrentUser } = userUserActions();
  const { loginUser } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as LoginPayload;

    try {
      const credentials = loginSchema.safeParse(data);

      if (!credentials.success) {
        const firstError = credentials.error.errors[0];
        toast.error(firstError.message);
        return;
      }

      const userData = await loginUser(credentials.data);

      if (!userData) {
        toast.error('Invalid Credentials', {
          autoClose: 5000,
        });
        return; // Don't navigate if user doesn't exist
      }

      if (!userData.isVerified) {
        toast.error(
          'Please verify your email. Check your inbox for verification link.',
          {
            autoClose: 5000,
          },
        );
        return; // Don't navigate if user not verified
      }

      await showCurrentUser();
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
      console.log(error, 'errorrrrr');

      toast.error(error || 'Login failed');
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
