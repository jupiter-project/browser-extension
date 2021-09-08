import React, { memo } from 'react';

const TabPanel = ({
  children,
  value,
  index,
  ...other
}) => {

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ width: '100%' }}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default memo(TabPanel)