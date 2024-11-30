import React, { useState, useEffect } from 'react';

function LoginLoading() {
  const names = ['Karl Bernaldez', 'Bryan', 'Juan'];
  const [currentName, setCurrentName] = useState(names[0]);
  const [dots, setDots] = useState('.....');

  useEffect(() => {
    const nameChangeInterval = setInterval(() => {
      setCurrentName(prevName => {
        const currentIndex = names.indexOf(prevName);
        const nextIndex = (currentIndex + 1) % names.length;
        return names[nextIndex];
      });
    }, 3000);

    const dotAnimationInterval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length === 5) return '.';
        return prevDots + '.';
      });
    }, 600);

    return () => {
      clearInterval(nameChangeInterval);
      clearInterval(dotAnimationInterval);
    };
  }, []);

  return (
    <div>
      <div>
        <h1>Welcome {currentName}</h1>
        <div>
          Please wait for the door to open
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '30px',
              background: '#0575E6',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {dots}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginLoading;
