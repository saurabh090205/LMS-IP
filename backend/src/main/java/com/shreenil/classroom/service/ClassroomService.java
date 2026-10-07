package com.shreenil.classroom.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.shreenil.classroom.domain.LiveClass;
import com.shreenil.classroom.domain.RecordedLecture;
import com.shreenil.classroom.domain.TimetableSlot;
import com.shreenil.classroom.dto.LiveClassResponse;
import com.shreenil.classroom.dto.RecordedLectureResponse;
import com.shreenil.classroom.dto.TimetableSlotResponse;
import com.shreenil.classroom.repository.LiveClassRepository;
import com.shreenil.classroom.repository.RecordedLectureRepository;
import com.shreenil.classroom.repository.TimetableSlotRepository;
import com.shreenil.common.ResourceNotFoundException;
import com.shreenil.profile.domain.StudentProfile;
import com.shreenil.profile.service.StudentProfileService;
import com.shreenil.academic.domain.Course;
import com.shreenil.academic.repository.CourseRepository;
import com.shreenil.classroom.dto.LiveClassCreateRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ClassroomService {
    private static final Logger log = LoggerFactory.getLogger(ClassroomService.class);

    private final LiveClassRepository liveClassRepository;
    private final RecordedLectureRepository recordedLectureRepository;
    private final TimetableSlotRepository timetableSlotRepository;
    private final StudentProfileService studentProfileService;
    private final CourseRepository courseRepository;

    public ClassroomService(LiveClassRepository liveClassRepository,
                             RecordedLectureRepository recordedLectureRepository,
                             TimetableSlotRepository timetableSlotRepository,
                             StudentProfileService studentProfileService,
                             CourseRepository courseRepository) {
        this.liveClassRepository = liveClassRepository;
        this.recordedLectureRepository = recordedLectureRepository;
        this.timetableSlotRepository = timetableSlotRepository;
        this.studentProfileService = studentProfileService;
        this.courseRepository = courseRepository;
    }


    @Transactional(readOnly = true)
    public List<LiveClassResponse> getLiveClasses() {
        return liveClassRepository.findAll().stream()
                .map(this::mapToLiveClassResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LiveClassResponse getLiveClassById(String id) {
        LiveClass liveClass = liveClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LiveClass", "id", id));
        return mapToLiveClassResponse(liveClass);
    }

    @Transactional(readOnly = true)
    public List<RecordedLectureResponse> getRecordedLectures(String courseId) {
        List<RecordedLecture> lectures;
        if (courseId != null && !courseId.isBlank()) {
            lectures = recordedLectureRepository.findByCourseIdOrderByRecordedDateDesc(courseId);
        } else {
            lectures = recordedLectureRepository.findAll();
        }

        return lectures.stream()
                .map(this::mapToRecordedLectureResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RecordedLectureResponse getRecordedLectureById(String id) {
        RecordedLecture lecture = recordedLectureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RecordedLecture", "id", id));
        return mapToRecordedLectureResponse(lecture);
    }

    @Transactional(readOnly = true)
    public List<TimetableSlotResponse> getStudentTimetable() {
        StudentProfile student = studentProfileService.getCurrentStudentProfile();
        List<TimetableSlot> slots = timetableSlotRepository.findByStudentProfileId(student.getId());

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");

        return slots.stream().map(s -> {
            String badge = s.getCourse() != null ? s.getCourse().getBadgeColor() : "blue";
            String courseTitle = s.getCourse() != null ? s.getCourse().getTitle() : "Course";
            String courseCode = s.getCourse() != null ? s.getCourse().getCourseCode() : "CI3001";
            String formattedTime = s.getStartTime().format(timeFormatter) + " - " + s.getEndTime().format(timeFormatter);

            return TimetableSlotResponse.builder()
                    .id(s.getId())
                    .courseId(s.getCourse() != null ? s.getCourse().getId() : null)
                    .courseCode(courseCode)
                    .courseTitle(courseTitle)
                    .dayOfWeek(s.getDayOfWeek())
                    .startTime(s.getStartTime())
                    .endTime(s.getEndTime())
                    .formattedTime(formattedTime)
                    .roomOrLink(s.getRoomOrLink())
                    .faculty(s.getFaculty())
                    .slotType(s.getSlotType())
                    .badgeColor(badge)
                    .build();
        }).collect(Collectors.toList());
    }

    private LiveClassResponse mapToLiveClassResponse(LiveClass lc) {
        return LiveClassResponse.builder()
                .id(lc.getId())
                .courseId(lc.getCourse() != null ? lc.getCourse().getId() : null)
                .courseCode(lc.getCourse() != null ? lc.getCourse().getCourseCode() : "CI3001")
                .courseTitle(lc.getCourse() != null ? lc.getCourse().getTitle() : "Deep Learning")
                .title(lc.getTitle())
                .teacherName(lc.getTeacherName())
                .startTime(lc.getStartTime())
                .endTime(lc.getEndTime())
                .meetingUrl(lc.getMeetingUrl())
                .jitsiRoomName(lc.getJitsiRoomName())
                .status(lc.getStatus())
                .build();
    }

    @Transactional
    public LiveClassResponse createLiveClass(LiveClassCreateRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", request.getCourseId()));

        String roomName = request.getJitsiRoomName() != null && !request.getJitsiRoomName().isBlank()
                ? request.getJitsiRoomName()
                : "vit-lms-" + UUID.randomUUID().toString().substring(0, 8);

        String meetingUrl = request.getMeetingUrl() != null && !request.getMeetingUrl().isBlank()
                ? request.getMeetingUrl()
                : "https://meet.jit.si/" + roomName;

        LiveClass liveClass = LiveClass.builder()
                .id("live-" + UUID.randomUUID().toString().substring(0, 8))
                .course(course)
                .title(request.getTitle())
                .teacherName(request.getTeacherName() != null && !request.getTeacherName().isBlank()
                        ? request.getTeacherName()
                        : "Dr. Elena Rostova")
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .jitsiRoomName(roomName)
                .meetingUrl(meetingUrl)
                .status("SCHEDULED")
                .build();

        liveClass = liveClassRepository.save(liveClass);
        return mapToLiveClassResponse(liveClass);
    }

    @Transactional
    public LiveClassResponse updateClassStatus(String id, String status) {
        LiveClass liveClass = liveClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LiveClass", "id", id));
        liveClass.setStatus(status);
        liveClass = liveClassRepository.save(liveClass);
        return mapToLiveClassResponse(liveClass);
    }

    private RecordedLectureResponse mapToRecordedLectureResponse(RecordedLecture rl) {
        return RecordedLectureResponse.builder()
                .id(rl.getId())
                .courseId(rl.getCourse() != null ? rl.getCourse().getId() : null)
                .courseCode(rl.getCourse() != null ? rl.getCourse().getCourseCode() : "CI3001")
                .courseTitle(rl.getCourse() != null ? rl.getCourse().getTitle() : "Deep Learning")
                .unitId(rl.getUnit() != null ? rl.getUnit().getId() : null)
                .unitTitle(rl.getUnit() != null ? rl.getUnit().getTitle() : null)
                .title(rl.getTitle())
                .videoUrl(rl.getVideoUrl())
                .durationMinutes(rl.getDurationMinutes())
                .recordedDate(rl.getRecordedDate())
                .instructorName(rl.getInstructorName())
                .summaryNotes(rl.getSummaryNotes())
                .build();
    }
}
