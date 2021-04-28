import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import "./Home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      <div className="Loading_Spinner">
        <LoadingSpinner isLoading={loading} />
      </div>
    </div>
  );
};

export default Home;
