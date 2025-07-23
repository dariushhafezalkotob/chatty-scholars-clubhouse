
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Compass, GraduationCap, Lightbulb, Star, MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const subjects = [
  { id: 'math', name: 'Mathematics', translationKey: 'mathematics', icon: Compass, color: 'bg-sky-blue' },
  { id: 'science', name: 'Science', translationKey: 'science', icon: Lightbulb, color: 'bg-mint-green' },
  { id: 'english', name: 'Language', translationKey: 'language', icon: Book, color: 'bg-coral-pink' },
  { id: 'history', name: 'History', translationKey: 'history', icon: GraduationCap, color: 'bg-sunshine-yellow' },
];

const SubjectsSidebar = () => {
  const { ageGroup, colorMode } = useTheme();
  const { translations } = useLanguage();
  const { user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  // Check if user is preschool age (5-6 years old)
  const isPreschool = user?.childAge && user.childAge >= 5 && user.childAge <= 6;

  // Sidebar background based on preschool theme
  const getSidebarBg = () => {
    if (isPreschool) {
      return colorMode === 'dark' 
        ? 'bg-gradient-to-b from-purple-800/70 via-blue-800/70 to-indigo-800/70 backdrop-blur-sm' 
        : 'bg-gradient-to-b from-yellow-100/80 via-pink-100/80 to-blue-100/80 backdrop-blur-sm';
    }
    return '';
  };

  // Text color for better visibility
  const getTextColor = () => {
    if (isPreschool) {
      return colorMode === 'dark' ? 'text-white' : 'text-gray-800';
    }
    return '';
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center p-3 rounded-lg transition-all micro-pop ${
      isActive 
        ? isPreschool 
          ? colorMode === 'dark' 
            ? 'bg-white/20 font-bold text-white' 
            : 'bg-white/60 font-bold text-gray-900'
          : 'bg-primary/20 font-bold'
        : isPreschool
          ? colorMode === 'dark'
            ? 'hover:bg-white/10 text-white/90'
            : 'hover:bg-white/40 text-gray-700'
          : 'hover:bg-primary/10'
    }`;

  const iconSize = ageGroup === 'young' ? 24 : 20;

  return (
    <Sidebar
      className={`${collapsed ? 'w-0 md:w-16' : 'w-64'} transition-all duration-300 border-r ${
        isPreschool 
          ? colorMode === 'dark' 
            ? 'border-white/10' 
            : 'border-gray-200/50'
          : ''
      } ${getSidebarBg()}`}
      collapsible="icon"
    >
      <div className="flex justify-between items-center p-4">
        {!collapsed && (
          <h1 className={`font-bold text-lg ${ageGroup === 'young' ? 'font-comic' : 'font-nunito'} ${
            isPreschool ? getTextColor() + ' drop-shadow-sm' : ''
          }`}>
            {translations['app.name'] || 'Learn Quest'}
          </h1>
        )}
        <SidebarTrigger className={`p-2 rounded-full ${
          isPreschool 
            ? colorMode === 'dark'
              ? 'bg-white/10 hover:bg-white/20 text-white' 
              : 'bg-white/30 hover:bg-white/50 text-gray-800'
            : 'bg-primary/10'
        }`} />
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={`${ageGroup === 'young' ? 'text-base font-comic' : 'text-sm font-nunito'} ${
            isPreschool ? getTextColor() + ' font-semibold' : ''
          }`}>
            {translations['subject'] || 'Subjects'}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {subjects.filter(subject => !(isPreschool && subject.id === 'history')).map((subject) => (
                <SidebarMenuItem key={subject.id}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={`/subject/${subject.id}`}
                      className={getNavClass}
                    >
                      <div className={`p-2 rounded-full ${subject.color} mr-3 flex items-center justify-center shadow-lg`}>
                        <subject.icon size={iconSize} className="text-white" />
                      </div>
                      {!collapsed && (
                        <span className={`${ageGroup === 'young' ? 'font-comic' : 'font-nunito'} ${
                          isPreschool ? 'drop-shadow-sm font-medium' : ''
                        }`}>
                          {translations[`subject.${subject.translationKey}`] || subject.name}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={`${ageGroup === 'young' ? 'text-base font-comic' : 'text-sm font-nunito'} ${
            isPreschool ? getTextColor() + ' font-semibold' : ''
          }`}>
            {translations['dashboard'] || 'Dashboard'}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <NavLink to="/chat" className={getNavClass}>
                    <div className={`p-2 rounded-full mr-3 flex items-center justify-center ${
                      isPreschool 
                        ? colorMode === 'dark'
                          ? 'bg-white/10'
                          : 'bg-white/30'
                        : 'bg-primary/20'
                    }`}>
                      <MessageCircle size={iconSize} className={isPreschool ? getTextColor() : ''} />
                    </div>
                    {!collapsed && (
                      <span className={`${ageGroup === 'young' ? 'font-comic' : 'font-nunito'} ${
                        isPreschool ? 'drop-shadow-sm font-medium' : ''
                      }`}>
                        {translations['chat.title'] || 'Chat'}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <NavLink to="/progress" className={getNavClass}>
                    <div className={`p-2 rounded-full mr-3 flex items-center justify-center ${
                      isPreschool 
                        ? colorMode === 'dark'
                          ? 'bg-white/10'
                          : 'bg-white/30'
                        : 'bg-primary/20'
                    }`}>
                      <Star size={iconSize} className={isPreschool ? getTextColor() : ''} />
                    </div>
                    {!collapsed && (
                      <span className={`${ageGroup === 'young' ? 'font-comic' : 'font-nunito'} ${
                        isPreschool ? 'drop-shadow-sm font-medium' : ''
                      }`}>
                        {translations['progress.title'] || 'My Progress'}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SubjectsSidebar;
