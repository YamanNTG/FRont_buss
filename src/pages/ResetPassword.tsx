import { FormInput, SubmitBtn } from '@/components/form';
import { toast } from 'react-toastify';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthActions, useAuthUser } from '@/hooks/useAuth';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const { isLoading, success, msg } = useAuthUser();
  const { resetPassword } = useAuthActions();

  const passwordToken = query.get('token');
  const email = query.get('email');

  useEffect(() => {
    if (!passwordToken || !email) {
      navigate('/login');
      return;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;

    if (!passwordToken || !email) {
      toast.error('Invalid reset password link');
      navigate('/login');
      return;
    }

    try {
      await resetPassword({ passwordToken, email, password });
    } catch (error) {
      toast.error(
        'Invalid link, use link provided in your email to reset password',
        {
          autoClose: 5000,
        },
      );
      navigate('/login');
    }
  };

  if (!passwordToken || !email) {
    return null;
  }
  if (success) {
    return (
      <section className="h-screen grid place-items-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center space-y-4">
            <h4 className="text-2xl font-bold">{msg}</h4>
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
            <h4 className="text-2xl sm:text-3xl font-bold">Reset Password</h4>

            <FormInput type="password" label="password" name="password" />

            <SubmitBtn
              text={isLoading ? 'Loading...' : 'Reset Password'}
              disabled={isLoading}
            />
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetPassword;
