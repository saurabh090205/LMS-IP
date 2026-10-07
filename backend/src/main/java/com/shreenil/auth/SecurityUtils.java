package com.shreenil.auth;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public final class SecurityUtils {

    private SecurityUtils() {}

    public static String getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
            if (auth.getPrincipal() instanceof Jwt jwt) {
                return jwt.getSubject();
            }
            return auth.getName();
        }

        HttpServletRequest request = getHttpServletRequest();
        if (request != null) {
            String devUserId = request.getHeader("X-Dev-User-Id");
            if (devUserId != null && !devUserId.isBlank()) {
                return devUserId;
            }
            String devRole = request.getHeader("X-Dev-Role");
            if ("TEACHER".equalsIgnoreCase(devRole) || "FACULTY".equalsIgnoreCase(devRole)) {
                return "usr-faculty-elena";
            }
        }

        return "usr-student-aarav"; // dev default
    }

    public static String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
            return auth.getName();
        }

        HttpServletRequest request = getHttpServletRequest();
        if (request != null) {
            String devUserId = request.getHeader("X-Dev-User-Id");
            if ("usr-faculty-elena".equalsIgnoreCase(devUserId)) {
                return "elena.rostova@vit.edu";
            }
            String devRole = request.getHeader("X-Dev-Role");
            if ("TEACHER".equalsIgnoreCase(devRole) || "FACULTY".equalsIgnoreCase(devRole)) {
                return "elena.rostova@vit.edu";
            }
        }

        return "aarav.sharma@shreenil.edu";
    }

    private static HttpServletRequest getHttpServletRequest() {
        try {
            RequestAttributes attribs = RequestContextHolder.getRequestAttributes();
            if (attribs instanceof ServletRequestAttributes servletAttribs) {
                return servletAttribs.getRequest();
            }
        } catch (Exception ignored) {
        }
        return null;
    }
}
