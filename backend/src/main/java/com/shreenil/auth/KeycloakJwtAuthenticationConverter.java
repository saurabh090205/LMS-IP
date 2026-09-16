package com.shreenil.auth;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class KeycloakJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = extractAuthorities(jwt);

        UserPrincipal principal = UserPrincipal.builder()
                .keycloakId(jwt.getSubject())
                .email(jwt.getClaimAsString("email"))
                .username(jwt.getClaimAsString("preferred_username"))
                .firstName(jwt.getClaimAsString("given_name"))
                .lastName(jwt.getClaimAsString("family_name"))
                .tenantId(jwt.getClaimAsString("tenant_id") != null ? jwt.getClaimAsString("tenant_id") : "tenant-default")
                .roles(authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet()))
                .build();

        return new JwtAuthenticationToken(jwt, authorities, principal.getUsername() != null ? principal.getUsername() : jwt.getSubject());
    }

    @SuppressWarnings("unchecked")
    private Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
        Set<String> roles = new HashSet<>();

        // Extract realm_access.roles
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            List<String> realmRoles = (List<String>) realmAccess.get("roles");
            if (realmRoles != null) {
                roles.addAll(realmRoles);
            }
        }

        // Extract resource_access (client roles)
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        if (resourceAccess != null) {
            resourceAccess.values().forEach(client -> {
                if (client instanceof Map<?, ?> clientMap && clientMap.containsKey("roles")) {
                    List<String> clientRoles = (List<String>) clientMap.get("roles");
                    if (clientRoles != null) {
                        roles.addAll(clientRoles);
                    }
                }
            });
        }

        // Add any direct scope claims
        String scope = jwt.getClaimAsString("scope");
        if (scope != null) {
            Arrays.stream(scope.split(" "))
                    .forEach(s -> roles.add("SCOPE_" + s));
        }

        return roles.stream()
                .map(role -> {
                    if (role.startsWith("ROLE_") || role.startsWith("SCOPE_")) {
                        return new SimpleGrantedAuthority(role);
                    }
                    return new SimpleGrantedAuthority("ROLE_" + role.toUpperCase());
                })
                .collect(Collectors.toSet());
    }
}
