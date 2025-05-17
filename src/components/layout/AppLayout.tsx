
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import SubjectsSidebar from './SubjectsSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Moon, Sun, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';

const AppLayout = () => {
  const { themeClass, colorMode, toggleColorMode, ageGroup } = useTheme();
  const { translations, direction } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();
  
  // Enhanced gradient background based on theme
  const getGradientBg = () => {
    if (colorMode === 'dark') {
      return 'bg-gradient-to-br from-background to-secondary/30';
    } else if (ageGroup === 'young') {
      // More vibrant gradient for kids mode
      return 'bg-gradient-to-br from-sky-blue/40 to-mint-green/30 via-sunshine-yellow/20';
    } else {
      return 'bg-gradient-to-br from-primary/10 to-secondary/20';
    }
  };

  // If not authenticated, just render the outlet (which will be the AuthCard on index page)
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${getGradientBg()} ${themeClass} flex items-center justify-center overflow-auto`} dir={direction}>
        <Outlet />
      </div>
    );
  }
    
  return (
    <div className={`min-h-screen ${getGradientBg()} ${themeClass}`} dir={direction}>
      <SidebarProvider
        defaultOpen={!isMobile}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      >
        <div className="flex min-h-screen w-full flex-row">
          <SubjectsSidebar />
          
          <main className="flex-1 p-4 overflow-auto">
            <div className="flex justify-between mb-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                aria-label="Go to dashboard"
                className={`rounded-full ${ageGroup === 'young' ? 'animate-float' : ''}`}
              >
                <Home className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                <LanguageSelector />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleColorMode}
                  aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                  className="rounded-full"
                >
                  {colorMode === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  aria-label="Log out"
                  className="rounded-full"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
