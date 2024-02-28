'use client';

import { FormEvent, useState } from 'react';

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidAmazonURL = (url: string) => {
    try {
      const parsedURL = new URL(searchPrompt);
      const hostname = parsedURL.hostname;
      console.log('hostname', hostname);

      if (
        hostname.includes('amazon') ||
        hostname.includes('amazon.com') ||
        hostname.endsWith('amazon')
      ) {
        console.log('valid amazon url');
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return false;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchPrompt);

    // Need to check if the user input is a valid url

    const isValidLink = isValidAmazonURL(searchPrompt);

    if (!isValidLink) {
      return 'Please enter a valid Amazon product link';
    } else {
      try {
        setIsLoading(true);
        // scrape
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter Product Link"
        className="searchbar-input"
      />
      <button type="submit" className="searchbar-btn" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default Searchbar;
