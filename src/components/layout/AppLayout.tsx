
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import SubjectsSidebar from './SubjectsSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppLayout = () => {
  const { themeClass, colorMode, toggleColorMode } = useTheme();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background to-secondary/30 ${themeClass}`}>
      <SidebarProvider
        defaultOpen={!isMobile}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      >
        <div className="flex min-h-screen w-full">
          <SubjectsSidebar />
          
          <main className="flex-1 p-4">
            <div className="flex justify-end mb-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleColorMode}
                aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                className="rounded-full"
              >
                {colorMode === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </div>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
