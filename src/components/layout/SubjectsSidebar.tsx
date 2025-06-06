
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
  const { ageGroup } = useTheme();
  const { translations } = useLanguage();
  const { user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  // Check if user is preschool age (5-6 years old)
  const isPreschool = user?.childAge && user.childAge >= 5 && user.childAge <= 6;

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center p-3 rounded-lg transition-all micro-pop ${
      isActive ? 'bg-primary/20 font-bold' : 'hover:bg-primary/10'
    } ${isPreschool ? 'text-white hover:bg-white/20' : ''}`;

  const iconSize = ageGroup === 'young' ? 24 : 20;

  return (
    <Sidebar
      className={`${collapsed ? 'w-0 md:w-16' : 'w-64'} transition-all duration-300 border-r ${isPreschool ? 'bg-transparent border-white/20' : ''}`}
      collapsible="icon"
    >
      <div className="flex justify-between items-center p-4">
        {!collapsed && (
          <h1 className={`font-bold text-lg ${ageGroup === 'young' ? 'font-comic' : 'font-nunito'} ${isPreschool ? 'text-white drop-shadow-lg' : ''}`}>
            {translations['app.name'] || 'Learn Quest'}
          </h1>
        )}
        <SidebarTrigger className={`p-2 rounded-full ${isPreschool ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-primary/10'}`} />
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={`${ageGroup === 'young' ? 'text-base font-comic' : 'text-sm font-nunito'} ${isPreschool ? 'text-white/90' : ''}`}>
            {translations['subject'] || 'Subjects'}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {subjects.map((subject) => (
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
                        <span className={`${ageGroup === 'young' ? 'font-comic' : 'font-nunito'} ${isPreschool ? 'drop-shadow-sm' : ''}`}>
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
          <SidebarGroupLabel className={`${ageGroup === 'young' ? 'text-base font-comic' : 'text-sm font-nunito'} ${isPreschool ? 'text-white/90' : ''}`}>
            {translations['dashboard'] || 'Dashboard'}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <NavLink to="/chat" className={getNavClass}>
                    <div className={`p-2 rounded-full mr-3 flex items-center justify-center ${isPreschool ? 'bg-white/20' : 'bg-primary/20'}`}>
                      <MessageCircle size={iconSize} />
                    </div>
                    {!collapsed && (
                      <span className={`${ageGroup === 'young' ? 'font-comic' : 'font-nunito'} ${isPreschool ? 'drop-shadow-sm' : ''}`}>
                        {translations['chat.title'] || 'Chat'}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <NavLink to="/progress" className={getNavClass}>
                    <div className={`p-2 rounded-full mr-3 flex items-center justify-center ${isPreschool ? 'bg-white/20' : 'bg-primary/20'}`}>
                      <Star size={iconSize} />
                    </div>
                    {!collapsed && (
                      <span className={`${ageGroup === 'young' ? 'font-comic' : 'font-nunito'} ${isPreschool ? 'drop-shadow-sm' : ''}`}>
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
