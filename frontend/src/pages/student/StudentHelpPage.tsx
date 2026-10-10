import React, { useState } from 'react';
import {
  HelpCircle,
  MessageCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How is attendance calculated across theory and practical lab batches?',
    answer: 'Attendance is calculated dynamically from recorded RFID/biometric and LMS records. Minimum 75% aggregate attendance is mandatory per autonomous VIT Pune academic regulations to appear in end-semester examinations.',
  },
  {
    question: 'How do I submit an excused leave request for medical or event absences?',
    answer: 'Navigate to the Attendance section and click "Submit Leave Request". Attach supporting hospital certificates or faculty advisor permissions. The request will be reviewed by your division class teacher.',
  },
  {
    question: 'Can I resubmit an assignment after the due date?',
    answer: 'Assignment submissions after the deadline are subject to late-penalty policies set by the course instructor. If the submission window remains open, subsequent uploads overwrite the previous draft.',
  },
  {
    question: 'Where can I access past semester official grade cards?',
    answer: 'Go to Examinations & Results, switch to the "Evaluated Results" tab, and select the desired academic period from the dropdown. You can also print the verified official report card transcript.',
  },
];

export default function StudentHelpPage() {
  const { addToast } = useToast();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [category, setCategory] = useState('Academic Curriculum');
  const [priority, setPriority] = useState('Medium');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      addToast({
        title: 'Validation Error',
        description: 'Please complete both the subject and inquiry description.',
        type: 'warning',
      });
      return;
    }

    addToast({
      title: 'Support Ticket Logged (Demo Mode)',
      description: `Ticket #${Math.floor(100000 + Math.random() * 900000)} has been queued. Note: in mock mode this is simulated locally.`,
      type: 'info',
    });
    setSubject('');
    setMessage('');
  };

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              Student Support Services
            </span>
            <span className="text-xs text-[#6B756F]">VIT Pune Academic Helpdesk</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            Help Centre & Academic FAQs
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Find immediate answers to common academic workflows or log a support ticket with the university registrar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: FAQs (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5EBE7]">
            <HelpCircle className="w-5 h-5 text-[#36B875]" />
            <h3 className="text-sm font-bold text-[#18221D]">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#E5EBE7] rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left text-xs font-bold text-[#18221D] flex items-center justify-between gap-3 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-1 bg-[#F6F8F7] text-xs text-[#6B756F] leading-relaxed border-t border-[#E5EBE7]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Contact Support Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5EBE7]">
            <MessageCircle className="w-5 h-5 text-[#36B875]" />
            <h3 className="text-sm font-bold text-[#18221D]">Submit Support Ticket</h3>
          </div>

          <form onSubmit={handleTicketSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-[#18221D] mb-1">Inquiry Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-[#F6F8F7] border border-[#E5EBE7] rounded-xl text-xs"
              >
                <option value="Academic Curriculum">Academic Curriculum & Syllabus</option>
                <option value="Attendance Discrepancy">Attendance Record Verification</option>
                <option value="Examination & Hall Ticket">Examination & Hall Ticket</option>
                <option value="Fee Receipt & Ledger">Fee Receipt & Bursar Queries</option>
                <option value="Technical Portal Bug">Technical Portal / IT Issue</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#18221D] mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2.5 bg-[#F6F8F7] border border-[#E5EBE7] rounded-xl text-xs"
              >
                <option value="Low">Low (General Inquiry)</option>
                <option value="Medium">Medium (Standard Request)</option>
                <option value="High">High (Urgent Examination / Medical)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#18221D] mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of request..."
                required
                className="w-full p-2.5 bg-[#F6F8F7] border border-[#E5EBE7] rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#18221D] mb-1">Detailed Description</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain the circumstance clearly..."
                required
                className="w-full p-2.5 bg-[#F6F8F7] border border-[#E5EBE7] rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Ticket</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
