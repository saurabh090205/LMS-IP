import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Award,
  BookOpen,
  Calendar,
  CreditCard,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { studentPortalService, NotificationItem } from '../../services/studentPortalService';

export default function StudentNotificationsPage() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => studentPortalService.getNotifications());
  const [activeTab, setActiveTab] = useState<string>('all');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAll = () => {
    studentPortalService.markAllNotificationsAsRead();
    setNotifications(studentPortalService.getNotifications());
    addToast({
      title: 'All Marked as Read',
      description: 'Your notification inbox has been cleared.',
      type: 'info',
    });
  };

  const handleItemClick = (notif: NotificationItem) => {
    studentPortalService.markNotificationAsRead(notif.id);
    setNotifications(studentPortalService.getNotifications());
    if (notif.actionUrl) {
      navigate(notif.actionUrl);
    }
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !n.isRead;
    return n.category === activeTab;
  });

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              Notification Dispatcher
            </span>
            {unreadCount > 0 && (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            Notification Centre
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            System alerts, assignment deadlines, exam timetables, fee invoices, and campus announcements.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAll}
            className="px-4 py-2 rounded-xl border border-[#E5EBE7] bg-white hover:bg-slate-50 text-xs font-bold text-[#18221D] transition-colors flex items-center gap-1.5 cursor-pointer shadow-subtle"
          >
            <CheckCheck className="w-4 h-4 text-[#36B875]" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E5EBE7] no-scrollbar">
        {['all', 'unread', 'academic', 'assignment', 'exam', 'event'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-[#36B875] text-white shadow-xs'
                : 'bg-white text-[#6B756F] hover:bg-slate-50 border border-[#E5EBE7]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-[#E5EBE7] shadow-card overflow-hidden divide-y divide-[#E5EBE7]">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#6B756F]">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                !item.isRead ? 'bg-[#EFF9F3]/60' : 'hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  !item.isRead ? 'bg-[#36B875] text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Bell className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-xs ${!item.isRead ? 'font-bold text-[#18221D]' : 'font-semibold text-slate-700'}`}>
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-[#6B756F] shrink-0">{item.timestamp}</span>
                </div>
                <p className="text-xs text-[#6B756F] mt-1 leading-relaxed">{item.message}</p>
                {item.actionUrl && (
                  <span className="text-[11px] font-bold text-[#36B875] hover:underline mt-2 inline-block">
                    Open Linked Record →
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
