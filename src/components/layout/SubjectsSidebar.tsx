
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Compass, GraduationCap, Lightbulb, Star, MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
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
  { id: 'math', name: 'Mathematics', icon: Compass, color: 'bg-sky-blue' },
  { id: 'science', name: 'Science', icon: Lightbulb, color: 'bg-mint-green' },
  { id: 'english', name: 'Language', icon: Book, color: 'bg-coral-pink' },
  { id: 'history', name: 'History', icon: GraduationCap, color: 'bg-sunshine-yellow' },
];

const SubjectsSidebar = () => {
  const { ageGroup } = useTheme();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center p-3 rounded-lg transition-all micro-pop ${
      isActive ? 'bg-primary/20 font-bold' : 'hover:bg-primary/10'
    }`;

  const iconSize = ageGroup === 'young' ? 24 : 20;

  return (
    <Sidebar
      className={`${collapsed ? 'w-0 md:w-16' : 'w-64'} transition-all duration-300 border-r`}
      collapsible="icon"
    >
      <div className="flex justify-between items-center p-4">
        {!collapsed && (
          <h1 className={`font-bold text-lg ${ageGroup === 'young' ? 'font-comic' : 'font-nunito'}`}>
            Learn Quest
          </h1>
        )}
        <SidebarTrigger className="p-2 bg-primary/10 rounded-full" />
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={`${ageGroup === 'young' ? 'text-base font-comic' : 'text-sm font-nunito'}`}>
            Subjects
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
                      <div className={`p-2 rounded-full ${subject.color} mr-3 flex items-center justify-center`}>
                        <subject.icon size={iconSize} className="text-white" />
                      </div>
                      {!collapsed && (
                        <span className={ageGroup === 'young' ? 'font-comic' : 'font-nunito'}>
                          {subject.name}
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
          <SidebarGroupLabel className={`${ageGroup === 'young' ? 'text-base font-comic' : 'text-sm font-nunito'}`}>
            Dashboard
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <NavLink to="/chat" className={getNavClass}>
                    <div className="p-2 rounded-full bg-primary/20 mr-3 flex items-center justify-center">
                      <MessageCircle size={iconSize} />
                    </div>
                    {!collapsed && (
                      <span className={ageGroup === 'young' ? 'font-comic' : 'font-nunito'}>Chat</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <NavLink to="/progress" className={getNavClass}>
                    <div className="p-2 rounded-full bg-primary/20 mr-3 flex items-center justify-center">
                      <Star size={iconSize} />
                    </div>
                    {!collapsed && (
                      <span className={ageGroup === 'young' ? 'font-comic' : 'font-nunito'}>My Progress</span>
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
