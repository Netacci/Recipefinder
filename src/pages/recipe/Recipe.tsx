import { useTheme } from '@/components/theme-provider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, Star, Flame, Loader2, Edit2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicRequest } from '@/utils/requestMethods';
import { ROUTES } from '@/utils/routes';

// Extended Recipe type with calorie information
interface calorieBreakdown {
  name: string;
  calories: number;
}

interface Recipe {
  name: string;
  description: string;
  rating: number;
  prep_time: string;
  cook_time: string;
  imageURL: {
    image: string;
    photographer_url: string;
    photographer: string;
  };
  ingredients: string[];
  instructions: string[];
  totalCalories: number;
  calorieBreakdown: calorieBreakdown[];
}

const RecipeDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const foodName = searchParams.get('foodName');
  const country = searchParams.get('country');
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: [foodName, country],
    queryFn: () =>
      publicRequest(`/recipe?name=${foodName}&country=${country}`)
        .then((res) => res.data)
        .catch((err) => console.log(err)),
  });

  const recipe = data as Recipe;

  const backToSearch = () => {
    searchParams.delete('foodName');
    searchParams.delete('country');
    setSearchParams(searchParams);
    navigate(ROUTES.home);
  };

  return (
    <>
      {isPending ? (
        <div className='flex justify-center items-center h-[100vh] w-full'>
          <Loader2 className='w-10 h-10 animate-spin' />
        </div>
      ) : (
        <div className='max-w-4xl mx-auto px-4 py-6'>
          <Button
            variant='outline'
            onClick={backToSearch}
            className={`mb-6 hover:scale-105 transition-transform ${
              theme === 'dark'
                ? 'bg-gray-800 bg-opacity-50 hover:bg-gray-700'
                : 'bg-white bg-opacity-50 hover:bg-gray-50'
            } backdrop-filter backdrop-blur-lg`}
          >
            <X className='mr-2 h-4 w-4' /> Back to Search
          </Button>

          <Card
            className={`${
              theme === 'dark'
                ? 'bg-gray-800 bg-opacity-60'
                : 'bg-white bg-opacity-60'
            } backdrop-filter backdrop-blur-lg shadow-xl rounded-xl`}
          >
            <CardHeader className='space-y-4'>
              <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
                <div className='space-y-2'>
                  <CardTitle
                    className={`text-3xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {recipe?.name}
                  </CardTitle>

                  <div className='flex items-center gap-4'>
                    <div className='flex items-center'>
                      <Flame className='h-5 w-5 text-orange-500' />
                      <span
                        className={`ml-1 font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {recipe?.totalCalories} calories
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <Star className='h-5 w-5 text-yellow-400 fill-current' />
                      <span
                        className={`ml-1 font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {recipe?.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  className={`group hover:scale-105 transition-all border border-blue-500 ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700 hover:bg-opacity-50'
                      : 'hover:bg-gray-100 hover:bg-opacity-50'
                  }  p-2`}
                  onClick ={()=>navigate(ROUTES.comingSoon)}
                >
                  Make an edit <Edit2 className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </CardHeader>
            <div className='px-6 pb-6'>
              <div
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700 bg-opacity-40'
                    : 'bg-gray-100 bg-opacity-60'
                } rounded-lg p-4 backdrop-filter backdrop-blur-sm`}
              >
                <p
                  className={`italic text-base leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {recipe?.description}
                </p>
              </div>
            </div>
            <CardContent className='space-y-6'>
              <div className='relative group'>
                <img
                  src={recipe?.imageURL?.image}
                  alt={recipe?.name}
                  className='w-full h-72 md:h-96 object-cover rounded-lg shadow-md'
                />
                {/* Timer overlay */}
                <div
                  className={`absolute bottom-4 right-4 rounded-full px-4 py-2 ${
                    theme === 'dark'
                      ? 'bg-gray-800 bg-opacity-75'
                      : 'bg-white bg-opacity-75'
                  } backdrop-filter backdrop-blur-sm`}
                >
                  <div
                    className={`flex gap-4 text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    <span>Prep: {recipe?.prep_time}</span>
                    <span>Cook: {recipe?.cook_time}</span>
                  </div>
                </div>
                {/* Photo credit overlay */}
                <div
                  className={`absolute bottom-4 left-4 rounded-full px-4 py-2 ${
                    theme === 'dark'
                      ? 'bg-gray-800 bg-opacity-75'
                      : 'bg-white bg-opacity-75'
                  } backdrop-filter backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <div
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    Photo by{' '}
                    {recipe?.imageURL?.photographer_url ? (
                      <a
                        href={recipe.imageURL?.photographer_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline hover:text-purple-500 transition-colors'
                      >
                        {recipe.imageURL?.photographer}
                      </a>
                    ) : (
                      <span>{recipe?.imageURL?.photographer || 'Unknown'}</span>
                    )}
                  </div>
                </div>
              </div>

              <Tabs defaultValue='ingredients' className='mt-6'>
                <TabsList
                  className={`grid w-full grid-cols-3 ${
                    theme === 'dark'
                      ? 'bg-gray-700 bg-opacity-50'
                      : 'bg-gray-100 bg-opacity-50'
                  } backdrop-filter backdrop-blur-lg rounded-lg p-1`}
                >
                  {['ingredients', 'nutrition', 'instructions'].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className={`
                      capitalize py-2 px-4 rounded-md transition-all
                      ${
                        theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-200 data-[state=active]:bg-purple-600'
                          : 'text-gray-600 hover:text-gray-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500'
                      }
                      data-[state=active]:text-white
                      data-[state=active]:shadow-sm
                    `}
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value='ingredients' className='mt-6 space-y-4'>
                  <ul
                    className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {recipe?.ingredients?.map((ingredient, index) => (
                      <li key={index} className='flex items-center'>
                        <span className='h-2 w-2 rounded-full bg-purple-500 mr-3'></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value='nutrition' className='mt-6'>
                  <div
                    className={`space-y-6 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <div className='flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white'>
                      <span className='text-lg'>Total Calories:</span>
                      <span className='text-2xl font-bold'>
                        {recipe?.totalCalories}
                      </span>
                    </div>
                    <div className='space-y-4'>
                      <h3 className='text-lg font-semibold'>
                        Calorie Breakdown:
                      </h3>
                      <div className='grid gap-3'>
                        {recipe?.calorieBreakdown?.map((calorie, index) => (
                          <div
                            key={index}
                            className='flex justify-between items-center py-2 px-4 rounded-lg hover:bg-opacity-10 hover:bg-purple-500 transition-colors'
                          >
                            <span>{calorie.name}</span>
                            <span className='font-medium'>
                              {calorie.calories} cal
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='instructions' className='mt-6'>
                  <ol
                    className={`space-y-4 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {recipe?.instructions?.map((step, index) => (
                      <li key={index} className='flex gap-4'>
                        <span className='flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium'>
                          {index + 1}
                        </span>
                        <p className='mt-1'>{step}</p>
                      </li>
                    ))}
                  </ol>
                </TabsContent>
              </Tabs>

              <div className='space-y-4 pt-6 border-t'>
                <Alert
                  variant='default'
                  className='bg-opacity-50 backdrop-blur-sm'
                >
                  <AlertDescription
                    className={`space-y-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <p className='text-sm font-medium'>
                      🤖 AI-Generated Content Notice
                    </p>
                    <p className='text-sm'>
                      This recipe and its details were generated using
                      artificial intelligence. While we strive for accuracy, the
                      measurements, cooking times, and nutritional information
                      provided may not be perfectly precise. Please use your
                      judgment and adjust according to your preferences and
                      dietary needs.
                    </p>
                  </AlertDescription>
                </Alert>
                <Alert
                  className={`${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                  } bg-opacity-50 backdrop-blur-sm`}
                >
                  <AlertDescription
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Note: The estimated cook time, prep time, and calorie
                    breakdown are approximate values and may vary depending on
                    individual cooking styles and ingredient quantities.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
