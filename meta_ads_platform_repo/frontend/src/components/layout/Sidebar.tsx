import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  PlusCircle, 
  Settings, 
  Users, 
  FileText, 
  BrainCircuit,
  Menu
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <BarChart3 size={20} />, label: 'Campanhas', path: '/campaigns' },
    { icon: <PlusCircle size={20} />, label: 'Criar', path: '/create' },
    { icon: <BrainCircuit size={20} />, label: 'Automações', path: '/automations' },
    { icon: <FileText size={20} />, label: 'Relatórios', path: '/reports' },
    { icon: <Users size={20} />, label: 'Públicos', path: '/audiences' },
    { icon: <Settings size={20} />, label: 'Configurações', path: '/settings' },
  ];

  return (
    <aside 
      className={`bg-indigo-900 text-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } h-screen flex flex-col`}
    >
      <div className="flex items-center justify-center h-16 border-b border-indigo-800">
        {collapsed ? (
          <Menu size={24} />
        ) : (
          <div className="text-xl font-bold">Meta Ads Platform</div>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="flex items-center p-2 rounded-lg hover:bg-indigo-800 transition-colors"
              >
                <span className="min-w-[24px]">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-indigo-800">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            U
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Usuário Demo</p>
              <p className="text-xs text-indigo-300">demo@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
