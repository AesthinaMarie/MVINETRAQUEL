import { useState,React } from 'react'
import SuperNavBar from './SBar'
import TBIDrawer from './drawers';

function tbi_admin() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(prev => !prev);
    };


  return (
    <div className="flex h-screen">
    <TBIDrawer isOpen={drawerOpen} onToggle={toggleDrawer} />
    <div className="flex-grow">
        <SuperNavBar toggleDrawer={toggleDrawer} />
    </div>
    </div>
  )
}

export default tbi_admin