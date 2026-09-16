import { CourseAnnouncement } from '../../types/lms';

const dlAnnouncements: CourseAnnouncement[] = [
  {
    id: 'ann-1',
    courseId: 'ci3001',
    authorId: 'usr_tch_202',
    authorName: 'Dr. Elena Rostova',
    authorRole: 'Professor & Course Lead',
    title: 'Practical 2 (MLP Classification) Google Colab & GPU Access Notes',
    content: 'Welcome to Week 3 of Deep Learning (CI3001)! For Practical 2 (MLP classification on Iris/Wine datasets), ensure you use categorical cross-entropy loss with Adam optimizer. The Colab starter template and evaluation metrics notebook are now live. Submit your .ipynb file before the deadline.',
    publishedAt: 'Yesterday at 9:00 AM',
    isPinned: true,
    repliesCount: 8,
  },
  {
    id: 'ann-2',
    courseId: 'ci3001',
    authorId: 'usr_tch_202',
    authorName: 'Dr. Elena Rostova',
    authorRole: 'Professor & Course Lead',
    title: 'AY 2026-27 Course Project Area Selection Open (18 Topics)',
    content: 'The official list of 18 Capstone Course Project areas (Plant Disease Detection, Brain Tumor Classification, Deepfake Detection, Speech Emotion, Multilingual Chatbots, etc.) is now open for team registration. Form groups of 3–4 students and register your synopsis with the department.',
    publishedAt: '3 days ago',
    isPinned: false,
    repliesCount: 14,
  },
];

export const mockAnnouncements: Record<string, CourseAnnouncement[]> = {
  ci3001: dlAnnouncements,
  cs301: dlAnnouncements,
};
