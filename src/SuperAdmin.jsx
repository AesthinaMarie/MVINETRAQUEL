import React, { useState } from 'react';
import SuperNavBar from './component/SBar';
import Drawer from './component/drawers';
import TBIAdminContent from './component/super_admin_content';

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
