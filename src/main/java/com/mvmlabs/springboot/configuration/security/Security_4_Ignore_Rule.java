package com.mvmlabs.springboot.configuration.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import java.util.stream.Stream;

@Configuration
@Order(4)
public class Security_4_Ignore_Rule extends WebSecurityConfigurerAdapter {
	private static final String[] APP_URLS = {"/", "/index", "/login", "/app-index.html", "/app-resources/**"};
	private static final String[] SWAGGER_URLS = {"/swagger-ui.html", "/swagger-resources/**", "/v2/api-docs", "/webjars/**"};
	private static final String[] ACTUATOR_URLS = {"/health"};

	@Override
	public void configure(WebSecurity web) {
		web
				.ignoring()
				.antMatchers(Stream.of(APP_URLS, SWAGGER_URLS, ACTUATOR_URLS).flatMap(Stream::of).toArray(String[]::new));
	}
}
