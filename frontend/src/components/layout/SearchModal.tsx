import React, { useState, useEffect } from 'react';
import { Search, BookOpen, User, Calendar, Award, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = [
    { title: 'CS-301: Advanced Neural Networks', type: 'Course', icon: BookOpen, href: '/student/dashboard' },
    { title: 'Assignment: Transformer Architecture Lab', type: 'Assignment', icon: Calendar, href: '/student/dashboard' },
    { title: 'Dr. Elena Rostova', type: 'Faculty', icon: User, href: '/profile' },
    { title: 'Gradebook & Term Transcripts', type: 'Academic', icon: Award, href: '/student/dashboard' },
  ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" showCloseButton={false}>
      <div className="flex flex-col -m-6">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E7E7F0] bg-[#F6F6FB]">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, assignments, professors, transcripts..."
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-80 overflow-y-auto flex flex-col gap-1">
          {searchResults.length > 0 ? (
            searchResults.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.href)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F6F6FB] transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] border border-[#D0D7FF] text-[#4F46E5] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800 group-hover:text-[#4F46E5] transition-colors">
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-400">{item.type}</span>
                    </div>
                  </div>
                  <Badge variant="neutral" size="sm">
                    Select <ArrowRight className="w-3 h-3 ml-1" />
                  </Badge>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching records found for "{query}".
            </div>
          )}
        </div>

        {/* Modal Footer Keybinds */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#F6F6FB] border-t border-[#E7E7F0] text-[11px] text-slate-400">
          <span>Navigation Quick Search</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-[#E7E7F0] shadow-xs font-mono text-slate-500">ESC</kbd> to close
          </div>
        </div>
      </div>
    </Modal>
  );
};
