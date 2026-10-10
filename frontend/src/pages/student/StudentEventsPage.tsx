import React, { useState } from 'react';
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  Tag,
  Search,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { studentPortalService, EventItem } from '../../services/studentPortalService';

export default function StudentEventsPage() {
  const { addToast } = useToast();
  const [events, setEvents] = useState<EventItem[]>(() => studentPortalService.getEvents());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Hackathon', 'Technical Workshop', 'Guest Lecture', 'Cultural'];

  const filteredEvents = events.filter((ev) => {
    const matchesCat = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleToggleRegistration = (id: string) => {
    const updated = studentPortalService.toggleEventRegistration(id);
    setEvents(studentPortalService.getEvents());
    addToast({
      title: updated.registered ? 'Registration Confirmed!' : 'Registration Cancelled',
      description: updated.registered
        ? `You have registered for ${updated.title}. Ticket added to your schedule.`
        : `Your registration for ${updated.title} has been cancelled.`,
      type: updated.registered ? 'success' : 'info',
    });
  };

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              Campus Life & Activities
            </span>
            <span className="text-xs text-[#6B756F]">VIT Student Development Cell</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            Campus Events & Hackathons
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Discover university technical symposiums, coding challenges, guest keynotes, and student clubs.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#36B875] text-white shadow-xs'
                  : 'bg-white text-[#6B756F] hover:bg-slate-50 border border-[#E5EBE7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E5EBE7] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#36B875]/20 focus:border-[#36B875]"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col justify-between gap-4 hover:border-[#B0E7CB] transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF9F3] text-[#18794E]">
                  {ev.category}
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {ev.spotsLeft} Spots Left
                </span>
              </div>

              <h3 className="text-base font-bold text-[#18221D] mt-2.5">{ev.title}</h3>
              <p className="text-xs text-[#6B756F] mt-1 leading-relaxed">{ev.description}</p>
            </div>

            <div className="space-y-2 text-xs text-[#6B756F] bg-[#F6F8F7] p-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#36B875]" />
                <span className="font-medium text-[#18221D]">{ev.date} • {ev.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#36B875]" />
                <span>{ev.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#36B875]" />
                <span>Organized by: <strong>{ev.organizer}</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5EBE7] flex items-center justify-between">
              <span className="text-xs text-[#6B756F]">
                Status: {ev.registered ? <strong className="text-emerald-700">Registered ✓</strong> : 'Open for Registration'}
              </span>

              <button
                type="button"
                onClick={() => handleToggleRegistration(ev.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  ev.registered
                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                    : 'bg-[#36B875] hover:bg-[#239B5E] text-white shadow-mint'
                }`}
              >
                {ev.registered ? 'Cancel Registration' : 'Register Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
