import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  User,
  Search,
  Bell,
  Sparkles,
  Mail,
  CheckCheck,
  Plus,
  X,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface MessageThread {
  id: string;
  senderName: string;
  senderRole: string;
  avatar: string;
  subject: string;
  snippet: string;
  timestamp: string;
  isUnread: boolean;
  messages: { sender: string; text: string; time: string; isMe: boolean }[];
}

const initialThreads: MessageThread[] = [
  {
    id: 'th-1',
    senderName: 'Dr. Elena Rostova',
    senderRole: 'Course Coordinator — Deep Learning',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    subject: 'Feedback on Practical 2 (MLP) Backprop Implementation',
    snippet: 'Aarav, your vectorization optimization in NumPy was outstanding. Feel free to present it in the seminar.',
    timestamp: '10:30 AM',
    isUnread: true,
    messages: [
      { sender: 'Dr. Elena Rostova', text: 'Hello Aarav, I reviewed your PR for the NumPy MLP lab.', time: '10:25 AM', isMe: false },
      { sender: 'Dr. Elena Rostova', text: 'Your vectorization optimization was outstanding. Feel free to present it in the seminar.', time: '10:30 AM', isMe: false },
    ],
  },
  {
    id: 'th-2',
    senderName: 'Prof. Rajesh Kulkarni',
    senderRole: 'Faculty Guide — MLOPS',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    subject: 'Kubeflow Pipeline Cluster Access Tokens',
    snippet: 'The GPU cluster node has been allocated for your team capstone project. Check credentials.',
    timestamp: 'Yesterday',
    isUnread: false,
    messages: [
      { sender: 'Prof. Rajesh Kulkarni', text: 'The GPU cluster node has been allocated for your team capstone project. Check credentials in your dashboard.', time: 'Yesterday', isMe: false },
    ],
  },
];

export default function StudentCommunicationsPage() {
  const { addToast } = useToast();
  const [threads, setThreads] = useState<MessageThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>(initialThreads[0].id);
  const [replyText, setReplyText] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState('Dr. Elena Rostova');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      sender: 'Aarav Sharma',
      text: replyText.trim(),
      time: 'Just now',
      isMe: true,
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? { ...t, snippet: replyText.trim(), messages: [...t.messages, newMsg] }
          : t
      )
    );
    setReplyText('');
    addToast({
      title: 'Message Sent',
      description: 'Your message has been delivered to the faculty thread.',
      type: 'success',
    });
  };

  const handleCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeSubject || !composeBody) return;

    const newThread: MessageThread = {
      id: `th-${Date.now()}`,
      senderName: composeTo,
      senderRole: 'Faculty Guide',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      subject: composeSubject,
      snippet: composeBody,
      timestamp: 'Just now',
      isUnread: false,
      messages: [
        { sender: 'Aarav Sharma', text: composeBody, time: 'Just now', isMe: true },
      ],
    };

    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
    setIsComposeOpen(false);
    setComposeSubject('');
    setComposeBody('');
    addToast({
      title: 'New Conversation Started',
      description: `Dispatched to ${composeTo}`,
      type: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              Direct Faculty & Mentor Messaging
            </span>
            <span className="text-xs text-[#6B756F]">VIT Institutional Directory</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            Communication Centre
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Connect directly with course professors, lab instructors, and student council executives.
          </p>
        </div>

        <button
          onClick={() => setIsComposeOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Compose New Message</span>
        </button>
      </div>

      {/* Main Two-Column Inbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left Column: Thread List (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E5EBE7] shadow-card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#E5EBE7]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#18221D]">Conversations</h3>
          </div>

          <div className="divide-y divide-[#E5EBE7] flex-1 overflow-y-auto no-scrollbar">
            {threads.map((thread) => {
              const isSelected = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`p-4 transition-colors cursor-pointer flex items-start gap-3 ${
                    isSelected ? 'bg-[#EFF9F3]' : 'hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={thread.avatar}
                    alt={thread.senderName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#B0E7CB] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#18221D] truncate">{thread.senderName}</h4>
                      <span className="text-[10px] text-[#6B756F] shrink-0">{thread.timestamp}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-[#18794E] truncate mt-0.5">{thread.subject}</p>
                    <p className="text-xs text-[#6B756F] truncate mt-0.5">{thread.snippet}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Window (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col justify-between overflow-hidden">
          {/* Thread Header */}
          <div className="p-4 border-b border-[#E5EBE7] flex items-center gap-3 bg-slate-50/50">
            <img
              src={activeThread.avatar}
              alt={activeThread.senderName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xs font-bold text-[#18221D]">{activeThread.senderName}</h3>
              <span className="text-[11px] text-[#6B756F]">{activeThread.senderRole}</span>
            </div>
          </div>

          {/* Messages Bubble Area */}
          <div className="p-5 space-y-4 flex-1 overflow-y-auto">
            {activeThread.messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                    m.isMe
                      ? 'bg-[#36B875] text-white rounded-br-xs'
                      : 'bg-[#F6F8F7] text-[#18221D] border border-[#E5EBE7] rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} className="p-3 border-t border-[#E5EBE7] flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your response to faculty..."
              className="flex-1 px-4 py-2 bg-[#F6F8F7] border border-[#E5EBE7] rounded-xl text-xs focus:ring-2 focus:ring-[#36B875]/20 focus:border-[#36B875] outline-none"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* COMPOSE MESSAGE MODAL */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl border border-[#E5EBE7] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EBE7]">
              <h3 className="text-base font-bold text-[#18221D]">Compose Message</h3>
              <button onClick={() => setIsComposeOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCompose} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#18221D] mb-1">Recipient</label>
                <select
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs"
                >
                  <option value="Dr. Elena Rostova">Dr. Elena Rostova (Deep Learning)</option>
                  <option value="Prof. Rajesh Kulkarni">Prof. Rajesh Kulkarni (MLOPS)</option>
                  <option value="Dr. Anita Deshmukh">Dr. Anita Deshmukh (Operating Systems)</option>
                  <option value="Dr. Sameer Joshi">Dr. Sameer Joshi (Distributed Learning)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#18221D] mb-1">Subject</label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  placeholder="Subject of inquiry..."
                  required
                  className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#18221D] mb-1">Message Body</label>
                <textarea
                  rows={4}
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  placeholder="Write message..."
                  required
                  className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint"
                >
                  Dispatch Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
