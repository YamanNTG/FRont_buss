import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/utils/formatDate';

const UserCard = ({ user }: any) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xl text-gray-500">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Last active: {formatDate(user.lastActive)}
        </p>
      </div>
    </CardContent>
  </Card>
);
export default UserCard;
