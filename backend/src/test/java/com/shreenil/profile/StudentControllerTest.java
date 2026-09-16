package com.shreenil.profile;

import com.shreenil.profile.domain.StudentProfile;
import com.shreenil.profile.repository.StudentProfileRepository;
import com.shreenil.user.domain.User;
import com.shreenil.user.repository.UserRepository;
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

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private com.shreenil.academic.repository.InstitutionRepository institutionRepository;

    @Autowired
    private com.shreenil.academic.repository.ProgramRepository programRepository;

    @BeforeEach
    void setUp() {
        if (userRepository.count() == 0) {
            var inst = institutionRepository.save(com.shreenil.academic.domain.Institution.builder()
                    .id("inst-vit")
                    .tenantId("tenant-default")
                    .name("Vishwakarma Institute of Technology")
                    .code("VIT")
                    .location("Pune, India")
                    .build());

            var prog = programRepository.save(com.shreenil.academic.domain.Program.builder()
                    .id("prog-btech-cse-ai")
                    .institution(inst)
                    .name("B.Tech Computer Science & Engineering (Artificial Intelligence)")
                    .code("BTECH-CSE-AI")
                    .degree("B.Tech")
                    .department("Computer Engineering")
                    .durationYears(4)
                    .build());

            User user = userRepository.save(User.builder()
                    .id("user-aarav")
                    .tenantId("tenant-default")
                    .keycloakId("keycloak-aarav-sharma")
                    .email("aarav.sharma@shreenil.com")
                    .firstName("Aarav")
                    .lastName("Sharma")
                    .status("ACTIVE")
                    .build());

            studentProfileRepository.save(StudentProfile.builder()
                    .id("profile-aarav")
                    .user(user)
                    .program(prog)
                    .enrollmentNumber("VIT-2024-AI-0142")
                    .currentSemester(5)
                    .currentAcademicYear("2026-27")
                    .section("AI-A")
                    .cumulativeGpa(BigDecimal.valueOf(8.92))
                    .attendancePercentage(BigDecimal.valueOf(94.5))
                    .learningStreakDays(18)
                    .build());
        }
    }

    @Test
    @DisplayName("GET /api/v1/students/me returns student profile")
    void shouldReturnStudentProfile() throws Exception {
        mockMvc.perform(get("/api/v1/students/me")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.firstName", is("Aarav")))
                .andExpect(jsonPath("$.data.enrollmentNumber", is("VIT-2026-AI88")));
    }

    @Test
    @DisplayName("GET /api/v1/students/me/dashboard returns aggregated dashboard")
    void shouldReturnDashboard() throws Exception {
        mockMvc.perform(get("/api/v1/students/me/dashboard")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.studentName", is("Aarav Sharma")))
                .andExpect(jsonPath("$.data.studyStreak", is(9)));
    }
}
