import React, { createContext, useState } from 'react';

const ToggleContext = createContext({
});

const ToggleProvider = (props) => {
    const [toggle, setToggle] = useState(false);
  return (
    <ToggleContext.Provider
      {...props}
      value={{
        toggle, 
        setToggle
      }}
    >
      {props.children}
    </ToggleContext.Provider>
  );
};

export { ToggleProvider , ToggleContext};