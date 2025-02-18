import { UpdateUser, UpdateUserPassword } from '@/components';

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="w-full flex justify-center">
          <UpdateUser />
        </div>
        <div className="w-full flex justify-center">
          <UpdateUserPassword />
        </div>
      </div>
    </div>
  );
};

export default Profile;
