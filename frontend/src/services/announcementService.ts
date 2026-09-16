import { CourseAnnouncement } from '../types/lms';
import { mockAnnouncements } from '../features/announcements/mockData';

class AnnouncementService {
  private announcementsMap = { ...mockAnnouncements };

  async getAnnouncements(courseId: string): Promise<CourseAnnouncement[]> {
    return this.announcementsMap[courseId] || [];
  }

  async postAnnouncement(courseId: string, authorId: string, authorName: string, authorRole: string, title: string, content: string, isPinned = false): Promise<CourseAnnouncement> {
    if (!this.announcementsMap[courseId]) {
      this.announcementsMap[courseId] = [];
    }
    const newAnn: CourseAnnouncement = {
      id: `ann-${Date.now()}`,
      courseId,
      authorId,
      authorName,
      authorRole,
      title,
      content,
      publishedAt: 'Just now',
      isPinned,
      repliesCount: 0,
    };
    this.announcementsMap[courseId].unshift(newAnn);
    return newAnn;
  }
}

export const announcementService = new AnnouncementService();
