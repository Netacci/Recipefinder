import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle,} from "@/components/ui/card";
import { useTheme } from '@/components/theme-provider';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { countries } from '@/config/countries';
import { publicRequest } from '@/utils/requestMethods';
import { showErrorMessage } from '@/components/toast/Toast';

const SearchFood = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [countryQuery, setCountryQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef?.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleCountryFilter = (value: string) => {
    setCountryQuery(value);
    setShowDropdown(true);
    setFilteredCountries(
      countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const selectCountry = (country: string) => {
    setSelectedCountry(country);
    setCountryQuery(country);
    setShowDropdown(false);
  };
  const handleSearch = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await publicRequest(
        `/recipe?name=${searchQuery}&country=${selectedCountry}`
      );
      if (response.data.status === 'not found') {
        showErrorMessage('No recipes found');
      } else {
        setIsLoading(false);
        searchParams.set('foodName', searchQuery);
        searchParams.set('country', selectedCountry);
        setSearchParams(searchParams);
        navigate(`/recipe?foodName=${searchQuery}&country=${selectedCountry}`);
      }
    } catch (err) {
      console.log(err);
      showErrorMessage('No recipes found, Try with a different name!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='text-center'>
      <h1
        className={`text-5xl font-bold mb-6 ${
          theme === 'dark'
            ? 'text-white'
            : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'
        }`}
      >
        AI-Powered Recipe Finder
      </h1>
      <p
        className={`text-xl mb-8 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        Discover delicious recipes from around the world with just a few clicks!
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
      To get accurate results, please enter the full name of the dish or a name that closely matches the dish.
          </p>
      <div className='flex flex-col sm:flex-row justify-center items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4'>
        <Input
          type='text'
          placeholder='Enter a food name'
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          className={`w-full sm:w-64 ${
            theme === 'dark'
              ? 'bg-gray-800 bg-opacity-50'
              : 'bg-white bg-opacity-50'
          } backdrop-filter backdrop-blur-lg`}
        />

        <div className='relative sm:w-64 w-full' ref={dropdownRef}>
          <Input
            type='text'
            placeholder='Select a country'
            value={countryQuery}
            onChange={(e) => handleCountryFilter(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className={`w-full sm:w-64 ${
              theme === 'dark'
                ? 'bg-gray-800 bg-opacity-50'
                : 'bg-white bg-opacity-50'
            } backdrop-filter backdrop-blur-lg`}
          />
          {showDropdown && (
            <div
              className={`absolute z-10 w-full mt-1 max-h-60 overflow-auto ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } border border-gray-300 rounded-md shadow-lg`}
            >
              {filteredCountries.map((country) => (
                <div
                  key={country}
                  className={`px-4 py-2 cursor-pointer ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => selectCountry(country)}
                >
                  {country}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Button
        onClick={handleSearch}
        className={`w-full sm:w-64 ${
          theme === 'dark'
            ? 'bg-purple-600 hover:bg-purple-700'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
        } text-white`}
        disabled={!searchQuery || !selectedCountry}
      >
        {isLoading ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <>
            <Search className='mr-2 h-4 w-4' /> Search
          </>
        )}
      </Button>
    </div>
  );
};

export default SearchFood;
