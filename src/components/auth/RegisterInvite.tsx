import { Card, CardContent } from '@/components/ui/card';
import { InviteUserData } from '@/types/auth';
import { toast } from 'react-toastify';
import { useAuthActions, useAuthUser } from '@/hooks/useAuth';

const RegisterInvite = () => {
  const { isLoading } = useAuthUser();
  const { inviteUser } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(e.currentTarget);
    const inviteData = Object.fromEntries(formData) as InviteUserData;

    try {
      await inviteUser(inviteData);
      toast.success('Invite Sent Successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      form.reset();
    } catch (error) {
      console.error('Failed to send invite:', error);
      toast.error(`${error}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] grid place-items-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h4 className="text-2xl sm:text-3xl font-bold">Send Invite</h4>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter recipient's name"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter recipient's email"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send Invite'}
            </button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterInvite;
