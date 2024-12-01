import React, { useState, useEffect } from 'react';
import { FaDoorClosed, FaDoorOpen } from 'react-icons/fa';

function LoginLoading() {
  const names = ['Karl Bernaldez', 'Bryan', 'Juan'];
  const [currentName, setCurrentName] = useState(names[0]);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [unlockCount, setUnlockCount] = useState(0);

  useEffect(() => {

    const nameChangeInterval = setInterval(() => {
      setCurrentName((prevName) => {
        const currentIndex = names.indexOf(prevName);
        const nextIndex = (currentIndex + 1) % names.length;
        return names[nextIndex];
      });
    }, 3000);

    const doorAnimationInterval = setInterval(() => {
      setIsDoorOpen((prevState) => {
        if (!prevState) setUnlockCount((prevCount) => prevCount + 1);
        return !prevState;
      });
    }, 400);

    if (unlockCount >= 3) {
      clearInterval(doorAnimationInterval);
    }

    return () => {
      clearInterval(nameChangeInterval);
      clearInterval(doorAnimationInterval);
    };
  }, [unlockCount, names]);

  return (
    <div>
      <div>
        <h1>Welcome {currentName}</h1>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Please wait for the door to open.....</span>
            <span
              style={{
                fontSize: '40px',
                marginTop: '5px',
                color: isDoorOpen ? 'black' : 'red',
              }}
            >
              {isDoorOpen ? <FaDoorOpen /> : <FaDoorClosed />}
            </span>
          </div>
        </div>
        <div style={{ marginTop: '10px', fontSize: '16px' }}>
        </div>
      </div>
    </div>
  );
}

export default LoginLoading;
