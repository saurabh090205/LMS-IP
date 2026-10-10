import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Github,
  ExternalLink,
  Edit2,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  Code,
  Tag,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { studentPortalService, PortfolioProject } from '../../services/studentPortalService';

export default function StudentPortfolioPage() {
  const { addToast } = useToast();
  const [projects, setProjects] = useState<PortfolioProject[]>(() => studentPortalService.getProjects());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [status, setStatus] = useState<'Completed' | 'In Progress' | 'Planning'>('Completed');

  const openAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setCategory('Deep Learning & AI');
    setDescription('');
    setTechStackInput('PyTorch, FastAPI, Docker');
    setGithubUrl('https://github.com/aarav-sharma/my-project');
    setLiveDemoUrl('');
    setStatus('In Progress');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: PortfolioProject) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setCategory(proj.category);
    setDescription(proj.description);
    setTechStackInput(proj.techStack.join(', '));
    setGithubUrl(proj.githubUrl || '');
    setLiveDemoUrl(proj.liveDemoUrl || '');
    setStatus(proj.status);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, projTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${projTitle}"?`)) {
      studentPortalService.deleteProject(id);
      setProjects(studentPortalService.getProjects());
      addToast({
        title: 'Project Deleted',
        description: `"${projTitle}" was removed from your portfolio.`,
        type: 'info',
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      addToast({
        title: 'Validation Error',
        description: 'Please provide both a title and description.',
        type: 'warning',
      });
      return;
    }

    const techStack = techStackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProject) {
      const updated = studentPortalService.updateProject(editingProject.id, {
        title,
        category,
        description,
        techStack,
        githubUrl,
        liveDemoUrl,
        status,
      });
      addToast({
        title: 'Project Updated',
        description: `Changes to "${updated.title}" have been saved.`,
        type: 'success',
      });
    } else {
      const created = studentPortalService.addProject({
        title,
        category,
        description,
        techStack,
        githubUrl,
        liveDemoUrl,
        startDate: '2026-09-01',
        status,
      });
      addToast({
        title: 'Project Added to Portfolio',
        description: `"${created.title}" is now showcased on your profile.`,
        type: 'success',
      });
    }

    setProjects(studentPortalService.getProjects());
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              Engineering Portfolio
            </span>
            <span className="text-xs text-[#6B756F]">B.Tech AI Capstone & Research</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            Projects & Student Portfolio
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Showcase machine learning architectures, published open-source repos, and industrial capstone initiatives.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col justify-between gap-4 hover:border-[#B0E7CB] transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF9F3] text-[#18794E]">
                  {proj.category}
                </span>

                <div className="flex items-center gap-1.5 opacity-90">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-[#18221D] mt-2 group-hover:text-[#18794E] transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs text-[#6B756F] mt-1.5 leading-relaxed">{proj.description}</p>

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {proj.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-[#F6F8F7] text-[#18221D] font-mono text-[10px] border border-[#E5EBE7]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5EBE7] flex items-center justify-between text-xs">
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  proj.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {proj.status}
              </span>

              <div className="flex items-center gap-3">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#18221D] hover:text-[#36B875] flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
                {proj.liveDemoUrl && (
                  <a
                    href={proj.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#36B875] hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#E5EBE7] shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EBE7]">
              <h3 className="text-base font-bold text-[#18221D]">
                {editingProject ? 'Edit Portfolio Project' : 'Add Project to Portfolio'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#18221D] mb-1">Project Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Real-Time Vision Pipeline"
                  required
                  className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs focus:ring-2 focus:ring-[#36B875]/20 focus:border-[#36B875]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#18221D] mb-1">Domain / Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Deep Learning & Robotics"
                  required
                  className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#18221D] mb-1">Description & Impact</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of methodology, architecture, and performance..."
                  required
                  className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#18221D] mb-1">Tech Stack (Comma-separated)</label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="PyTorch, Docker, C++, FastAPI"
                  className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#18221D] mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#18221D] mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E5EBE7] rounded-xl text-xs"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Planning">Planning</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5EBE7] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint cursor-pointer"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
