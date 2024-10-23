
import { Edit3, ChefHat, Stars, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';


const ComingSoon = () => {
  const { theme } = useTheme();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle email submission logic here
  // };

  const handleBack = () => {
    // Handle navigation back to recipe
    window.history.back();
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-gray-950 to-gray-900'
        : 'bg-gradient-to-b from-orange-50 to-white'
    }`}>
      {/* Back Button */}
      
      <div className="w-full max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Recipe
        </Button>
      </div>

      <Card className="w-full max-w-3xl border-none shadow-lg dark:bg-gray-900">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Edit3 className="h-16 w-16 text-orange-500" />
                <ChefHat className="h-8 w-8 text-orange-400 absolute -top-2 -right-2" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Recipe Personalization Coming Soon!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              We're enhancing our AI-generated recipes with your personal touch. Soon you'll be able to customize and perfect these recipes to match your taste.
            </p>
          </div>

          {/* Preview Section */}
          <div className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-orange-100 dark:border-orange-900 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Preview of Recipe Editor</h2>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-16 h-6 bg-orange-200 dark:bg-orange-900/50 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Stars className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">Adjust Ingredients</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Modify quantities or substitute ingredients based on your preferences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Edit3 className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">Customize Instructions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add your own tips and modify cooking steps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Form */}
          {/* <div className="bg-orange-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <ThumbsUp className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Be the First to Know
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email for early access"
                  className="flex-1 bg-white dark:bg-gray-950"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 whitespace-nowrap"
                >
                  Get Early Access
                </Button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We'll notify you as soon as the recipe editing feature is available. You'll get early access to test and provide feedback!
              </p>
            </form>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoon;