import React, { useState } from 'react';
import { useDispatch } from '@/utils/hooks';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { createIssue } from '../features/thunks/issuesThunk';
import { LocationPicker } from '../components';

const CreateIssue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [issueData, setIssueData] = useState({
    title: '',
    description: '',
    location: {
      lat: 53.3498,
      lng: -6.2603,
    },
  });

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

    try {
      await dispatch(createIssue(issueData)).unwrap();
      navigate('/safety');
    } catch (error) {
      console.error('Error creating issue:', error);
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
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter issue title"
                    required
                    value={issueData.title}
                    onChange={handleInputChange}
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
                    placeholder="Enter issue description"
                    required
                    rows={4}
                    value={issueData.description}
                    onChange={handleInputChange}
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
                  <LocationPicker onLocationSelect={handleLocationSelect} />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 text-sm md:text-base 
                           bg-gradient-to-r from-blue-500 to-blue-600 
                           hover:from-blue-600 hover:to-blue-700 
                           text-white font-medium rounded-md 
                           shadow-sm transition-all duration-200"
                >
                  Create Issue
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CreateIssue;
