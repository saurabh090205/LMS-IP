package com.shreenil.health;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class HealthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /api/v1/health should return UP status and 200 OK")
    void shouldReturnHealthStatus() throws Exception {
        mockMvc.perform(get("/api/v1/health")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.status", is("UP")))
                .andExpect(jsonPath("$.data.service", is("shreenil-backend")));
    }

    @Test
    @DisplayName("GET /api/v1 should return API info and 200 OK")
    void shouldReturnApiInfo() throws Exception {
        mockMvc.perform(get("/api/v1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Shreenil API is running")))
                .andExpect(jsonPath("$.data.service", is("shreenil-backend")))
                .andExpect(jsonPath("$.data.version", is("v1")));
    }

    @Test
    @DisplayName("GET /api/v1/nonexistent-route should return clean 404 NOT_FOUND, not 500")
    void shouldReturn404ForUnknownRoute() throws Exception {
        mockMvc.perform(get("/api/v1/nonexistent-route-xyz")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.errorCode", is("ERR_NOT_FOUND_404")));
    }
}
