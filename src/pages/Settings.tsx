import { motion } from 'framer-motion';
import { User, Bell, Shield, Moon, LogOut } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function Settings() {
  const sections = [
    { title: 'Account', icon: <User size={20} />, description: 'Update your personal info and profile picture.' },
    { title: 'Notifications', icon: <Bell size={20} />, description: 'Manage how you receive alerts and updates.' },
    { title: 'Privacy & Security', icon: <Shield size={20} />, description: 'Control your data and account security.' },
    { title: 'Appearance', icon: <Moon size={20} />, description: 'Customize the dark/light mode and interface.' },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="mb-16">
          <h1 className="font-voyage text-6xl text-white uppercase tracking-wider mb-2">Settings</h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Manage your account & preferences</p>
        </div>

        <div className="space-y-4">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="p-8 bg-white/5 border border-white/5 rounded-[32px] flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-8">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">{section.title}</h3>
                  <p className="text-white/30 text-sm font-medium">{section.description}</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 group-hover:border-white/20 group-hover:text-white transition-all">
                →
              </div>
            </motion.div>
          ))}
        </div>

        <button className="mt-12 flex items-center gap-3 px-8 py-4 text-red-400 font-black uppercase tracking-widest text-[10px] hover:bg-red-500/10 rounded-full transition-all">
          <LogOut size={16} /> Logout from all devices
        </button>
      </div>
    </MainLayout>
  );
}
