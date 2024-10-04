import React, { useState } from 'react';
import SuperNavBar from './component/SBar';
import Drawer from './component/drawer';
import TBIAdminContent from './component/manage_tbiadmin';

function SAdminPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(prev => !prev);
    };

    return (
        <div className="flex h-screen">
            <Drawer isOpen={drawerOpen} onToggle={toggleDrawer} />
            <div className="flex-grow">
                <SuperNavBar toggleDrawer={toggleDrawer} />

                <TBIAdminContent></TBIAdminContent>
            </div>
        </div>
    );
}

export default SAdminPage;
