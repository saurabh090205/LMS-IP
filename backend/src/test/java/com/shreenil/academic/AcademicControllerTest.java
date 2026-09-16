package com.shreenil.academic;

import com.shreenil.academic.domain.*;
import com.shreenil.academic.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AcademicControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private InstitutionRepository institutionRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private AcademicYearRepository academicYearRepository;

    @Autowired
    private AcademicModuleRepository academicModuleRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UnitRepository unitRepository;

    @BeforeEach
    void setUp() {
        if (institutionRepository.count() == 0) {
            Institution inst = institutionRepository.save(Institution.builder()
                    .id("inst-vit")
                    .tenantId("tenant-default")
                    .name("Vishwakarma Institute of Technology")
                    .code("VIT")
                    .location("Pune, India")
                    .build());

            Program prog = programRepository.save(Program.builder()
                    .id("prog-btech-cse-ai")
                    .institution(inst)
                    .name("B.Tech Computer Science & Engineering (Artificial Intelligence)")
                    .code("BTECH-CSE-AI")
                    .degree("B.Tech")
                    .department("Computer Engineering")
                    .durationYears(4)
                    .build());

            AcademicYear year = academicYearRepository.save(AcademicYear.builder()
                    .id("year-2026-27")
                    .program(prog)
                    .yearCode("2026-27")
                    .yearNumber(3)
                    .isCurrent(true)
                    .build());

            AcademicModule module = academicModuleRepository.save(AcademicModule.builder()
                    .id("module-v")
                    .academicYear(year)
                    .name("Module V (Semester 5)")
                    .moduleCode("MODULE-V")
                    .semester(5)
                    .build());

            Course course = courseRepository.save(Course.builder()
                    .id("course-dl")
                    .academicModule(module)
                    .courseCode("CI3001")
                    .courseStructureCode("CI3001")
                    .syllabusCode("CI3001")
                    .title("Deep Learning")
                    .credits(BigDecimal.valueOf(4.0))
                    .theoryHours(3)
                    .labHours(2)
                    .tutorialHours(0)
                    .department("CSE(AI)")
                    .badgeColor("indigo")
                    .build());

            unitRepository.save(Unit.builder()
                    .id("unit-dl-1")
                    .course(course)
                    .unitNumber(1)
                    .title("Fundamentals of Deep Learning")
                    .theoryHours(6)
                    .coMapping("CO1")
                    .build());
        }
    }

    @Test
    @DisplayName("GET /api/v1/academic/programs returns programs")
    void shouldReturnPrograms() throws Exception {
        mockMvc.perform(get("/api/v1/academic/programs")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(greaterThanOrEqualTo(1))));
    }

    @Test
    @DisplayName("GET /api/v1/academic/courses returns list of courses")
    void shouldReturnCourses() throws Exception {
        mockMvc.perform(get("/api/v1/academic/courses")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(greaterThanOrEqualTo(1))));
    }

    @Test
    @DisplayName("GET /api/v1/academic/courses/{id} returns course details with units")
    void shouldReturnCourseDetails() throws Exception {
        mockMvc.perform(get("/api/v1/academic/courses/course-deep-learning")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.courseCode", is("CI3001")))
                .andExpect(jsonPath("$.data.title", is("Deep Learning")));
    }
}
