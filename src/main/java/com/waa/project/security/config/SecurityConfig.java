package com.waa.project.security.config;

import com.waa.project.security.filter.JwtTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtTokenFilter jwtTokenFilter) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                   .cors(AbstractHttpConfigurer::disable)
                   .sessionManagement(
                           sessionMgr -> sessionMgr.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                   .authorizeHttpRequests(
                           authorizeRequests ->
                                   authorizeRequests.requestMatchers("/protected/**").authenticated()
                                                    .anyRequest().permitAll()
                                         )
//                   .exceptionHandling(
//                           exceptionHandler -> exceptionHandler.authenticationEntryPoint(
//                                   (request, response, authException) -> response.sendError(
//                                           HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage())
//                                                                                        )
//                                     )
                   .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                   .httpBasic(Customizer.withDefaults())
                   .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
