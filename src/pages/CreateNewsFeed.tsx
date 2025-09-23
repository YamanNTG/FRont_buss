import { SubmitBtn } from '@/components/form';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import ImageInput from '../components/form/ImageInput';
import { useEffect } from 'react';
import { createNewsSchema } from '@/utils/schemas';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useNewsActions } from '@/hooks/useNews';
import { useSingleUser } from '@/hooks/useUser';
const CreateNewsFeed = () => {
  const navigate = useNavigate();
  const { user } = useSingleUser();
  const { uploadFile, createNews } = useNewsActions();

  const checkRole = () => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
  };

  useEffect(() => {
    checkRole();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      // Get the base news data first

      let newsInitialData: {
        title: string;
        description: string;
        image?: string;
      } = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
      };

      // Check if an image was provided

      const image = formData.get('image') as File;
      if (image && image.size > 0) {
        // Only upload and add image if one was provided
        const response = await uploadFile(image);
        newsInitialData['image'] = response.image;
      }

      const newsData = createNewsSchema.parse(newsInitialData);

      // Create the news with or without image

      await createNews(newsData);
      toast.success('News article created!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate('/');
      }, 1600);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Combine all error messages
        const errorMessages = error.errors.map((err) => err.message).join(', ');

        toast.error(errorMessages, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Handle other types of errors
        toast.error('An unexpected error occurred');
        console.error('Operation failed:', error);
      }
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-2xl sm:text-3xl font-bold text-center ">
                  Create News Article
                </h4>
                <p className="text-muted-foreground text-sm md:text-base text-center ">
                  Fill in the details below to create a new article
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
                    labelText="Upload Image"
                  />
                  <p className="text-xs text-gray-500">
                    Optional: Add an image to your article
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <SubmitBtn
                  text="Create Article"
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
      </div>
    </section>
  );
};

export default CreateNewsFeed;
