import React from 'react';
import useSticky from './useSticky';
import './style.css';

export default function App() {
  const { element, headerElement } = useSticky();
  return (
    <div>
      <header ref={headerElement} className={'navbar move-down'}>
        This is header
      </header>
      <div className="content" ref={element}>
        <p className="abs">Start editing to see some magic happen :)</p>
      </div>
    </div>
  );
}
