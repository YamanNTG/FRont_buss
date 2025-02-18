import { useDispatch, useSelector } from '@/utils/hooks';
import { FormInput, SubmitBtn, ImageInput } from '@/components/form';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '@/features/thunks/userThunk';

const UpdateUserPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const oldPassword = formData.get('oldPassword') as string;
      const newPassword = formData.get('newPassword') as string;

      await dispatch(
        updatePassword({
          oldPassword,
          newPassword,
        }),
      ).unwrap();

      toast.success('Password Updated Successfully', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Failed to update password:', error);
      toast.error('Failed to update password. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md md:max-w-full">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
              Change Password
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Update your password below
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <FormInput
              type="password"
              label="Old Password"
              name="oldPassword"
            />

            <FormInput
              type="password"
              label="New Password"
              name="newPassword"
            />
          </div>

          <div className="pt-4 sm:pt-6 border-t border-gray-200">
            <SubmitBtn
              text="Update Password"
              className="w-full bg-primary hover:bg-primary/90 text-white 
                     py-2 sm:py-2.5 md:py-3 rounded-lg font-medium 
                     text-sm sm:text-base transition-colors"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateUserPassword;
