
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import SubjectsSidebar from './SubjectsSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout = () => {
  const { themeClass } = useTheme();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background to-secondary/30 ${themeClass}`}>
      <SidebarProvider
        defaultCollapsed={isMobile}
        collapsedWidth={isMobile ? 0 : 60}
      >
        <div className="flex min-h-screen w-full">
          <SubjectsSidebar />
          
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
