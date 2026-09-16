import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { studentApi } from '../../services/api/studentApi';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import type { TimetableSlotResponse } from '../../types/api';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export default function StudentTimetablePage() {
  const [selectedDay, setSelectedDay] = useState<string>('MONDAY');

  const { data: timetableSlots = [], isLoading } = useQuery<TimetableSlotResponse[]>({
    queryKey: ['student-timetable'],
    queryFn: studentApi.getTimetable,
  });

  const slotsForDay = timetableSlots.filter(
    (slot: TimetableSlotResponse) => slot.dayOfWeek.toUpperCase() === selectedDay.toUpperCase()
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E7E7F0] shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            AY 2026-27 • Semester V
          </span>
          <h1 className="text-2xl font-bold text-[#1E1B4B] tracking-tight mt-2">
            Weekly Academic Timetable
          </h1>
          <p className="text-sm text-[#5B5875] mt-1">
            B.Tech Computer Science & Engineering (Artificial Intelligence) • Class AI-A
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="neutral" className="text-xs px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
            Standard Term Schedule
          </Badge>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {DAYS.map((day) => {
          const count = timetableSlots.filter((s: TimetableSlotResponse) => s.dayOfWeek.toUpperCase() === day).length;
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-[#5B5875] hover:bg-slate-50 border border-[#E7E7F0]'
              }`}
            >
              <span>{day.charAt(0) + day.slice(1).toLowerCase()}</span>
              {count > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Schedule Content */}
      {isLoading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E7E7F0]">
          <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm text-[#5B5875]">Loading timetable schedule...</p>
        </div>
      ) : slotsForDay.length === 0 ? (
        <Card className="border-[#E7E7F0] bg-white text-center py-12">
          <CardContent className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-[#1E1B4B]">No Classes Scheduled</h3>
            <p className="text-sm text-[#5B5875] max-w-sm mx-auto">
              You have no theory or practical laboratory slots scheduled for {selectedDay.toLowerCase()}.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slotsForDay.map((slot: TimetableSlotResponse) => (
            <Card
              key={slot.id}
              className="border-[#E7E7F0] bg-white hover:border-indigo-200 transition-all shadow-sm"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {slot.courseCode}
                      </span>
                      <Badge
                        variant={slot.slotType === 'LAB' ? 'warning' : 'info'}
                        className="text-xs capitalize"
                      >
                        {slot.slotType.toLowerCase()}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-[#1E1B4B] mt-2 line-clamp-1">
                      {slot.courseTitle}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#5B5875] pt-2 border-t border-[#F1F1F7]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="font-medium text-[#1E1B4B]">{slot.formattedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Faculty: {slot.faculty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Venue: {slot.roomOrLink}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
