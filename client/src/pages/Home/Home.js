import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      <LoadingSpinner isLoading={loading} />
      <h1> this home page </h1>
    </div>
  );
};

export default Home;
