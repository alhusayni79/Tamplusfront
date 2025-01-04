import React, { useState } from 'react';
import {  FadeLoader } from 'react-spinners';

function LoadingComponent() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="spinner-container">
      <FadeLoader color="#07489D" loading={loading} size={50} />
    </div>
  );
}

export default LoadingComponent;
