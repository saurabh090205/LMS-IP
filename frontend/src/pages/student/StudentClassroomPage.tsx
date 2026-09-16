import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { classroomApi } from '../../services/api/classroomApi';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Video, Play, Clock, User } from 'lucide-react';
import type { LiveClassResponse, RecordedLectureResponse } from '../../types/api';

export default function StudentClassroomPage() {
  const [activeTab, setActiveTab] = useState<'live' | 'recordings'>('live');
  const [activeJitsiRoom, setActiveJitsiRoom] = useState<string | null>(null);

  const { data: liveClasses = [], isLoading: loadingClasses } = useQuery<LiveClassResponse[]>({
    queryKey: ['student-live-classes'],
    queryFn: classroomApi.getMyClasses,
  });

  const { data: recordings = [], isLoading: loadingRecordings } = useQuery<RecordedLectureResponse[]>({
    queryKey: ['student-recordings'],
    queryFn: () => classroomApi.getRecordings(),
  });

  const handleJoinClass = (liveClass: LiveClassResponse) => {
    setActiveJitsiRoom(liveClass.jitsiRoomName);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E7E7F0] shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            Virtual Campus
          </span>
          <h1 className="text-2xl font-bold text-[#1E1B4B] tracking-tight mt-2">
            Virtual Classroom & Recorded Lectures
          </h1>
          <p className="text-sm text-[#5B5875] mt-1">
            Join live interactive lecture sessions or review recorded lectures with AI summaries
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-[#F6F6FB] p-1 rounded-xl border border-[#E7E7F0]">
          <button
            onClick={() => { setActiveTab('live'); setActiveJitsiRoom(null); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'live' ? 'bg-white text-indigo-700 shadow-sm' : 'text-[#5B5875] hover:text-[#1E1B4B]'
            }`}
          >
            Live Classes
          </button>
          <button
            onClick={() => { setActiveTab('recordings'); setActiveJitsiRoom(null); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'recordings' ? 'bg-white text-indigo-700 shadow-sm' : 'text-[#5B5875] hover:text-[#1E1B4B]'
            }`}
          >
            Recorded Archive
          </button>
        </div>
      </div>

      {/* Embedded Jitsi Meeting Frame when active */}
      {activeJitsiRoom && (
        <Card className="border-indigo-200 bg-white overflow-hidden shadow-lg">
          <CardHeader className="bg-indigo-900 text-white flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <CardTitle className="text-sm text-white font-semibold">
                Live Classroom • Room: {activeJitsiRoom}
              </CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveJitsiRoom(null)}
              className="text-xs text-white border-indigo-400 hover:bg-indigo-800"
            >
              Leave Session
            </Button>
          </CardHeader>
          <CardContent className="p-0 bg-slate-900">
            <iframe
              src={`https://meet.jit.si/${activeJitsiRoom}`}
              title="Jitsi Virtual Classroom"
              className="w-full h-[540px] border-none"
              allow="camera; microphone; fullscreen; display-capture; autoplay"
            />
          </CardContent>
        </Card>
      )}

      {/* Tab Content */}
      {activeTab === 'live' ? (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#1E1B4B]">Scheduled Live Sessions</h2>

          {loadingClasses ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E7E7F0]">
              <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-sm text-[#5B5875]">Loading live classes...</p>
            </div>
          ) : liveClasses.length === 0 ? (
            <Card className="border-[#E7E7F0] bg-white text-center py-12">
              <CardContent>
                <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-[#1E1B4B]">No Active Live Classes</h3>
                <p className="text-xs text-[#5B5875] mt-1">Check your timetable for upcoming scheduled sessions.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveClasses.map((lc: LiveClassResponse) => (
                <Card
                  key={lc.id}
                  className="border-[#E7E7F0] bg-white hover:border-indigo-300 transition-all shadow-sm"
                >
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                          {lc.courseCode}
                        </span>
                        <h3 className="text-base font-bold text-[#1E1B4B]">{lc.title}</h3>
                        <p className="text-xs text-[#5B5875]">{lc.courseTitle}</p>
                      </div>
                      <Badge
                        variant={lc.status === 'LIVE' ? 'danger' : 'neutral'}
                        className="text-xs"
                      >
                        {lc.status}
                      </Badge>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#5B5875] pt-2 border-t border-[#F1F1F7]">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Instructor: {lc.teacherName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(lc.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleJoinClass(lc)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-2 rounded-xl"
                    >
                      <Video className="w-4 h-4" />
                      Join Classroom (Jitsi)
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#1E1B4B]">Lecture Recording Archive</h2>

          {loadingRecordings ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E7E7F0]">
              <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-sm text-[#5B5875]">Loading archive...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recordings.map((rec: RecordedLectureResponse) => (
                <Card
                  key={rec.id}
                  className="border-[#E7E7F0] bg-white hover:border-indigo-200 transition-all shadow-sm"
                >
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                          {rec.courseCode}
                        </span>
                        <h3 className="text-base font-bold text-[#1E1B4B]">{rec.title}</h3>
                        <p className="text-xs text-[#5B5875]">{rec.courseTitle}</p>
                      </div>
                      <Badge variant="blue" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {rec.durationMinutes}m
                      </Badge>
                    </div>

                    {rec.summaryNotes && (
                      <p className="text-xs text-[#5B5875] line-clamp-2 bg-[#F6F6FB] p-2.5 rounded-lg border border-[#E7E7F0]">
                        {rec.summaryNotes}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-[#F1F1F7] text-xs text-[#5B5875]">
                      <span>{rec.instructorName}</span>
                      <span>{rec.recordedDate}</span>
                    </div>

                    <a
                      href={rec.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs font-semibold transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-indigo-700" />
                      Play Lecture (Demo Stream)
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
