import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { libraryApi } from '../../services/api/libraryApi';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Library, Search, ExternalLink } from 'lucide-react';
import type { LibraryItemResponse } from '../../types/api';

const CATEGORIES = ['All', 'Deep Learning', 'Systems', 'MLOps', 'Algorithms', 'AI Ethics'];

export default function StudentLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: libraryItems = [], isLoading } = useQuery<LibraryItemResponse[]>({
    queryKey: ['library-items', searchQuery, selectedCategory],
    queryFn: () =>
      libraryApi.getItems({
        query: searchQuery || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
      }),
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E7E7F0] shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            Digital Academic Repository
          </span>
          <h1 className="text-2xl font-bold text-[#1E1B4B] tracking-tight mt-2">
            University Library & Literature
          </h1>
          <p className="text-sm text-[#5B5875] mt-1">
            Access textbooks, research papers, lab manuals, and reference literature mapped to your syllabus
          </p>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search books, authors, papers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-[#E7E7F0] rounded-xl focus:outline-none focus:border-indigo-500 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-[#5B5875] hover:bg-slate-50 border border-[#E7E7F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      {isLoading ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E7E7F0]">
          <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm text-[#5B5875]">Loading digital library catalogue...</p>
        </div>
      ) : libraryItems.length === 0 ? (
        <Card className="border-[#E7E7F0] bg-white text-center py-12">
          <CardContent>
            <Library className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[#1E1B4B]">No Books or Papers Found</h3>
            <p className="text-xs text-[#5B5875] mt-1">Try refining your search keyword or selected category.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {libraryItems.map((item: LibraryItemResponse) => (
            <Card
              key={item.id}
              className="border-[#E7E7F0] bg-white hover:border-indigo-200 transition-all shadow-sm flex flex-col justify-between"
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="info" className="text-xs">
                    {item.itemType}
                  </Badge>
                  {item.publishedYear && (
                    <span className="text-xs text-slate-400 font-medium">{item.publishedYear}</span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#1E1B4B] line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-[#5B5875] mt-1">By {item.author}</p>
                </div>

                {item.description && (
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                )}

                <div className="pt-3 border-t border-[#F1F1F7] flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  {item.resourceUrl && (
                    <a
                      href={item.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      Open Resource <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
