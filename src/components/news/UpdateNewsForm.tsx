import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SubmitBtn } from '@/components/form';
import ImageInput from '@/components/form/ImageInput';
import { useNavigate } from 'react-router-dom';
import { useNewsActions, useSingleNews } from '@/hooks/useNews';
import { useSingleUser } from '@/hooks/useUser';

interface UpdateNewsFormProps {
  newsId: string;
  onSuccess?: () => void;
}

const UpdateNewsForm = ({ newsId, onSuccess }: UpdateNewsFormProps) => {
  const { user } = useSingleUser();
  const navigate = useNavigate();
  const { uploadFile, updateNews } = useNewsActions();
  const { singleNews } = useSingleNews();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/news/' + newsId);
    }
  }, [user, newsId, navigate]);

  if (user?.role !== 'admin') {
    return null;
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (singleNews) {
      setFormData({
        title: singleNews.title,
        description: singleNews.description,
      });
    }
  }, [singleNews]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      let newsData: {
        title: string;
        description: string;
        image?: string;
      } = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
      };

      const image = formData.get('image') as File;
      if (image && image.size > 0) {
        const response = await uploadFile(image);
        newsData['image'] = response.image;
      } else {
        newsData['image'] = singleNews?.image || '';
      }

      await updateNews(newsId, newsData);

      onSuccess?.();
    } catch (error) {
      console.error('Failed to update news:', error);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-2xl sm:text-3xl font-bold text-center">
              Update News Article
            </h4>
            <p className="text-muted-foreground text-sm md:text-base text-center">
              Update the details below to modify this article
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
                placeholder="Enter article title"
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
                placeholder="Enter article description"
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
                Article Image (Optional)
              </label>
              <ImageInput
                isRequired={false}
                name="image"
                labelText="Upload New Image"
              />
              {singleNews?.image && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">Current Image:</p>
                  <img
                    src={singleNews.image}
                    alt="Current"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
              <p className="text-xs text-gray-500">
                Optional: Upload a new image or leave empty to keep the current
                one
              </p>
            </div>
          </div>

          <div className="pt-4">
            <SubmitBtn
              text="Update Article"
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

export default UpdateNewsForm;
