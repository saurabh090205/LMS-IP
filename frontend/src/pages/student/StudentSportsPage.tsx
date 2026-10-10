import React, { useState } from 'react';
import {
  Trophy,
  Activity,
  Calendar,
  Clock,
  User,
  Award,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface SportEntry {
  id: string;
  name: string;
  category: 'Varsity Team' | 'Inter-Collegiate Club' | 'Recreational';
  role: string;
  coach: string;
  schedule: string;
  venue: string;
  record: string;
}

const sportsList: SportEntry[] = [
  {
    id: 'sp-1',
    name: 'Varsity Badminton Squad',
    category: 'Varsity Team',
    role: 'Singles Seed #2 & Mixed Doubles',
    coach: 'Coach Manoj Shinde',
    schedule: 'Mon, Wed, Fri • 06:30 AM - 08:00 AM',
    venue: 'Campus Indoor Sports Complex — Court 2',
    record: 'Quarter-finalists, West Zone Inter-University 2025',
  },
  {
    id: 'sp-2',
    name: 'Collegiate Table Tennis Club',
    category: 'Inter-Collegiate Club',
    role: 'Active Player',
    coach: 'Coach Anjali Sawant',
    schedule: 'Tue, Thu • 05:30 PM - 07:00 PM',
    venue: 'Student Activity Arena — Hall 3',
    record: 'Gold Medalist, Pune Techfest Invitational 2026',
  },
];

export default function StudentSportsPage() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              Campus Athletics & Fitness
            </span>
            <span className="text-xs text-[#6B756F]">VIT Department of Physical Education</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            Sports & Fitness Records
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Registered university squads, training calendars, tournament participation, and fitness milestones.
          </p>
        </div>

        <button
          onClick={() => {
            addToast({
              title: 'Gymnasium Booking',
              description: 'Campus strength conditioning arena slot confirmed for 06:00 AM tomorrow.',
              type: 'success',
            });
          }}
          className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint transition-colors cursor-pointer"
        >
          Book Training Slot
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B756F]">Active Squads</span>
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-2xl font-black text-[#18221D]">2 Sports</span>
          <span className="text-xs text-[#36B875] block mt-1">Varsity & Inter-collegiate</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B756F]">Weekly Training</span>
            <Clock className="w-5 h-5 text-[#36B875]" />
          </div>
          <span className="text-2xl font-black text-[#18221D]">6.5 Hours</span>
          <span className="text-xs text-[#6B756F] block mt-1">Court & fitness conditioning</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B756F]">Fitness Clearance</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-emerald-700">Category A</span>
          <span className="text-xs text-[#6B756F] block mt-1">Annual medical check verified</span>
        </div>
      </div>

      {/* Registered Squads List */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B756F]">
          Enrolled Sports & Squad Schedule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sportsList.map((sport) => (
            <div
              key={sport.id}
              className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF9F3] text-[#18794E]">
                    {sport.category}
                  </span>
                  <h3 className="text-base font-bold text-[#18221D] mt-1.5">{sport.name}</h3>
                  <p className="text-xs text-[#36B875] font-semibold">{sport.role}</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#6B756F] bg-[#F6F8F7] p-3.5 rounded-2xl">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#36B875]" />
                  <span>Coach: <strong className="text-[#18221D]">{sport.coach}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#36B875]" />
                  <span>{sport.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#36B875]" />
                  <span>{sport.venue}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5EBE7] flex items-center justify-between text-xs">
                <span className="text-[#6B756F] italic">{sport.record}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
