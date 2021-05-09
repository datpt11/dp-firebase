import { useEffect } from 'react';
import { useState } from 'react';

import Observer from '../utils/Observer';

const htmlEl = document.querySelector('html') as HTMLHtmlElement;
const nightMode$ = new Observer<boolean>();

const useNightMode = () => {
  const [nightModeState, setNightModeState] = useState(false);

  useEffect(() => {
    const subscription = nightMode$.subscribe(nightMode => {
      setNightModeState(nightMode);
    });
    return () => {
      subscription();
    };
  }, []);

  const setNightMode = (nightMode: boolean) => {
    if (nightMode) {
      htmlEl.setAttribute('class', 'dark');
    } else {
      htmlEl.removeAttribute('class');
    }
    nightMode$.notify(nightMode);
  };

  return {
    nightMode: nightModeState,
    setNightMode,
  };
};

export default useNightMode;
