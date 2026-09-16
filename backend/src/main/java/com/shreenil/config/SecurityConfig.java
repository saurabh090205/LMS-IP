package com.shreenil.config;

import com.shreenil.auth.KeycloakJwtAuthenticationConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final KeycloakJwtAuthenticationConverter jwtConverter;
    private final CorsConfigurationSource corsConfigurationSource;

    @Value("${app.auth.dev-bypass-enabled:false}")
    private boolean devBypassEnabled;

    public SecurityConfig(KeycloakJwtAuthenticationConverter jwtConverter,
                          CorsConfigurationSource corsConfigurationSource) {
        this.jwtConverter = jwtConverter;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> {
                    // Public endpoints
                    auth.requestMatchers(
                            "/",
                            "/api/v1",
                            "/api/v1/",
                            "/api/v1/health",
                            "/api/v1/health/**",
                            "/actuator/**",
                            "/docs/**",
                            "/api-docs/**",
                            "/swagger-ui/**",
                            "/swagger-ui.html"
                    ).permitAll();

                    // Preflight CORS requests
                    auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();

                    if (devBypassEnabled) {
                        // Allow all in dev bypass mode for rapid local validation
                        auth.requestMatchers("/api/v1/**").permitAll();
                    } else {
                        // Authenticated endpoints
                        auth.requestMatchers("/api/v1/**").authenticated();
                    }

                    auth.anyRequest().authenticated();
                });

        if (!devBypassEnabled) {
            http.oauth2ResourceServer(oauth2 -> oauth2
                    .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtConverter))
            );
        }

        return http.build();
    }
}
