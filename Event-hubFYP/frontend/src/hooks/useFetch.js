import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Change to null to distinguish from empty string
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
      
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
      
        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch(err) {
        setError(err.message);
        setLoading(false);
      }
      
    }
    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading
  };
}

export default useFetch;
