import { updateProfile } from '@/features/thunks/userThunk';
import { useDispatch, useSelector } from '@/utils/hooks';
import { FormInput, SubmitBtn, ImageInput } from '@/components/form';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { useNewsStore } from '@/store/news';

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { uploadFile } = useNewsStore();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      let profileImage = user?.profileImage || '';

      const newProfileImage = formData.get('profileImage') as File;
      if (newProfileImage && newProfileImage.size > 0) {
        await uploadFile(newProfileImage);
        profileImage = useNewsStore.getState().image;
      }

      await dispatch(
        updateProfile({
          name,
          email,
          profileImage,
        }),
      ).unwrap();

      toast.success('Profile Updated Successfully', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md md:max-w-full">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 pb-4 sm:pb-6">
            <div className="flex-shrink-0">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl text-gray-500">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-grow text-center sm:text-left">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                Profile Information
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Update your profile information and email address
              </p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <FormInput
              type="text"
              label="Full Name"
              name="name"
              defaultValue={user?.name}
            />

            <FormInput
              type="email"
              label="Email Address"
              name="email"
              defaultValue={user?.email}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <ImageInput
                name="profileImage"
                labelText="Change Photo"
                isRequired={false}
              />
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                JPG, GIF or PNG. Max size of 2MB
              </p>
            </div>
          </div>

          <div className="pt-4 sm:pt-6 border-t border-gray-200">
            <SubmitBtn
              text="Save Changes"
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

export default UpdateProfile;
