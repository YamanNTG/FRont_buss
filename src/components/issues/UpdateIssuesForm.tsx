import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '@/utils/hooks';
import { updateIssue } from '@/features/thunks/issuesThunk';
import { Card, CardContent } from '@/components/ui/card';
import { SubmitBtn } from '@/components/form';
import { useNavigate } from 'react-router-dom';
import LocationPicker from '../issues/LocationPicker';
import { toast } from 'react-toastify';

interface UpdateIssueFormProps {
  issueId: string;
  onSuccess?: () => void;
}

const UpdateIssueForm = ({ issueId, onSuccess }: UpdateIssueFormProps) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/issues/' + issueId);
    }
  }, [user, issueId, navigate]);

  if (user?.role !== 'admin') {
    return null;
  }

  const dispatch = useDispatch();
  const { singleIssue, isLoading } = useSelector((state) => state.issues);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: {
      lat: 53.3498,
      lng: -6.2603,
    },
  });

  useEffect(() => {
    if (singleIssue) {
      setFormData({
        title: singleIssue.title,
        description: singleIssue.description,
        location: {
          lat: singleIssue.location.lat,
          lng: singleIssue.location.lng,
        },
      });
    }
  }, [singleIssue]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setFormData((prev) => ({
      ...prev,
      location,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const issueData = {
        title: formData.title,
        description: formData.description,
        location: {
          lat: formData.location.lat,
          lng: formData.location.lng,
        },
      };

      await dispatch(
        updateIssue({
          issueId,
          issueData,
        }),
      ).unwrap();

      toast.success('Issue Updated Successfully', {
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
      console.error('Failed to update issue:', error);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-2xl sm:text-3xl font-bold text-center">
              Update Issue
            </h4>
            <p className="text-muted-foreground text-sm md:text-base text-center">
              Update the details below to modify this issue
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter issue title"
                required
                className="w-full p-3 rounded-md border border-gray-300 
                         shadow-sm focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition-colors
                         text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter issue description"
                required
                rows={4}
                className="w-full p-3 rounded-md border border-gray-300 
                         shadow-sm focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition-colors
                         text-sm md:text-base resize-y min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Issue Location
              </label>
              <LocationPicker
                onLocationSelect={handleLocationSelect}
                initialLocation={{
                  lat: formData.location.lat,
                  lng: formData.location.lng,
                }}
              />
            </div>
          </div>

          <div className="pt-4">
            <SubmitBtn
              text="Update Issue"
              className="w-full py-3 text-sm md:text-base 
                       bg-gradient-to-r from-blue-500 to-blue-600 
                       hover:from-blue-600 hover:to-blue-700 
                       text-white font-medium rounded-md 
                       shadow-sm transition-all duration-200"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateIssueForm;
