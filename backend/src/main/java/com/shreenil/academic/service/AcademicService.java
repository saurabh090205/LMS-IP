package com.shreenil.academic.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.shreenil.academic.domain.*;
import com.shreenil.academic.dto.*;
import com.shreenil.academic.repository.CourseRepository;
import com.shreenil.academic.repository.ProgramRepository;
import com.shreenil.academic.repository.TopicRepository;
import com.shreenil.academic.repository.UnitRepository;
import com.shreenil.common.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AcademicService {
    private static final Logger log = LoggerFactory.getLogger(AcademicService.class);


    private final ProgramRepository programRepository;
    private final CourseRepository courseRepository;
    private final UnitRepository unitRepository;
    private final TopicRepository topicRepository;

    public AcademicService(ProgramRepository programRepository,
                             CourseRepository courseRepository,
                             UnitRepository unitRepository,
                             TopicRepository topicRepository) {
        this.programRepository = programRepository;
        this.courseRepository = courseRepository;
        this.unitRepository = unitRepository;
        this.topicRepository = topicRepository;
    }


    @Transactional(readOnly = true)
    public List<ProgramResponse> getPrograms() {
        return programRepository.findAll().stream()
                .map(this::mapToProgramResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CourseSummaryResponse> getCourses(String programId) {
        List<Course> courses;
        if (programId != null && !programId.isBlank()) {
            courses = courseRepository.findByProgramId(programId);
        } else {
            courses = courseRepository.findAll();
        }

        return courses.stream()
                .map(this::mapToCourseSummary)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CourseDetailResponse getCourseById(String courseId) {
        Course course = courseRepository.findById(courseId)
                .or(() -> courseRepository.findByCourseCode(courseId))
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));

        return mapToCourseDetail(course);
    }

    @Transactional(readOnly = true)
    public List<UnitResponse> getCourseUnits(String courseId) {
        List<Unit> units = unitRepository.findByCourseIdOrderByUnitNumberAsc(courseId);
        return units.stream()
                .map(this::mapToUnitResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TopicResponse> getUnitTopics(String unitId) {
        List<Topic> topics = topicRepository.findByUnitIdOrderByTopicNumberAsc(unitId);
        return topics.stream()
                .map(this::mapToTopicResponse)
                .collect(Collectors.toList());
    }

    private ProgramResponse mapToProgramResponse(Program program) {
        return ProgramResponse.builder()
                .id(program.getId())
                .name(program.getName())
                .code(program.getCode())
                .degree(program.getDegree())
                .department(program.getDepartment())
                .durationYears(program.getDurationYears())
                .institutionName(program.getInstitution() != null ? program.getInstitution().getName() : "VIT Pune")
                .institutionCode(program.getInstitution() != null ? program.getInstitution().getCode() : "VIT")
                .build();
    }

    private CourseSummaryResponse mapToCourseSummary(Course course) {
        int unitCount = course.getUnits() != null ? course.getUnits().size() : 0;
        int totalTopics = course.getUnits() != null ?
                course.getUnits().stream().mapToInt(u -> u.getTopics() != null ? u.getTopics().size() : 0).sum() : 0;

        // Mock realistic progress based on course code
        int progress = 0;
        if ("CI3001".equalsIgnoreCase(course.getCourseCode())) progress = 68;
        else if ("CI3202".equalsIgnoreCase(course.getCourseCode())) progress = 82;
        else if ("CI3003D".equalsIgnoreCase(course.getCourseCode())) progress = 45;
        else if ("CI3203B".equalsIgnoreCase(course.getCourseCode())) progress = 30;
        else if ("CI3203A".equalsIgnoreCase(course.getCourseCode())) progress = 90;
        else if ("CI3203C".equalsIgnoreCase(course.getCourseCode())) progress = 55;

        String semester = course.getAcademicModule() != null ? "Sem " + course.getAcademicModule().getSemester() : "Sem 5";
        String moduleCode = course.getAcademicModule() != null ? course.getAcademicModule().getModuleCode() : "Module V";

        return CourseSummaryResponse.builder()
                .id(course.getId())
                .courseCode(course.getCourseCode())
                .courseStructureCode(course.getCourseStructureCode())
                .syllabusCode(course.getSyllabusCode())
                .title(course.getTitle())
                .credits(course.getCredits())
                .theoryHours(course.getTheoryHours())
                .labHours(course.getLabHours())
                .tutorialHours(course.getTutorialHours())
                .department(course.getDepartment())
                .badgeColor(course.getBadgeColor())
                .totalUnits(unitCount)
                .totalTopics(totalTopics)
                .studentProgressPercent(progress)
                .semester(semester)
                .moduleCode(moduleCode)
                .build();
    }

    private CourseDetailResponse mapToCourseDetail(Course course) {
        List<UnitResponse> unitResponses = course.getUnits().stream()
                .map(this::mapToUnitResponse)
                .collect(Collectors.toList());

        List<PracticalResponse> practicalResponses = course.getPracticals().stream()
                .map(p -> PracticalResponse.builder()
                        .id(p.getId())
                        .experimentNumber(p.getExperimentNumber())
                        .title(p.getTitle())
                        .description(p.getDescription())
                        .mappedUnits(p.getMappedUnits())
                        .build())
                .collect(Collectors.toList());

        List<CourseOutcomeResponse> coResponses = course.getCourseOutcomes().stream()
                .map(co -> CourseOutcomeResponse.builder()
                        .id(co.getId())
                        .coNumber(co.getCoNumber())
                        .coCode(co.getCoCode())
                        .description(co.getDescription())
                        .bloomsLevel(co.getBloomsLevel())
                        .build())
                .collect(Collectors.toList());

        int progress = "CI3001".equalsIgnoreCase(course.getCourseCode()) ? 68 : 50;

        return CourseDetailResponse.builder()
                .id(course.getId())
                .courseCode(course.getCourseCode())
                .courseStructureCode(course.getCourseStructureCode())
                .syllabusCode(course.getSyllabusCode())
                .title(course.getTitle())
                .credits(course.getCredits())
                .theoryHours(course.getTheoryHours())
                .labHours(course.getLabHours())
                .tutorialHours(course.getTutorialHours())
                .department(course.getDepartment())
                .badgeColor(course.getBadgeColor())
                .prerequisites(course.getPrerequisites())
                .objectives(course.getObjectives())
                .courseRelevance(course.getCourseRelevance())
                .assessmentScheme(course.getAssessmentScheme())
                .textbooks(course.getTextbooks())
                .referenceBooks(course.getReferenceBooks())
                .moocsResources(course.getMoocsResources())
                .units(unitResponses)
                .practicals(practicalResponses)
                .courseOutcomes(coResponses)
                .studentProgressPercent(progress)
                .build();
    }

    private UnitResponse mapToUnitResponse(Unit unit) {
        List<TopicResponse> topicResponses = unit.getTopics().stream()
                .map(this::mapToTopicResponse)
                .collect(Collectors.toList());

        return UnitResponse.builder()
                .id(unit.getId())
                .courseId(unit.getCourse().getId())
                .unitNumber(unit.getUnitNumber())
                .title(unit.getTitle())
                .theoryHours(unit.getTheoryHours())
                .coMapping(unit.getCoMapping())
                .topicsCount(topicResponses.size())
                .topics(topicResponses)
                .build();
    }

    private TopicResponse mapToTopicResponse(Topic topic) {
        List<LearningResourceResponse> resources = topic.getResources().stream()
                .map(r -> LearningResourceResponse.builder()
                        .id(r.getId())
                        .title(r.getTitle())
                        .resourceType(r.getResourceType())
                        .resourceUrl(r.getResourceUrl())
                        .contentText(r.getContentText())
                        .durationMinutes(r.getDurationMinutes())
                        .isOfficialSyllabus(r.getIsOfficialSyllabus())
                        .attributionLabel(r.getAttributionLabel())
                        .build())
                .collect(Collectors.toList());

        String status = resources.isEmpty() ? "NOT_STARTED" : "COMPLETED";

        return TopicResponse.builder()
                .id(topic.getId())
                .unitId(topic.getUnit().getId())
                .topicNumber(topic.getTopicNumber())
                .title(topic.getTitle())
                .description(topic.getDescription())
                .estimatedMinutes(topic.getEstimatedMinutes())
                .resources(resources)
                .hasResources(!resources.isEmpty())
                .status(status)
                .build();
    }
}
