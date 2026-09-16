import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { aiApi } from '../../services/api/aiApi';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Sparkles, Send, Bot, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import type { AiChatResponse } from '../../types/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedActions?: string[];
  references?: string[];
}

export default function StudentAiMentorPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello Aarav! I am your Shreenil AI Learning Mentor, synced with your VIT B.Tech CSE (AI) Semester V curriculum. How can I assist you with Deep Learning, MLOps, or exam preparation today?',
      suggestedActions: [
        'Explain Backpropagation in Deep Learning (Unit II)',
        'Review upcoming Homework deadlines',
        'Help prepare for In-Semester Evaluation',
      ],
      references: ['VIT B.Tech CSE (AI) AY 2026-27 Syllabus'],
    },
  ]);

  const mutation = useMutation({
    mutationFn: (text: string) =>
      aiApi.chat({
        message: text,
        courseCode: 'CI3001',
      }),
    onSuccess: (data: AiChatResponse) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'assistant',
          text: data.message,
          suggestedActions: data.suggestedActions,
          references: data.referenceTopics,
        },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'assistant',
          text: 'I encountered an issue connecting to the AI Mentor service. Please try asking your question again.',
        },
      ]);
    },
  });

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || mutation.isPending) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: text.trim(),
      },
    ]);

    if (!textToSend) setInputMessage('');
    mutation.mutate(text.trim());
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E7E7F0] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#1E1B4B]">Shreenil AI Mentor</h1>
              <Badge variant="primary" className="text-xs">
                Backend Integrated
              </Badge>
            </div>
            <p className="text-xs text-[#5B5875] mt-0.5">
              Personalized academic tutoring grounded strictly in your official VIT curriculum
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <Card className="border-[#E7E7F0] bg-white shadow-sm flex flex-col h-[540px]">
        {/* Messages Stream */}
        <CardContent className="p-6 flex-1 overflow-y-auto space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-[#F6F6FB] text-[#1E1B4B] border border-[#E7E7F0] rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 border-t border-[#E7E7F0]/60 space-y-1.5">
                    <p className="font-semibold text-[#5B5875] flex items-center gap-1 text-[11px]">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Suggested Inquiries:
                    </p>
                    <div className="flex flex-col gap-1">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(action)}
                          className="text-left py-1 px-2.5 rounded-lg bg-white hover:bg-indigo-50 text-indigo-700 border border-[#E7E7F0] transition-colors text-[11px] flex items-center justify-between group"
                        >
                          <span>{action}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {msg.references && msg.references.length > 0 && (
                  <div className="text-[10px] text-[#5B5875] flex items-center gap-1 pt-1">
                    <BookOpen className="w-3 h-3" />
                    <span>References: {msg.references.join(', ')}</span>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  AS
                </div>
              )}
            </div>
          ))}

          {mutation.isPending && (
            <div className="flex gap-3 justify-start items-center text-xs text-[#5B5875]">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <span className="animate-pulse">AI Mentor is analyzing syllabus concepts...</span>
            </div>
          )}
        </CardContent>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#E7E7F0] bg-white rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question about your VIT coursework (e.g. Backpropagation, CNN, ResNet)..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs bg-[#F6F6FB] border border-[#E7E7F0] rounded-xl focus:outline-none focus:border-indigo-500"
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || mutation.isPending}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 rounded-xl gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
