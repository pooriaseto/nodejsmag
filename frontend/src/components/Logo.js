import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/logo.svg"
      height={22}
      {...props}
    />
  );
};

export default Logo;
