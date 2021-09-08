
import React, { memo } from 'react'
import { Tabs, Tab } from '@material-ui/core'

import AssetsPanel from './AssetsPanel'
import ActivityPanel from './ActivityPanel'

const AccountDetails = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='scrollable'
        scrollButtons='auto'
        aria-label='scrollable auto tabs example'
      >
        <Tab label='Assets' {...a11yProps(0)} />
        <Tab label='Activity' {...a11yProps(1)} />
      </Tabs>
      <AssetsPanel value={value} index={0} />
      <ActivityPanel value={value} index={1} />
    </>
  )
}

export default memo(AccountDetails)

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
