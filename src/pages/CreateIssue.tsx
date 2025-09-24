import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LocationPicker } from '../components';
import { toast } from 'react-toastify';
import { createIssuesSchema } from '@/utils/schemas';
import { z } from 'zod';
import { useIssuesActions } from '@/hooks/useIssues';
import { IssueData } from '@/types/issues';
import { SubmitBtn } from '@/components/form';

const DEFAULT_LOCATION = {
  lat: 53.3498,
  lng: -6.2603,
};

const CreateIssue = () => {
  const navigate = useNavigate();
  const { createIssue } = useIssuesActions();
  const [issueData, setIssueData] = useState<IssueData>({
    title: '',
    description: '',
    location: DEFAULT_LOCATION,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setIssueData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setIssueData((prev) => ({
      ...prev,
      location,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const validatedIssueData = createIssuesSchema.parse({
        title: issueData.title,
        description: issueData.description,
        location: issueData.location,
      });

      await createIssue(validatedIssueData);

      toast.success('Issue created!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsLoading(false);
      setTimeout(() => {
        navigate('/safety');
      }, 3000);
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
                <h4 className="text-2xl sm:text-3xl font-bold text-center">
                  Create Issue
                </h4>
                <p className="text-muted-foreground text-sm md:text-base text-center">
                  Fill in the details of the issue
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
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter issue title"
                    required
                    value={issueData.title}
                    onChange={handleInputChange}
                    className="w-full text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter issue description"
                    required
                    rows={4}
                    value={issueData.description}
                    onChange={handleInputChange}
                    className="w-full text-sm md:text-base resize-y min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Issue Location
                  </label>
                  <div className="rounded-md overflow-hidden border border-gray-300">
                    <LocationPicker
                      onLocationSelect={handleLocationSelect}
                      initialLocation={issueData.location}
                      isPinDraggable={true}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <SubmitBtn
                  disabled={isLoading}
                  isLoading={isLoading}
                  text="Create Issue"
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

export default CreateIssue;
