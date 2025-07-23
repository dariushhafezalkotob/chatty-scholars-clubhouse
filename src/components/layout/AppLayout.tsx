
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
  const { translations, language } = useLanguage();
  const { isAuthenticated, logout, user } = useAuth();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();
  
  // Check if user is preschool age (5-6 years old)
  const isPreschool = user?.childAge && user.childAge >= 5 && user.childAge <= 6;
  
  // Enhanced gradient background based on theme
  const getGradientBg = () => {
    if (isPreschool) {
      // Preschool background - bright sky with nature theme like references
      return colorMode === 'dark' 
        ? 'bg-gradient-to-b from-indigo-600 via-purple-700 to-pink-600' 
        : 'bg-gradient-to-b from-sky-300 via-blue-200 to-green-300';
    } else if (colorMode === 'dark') {
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
      <div className={`min-h-screen ${getGradientBg()} ${themeClass} flex items-center justify-center overflow-auto`}>
        <Outlet />
      </div>
    );
  }
    
  return (
    <div className={`min-h-screen ${getGradientBg()} ${themeClass} relative overflow-hidden`}>
      {/* Preschool decorative background elements */}
      {isPreschool && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Animated clouds */}
          <div className="absolute top-10 left-10 w-20 h-12 bg-white rounded-full opacity-90 animate-float"></div>
          <div className="absolute top-16 left-32 w-16 h-10 bg-white rounded-full opacity-80 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-8 right-20 w-24 h-14 bg-white rounded-full opacity-85 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-20 right-40 w-18 h-11 bg-white rounded-full opacity-75 animate-float" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Sun */}
          <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
          
          {/* Rainbow */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-64 h-32 opacity-60">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full h-4"></div>
          </div>
          
          {/* Floating colorful shapes */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-pink-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-7 h-7 bg-orange-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '1.2s' }}></div>
          
          {/* Tree branches with leaves */}
          <div className="absolute top-0 left-0 w-32 h-32 opacity-60">
            <div className="absolute top-8 left-8 w-2 h-20 bg-amber-600 rounded-full transform rotate-45"></div>
            <div className="absolute top-4 left-12 w-4 h-6 bg-green-500 rounded-full"></div>
            <div className="absolute top-6 left-16 w-3 h-5 bg-green-400 rounded-full"></div>
            <div className="absolute top-2 left-14 w-5 h-7 bg-green-600 rounded-full"></div>
          </div>
        </div>
      )}
      
      <SidebarProvider
        defaultOpen={!isMobile}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      >
        <div className="flex min-h-screen w-full flex-row relative z-10">
          <SubjectsSidebar />
          
          <main className="flex-1 p-4 overflow-auto">
            <div className="flex justify-between mb-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                aria-label="Go to dashboard"
                className={`rounded-full ${ageGroup === 'young' ? 'animate-float' : ''} ${isPreschool ? 'bg-white/20 hover:bg-white/30 text-white' : ''}`}
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
                  className={`rounded-full ${isPreschool ? 'bg-white/20 hover:bg-white/30 text-white' : ''}`}
                >
                  {colorMode === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  aria-label="Log out"
                  className={`rounded-full ${isPreschool ? 'bg-white/20 hover:bg-white/30 text-white' : ''}`}
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
