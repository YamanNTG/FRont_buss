import UserCard from '../user/UserCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLoadUsers, useUserList } from '@/hooks/useUser';

const ShowAllUsers = () => {
  const { users, isLoading } = useUserList();
  useLoadUsers();

  // Group users by role
  const admins = users.filter((user) => user.role === 'admin');
  const moderators = users.filter((user) => user.role === 'moderator');
  const drivers = users.filter((user) => user.role === 'driver');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-8 pb-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700">Admins</h3>
            <p className="text-2xl font-bold text-blue-900">{admins.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-700">Moderators</h3>
            <p className="text-2xl font-bold text-purple-900">
              {moderators.length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700">Drivers</h3>
            <p className="text-2xl font-bold text-green-900">
              {drivers.length}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="drivers" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="admins">Admins</TabsTrigger>
          <TabsTrigger value="moderators">Moderators</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
        </TabsList>

        <TabsContent value="admins">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {admins.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="moderators">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moderators.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <div className="flex justify-between items-center">
            <input
              type="search"
              placeholder="Search drivers..."
              className="px-4 py-2 border rounded-lg"
            />
            {/* Placeholder for future pagination */}
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm text-gray-600 border rounded-lg">
                Previous
              </button>
              <button className="px-4 py-2 text-sm text-gray-600 border rounded-lg">
                Next
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShowAllUsers;
