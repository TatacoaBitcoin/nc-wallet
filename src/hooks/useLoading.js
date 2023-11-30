import {useState} from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = async fn => {
    setIsLoading(true);
    try {
      const result = await fn();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, withLoading];
};
