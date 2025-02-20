import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput, SubmitBtn } from '@/components/form';
import { useDispatch, useSelector } from '@/utils/hooks';
import { forgotPassword } from '@/features/thunks/authThunk';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, success, msg } = useSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userEmail = formData.get('email') as string;

    try {
      const response = await dispatch(forgotPassword(userEmail)).unwrap();

      console.log(response);
    } catch (error) {
      console.error('Forgot Password failed:', error);
    }
  };

  if (success) {
    return (
      <section className="h-screen grid place-items-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center space-y-4">
            <h4 className="text-2xl font-bold">{msg}</h4>

            <p className="text-sm text-gray-500">
              An email has been sent to you with instructions.
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
            <h4 className="text-2xl sm:text-3xl font-bold">Forgot Password</h4>

            <FormInput type="email" label="email" name="email" />

            <SubmitBtn
              text={isLoading ? 'Loading...' : 'Get Reset Password Link'}
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

export default ForgotPassword;
