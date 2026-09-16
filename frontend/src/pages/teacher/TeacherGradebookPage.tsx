import React, { useState, useEffect } from 'react';
import {
  Award,
  Search,
  Download,
  Filter,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react';
import { gradeService } from '../../services/gradeService';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { useToast } from '../../context/ToastContext';

export default function TeacherGradebookPage() {
  const [selectedCourse, setSelectedCourse] = useState('ci3001');
  const [gradebook, setGradebook] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { addToast } = useToast();

  useEffect(() => {
    loadGradebook();
  }, [selectedCourse]);

  const loadGradebook = async () => {
    const data = await gradeService.getGradebookMatrix(selectedCourse);
    setGradebook(data);
  };

  const students = gradebook?.students || [];
  const assessments = gradebook?.assessments || [];

  const filteredStudents = students
    .filter((s: any) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: any, b: any) =>
      sortOrder === 'desc'
        ? b.totalPercentage - a.totalPercentage
        : a.totalPercentage - b.totalPercentage
    );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <PageHeader
        title="Faculty Gradebook & Assessment Matrix"
        subtitle="Comprehensive breakdown of assignment scores, quiz results, weighted final grades, and cohort statistical averages."
        breadcrumbs={[
          { label: 'Faculty Hub', href: '/teacher/dashboard' },
          { label: 'Gradebook', isCurrent: true },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            leftIcon={Download}
            onClick={() => addToast({ title: 'Export Gradebook', description: 'Downloaded full assessment matrix (CSV).', type: 'info' })}
          >
            Export Gradebook (CSV)
          </Button>
        }
      />

      {/* Course Selector & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E7E7F0]">
        <div className="w-full sm:w-96">
          <Select
            label="Select Course Section"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            options={[
              { label: 'CI3001: Deep Learning (AY 2026-27 • Module V)', value: 'ci3001' },
              { label: 'CI3202: Operating System (AY 2026-27 • Module V)', value: 'ci3202' },
              { label: 'CI3003D: MLOPS (AY 2026-27 • Module V)', value: 'ci3003d' },
              { label: 'CI4001: Generative AI (AY 2026-27 • Module VII)', value: 'ci4001' },
            ]}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto mt-auto">
          <Input
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={Search}
            className="w-full sm:w-64"
          />

          <Button
            size="md"
            variant="outline"
            leftIcon={ArrowUpDown}
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          >
            Sort by GPA ({sortOrder.toUpperCase()})
          </Button>
        </div>
      </div>

      {/* Grade Matrix Table */}
      {gradebook && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Student</TableHead>
              {assessments.map((a: any) => (
                <TableHead key={a.id} className="text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-slate-800">{a.title}</span>
                    <span className="text-[10px] text-slate-400 capitalize font-normal">
                      Max: {a.maxMarks} • {a.weightage}% wt
                    </span>
                  </div>
                </TableHead>
              ))}
              <TableHead className="text-center min-w-[120px]">Overall Average</TableHead>
              <TableHead className="text-center">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student: any) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={student.name} size="sm" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{student.name}</span>
                      <span className="text-xs text-slate-400">{student.email}</span>
                    </div>
                  </div>
                </TableCell>

                {assessments.map((a: any) => {
                  const score = student.grades[a.id];
                  return (
                    <TableCell key={a.id} className="text-center font-mono text-xs">
                      {score !== null && score !== undefined ? (
                        <span className="font-semibold text-slate-900">{score}</span>
                      ) : (
                        <span className="text-slate-400 italic">--</span>
                      )}
                    </TableCell>
                  );
                })}

                <TableCell className="text-center font-bold text-slate-900 text-sm">
                  {student.totalPercentage}%
                </TableCell>

                <TableCell className="text-center">
                  <Badge variant="mint" size="md">
                    {student.letterGrade}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
