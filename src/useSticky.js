import { useEffect, useRef } from 'react';

function useSticky() {
  const element = useRef(null);
  const headerElement = useRef(null);
  const lastPosition = useRef(0);

  const handleClassList = (classList, arg1, arg2) => {
    classList.add(arg1);
    classList.remove(arg2);
  };

  const handleScroll = () => {
    const classList = headerElement?.current?.classList;
    const currentScroll = window?.pageYOffset;
    const hasMoveDownClass = classList?.contains('move-down');
    const isCurrentScrollIsHigh = currentScroll > lastPosition?.current;

    if (isCurrentScrollIsHigh && hasMoveDownClass && currentScroll > 300) {
      handleClassList(classList, 'move-up', 'move-down');
    } else if (!isCurrentScrollIsHigh && !hasMoveDownClass) {
      handleClassList(classList, 'move-down', 'move-up');
    }
    lastPosition.current = window?.pageYOffset;
  };

  // this funciton helps to make dalay to avoid the scroll issue
  const debounce = (func, wait = 25, immediate = true) => {
    let timeOut;
    return () => {
      let context = this,
        args = arguments;
      const later = () => {
        timeOut = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeOut;
      clearTimeout(timeOut);
      timeOut = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll));
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [handleScroll]);

  return { element, headerElement };
}

export default useSticky;
