import React from 'react';

import { useTheme } from '@/components/theme-provider';
import SearchFood from '../search/Search';
import { Toaster } from 'react-hot-toast';
// import UploadRecipe from '../uploadRecipe/UploadRecipe';

const Home: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
          : 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100'
      }`}
    >
      <Toaster />

      <div className='container mx-auto p-8 max-w-4xl'>
        <SearchFood />

        {/* <UploadRecipe/> */}
      </div>
    </div>
  );
};

export default Home;
