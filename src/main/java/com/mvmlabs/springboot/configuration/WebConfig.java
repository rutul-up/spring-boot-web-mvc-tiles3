package com.mvmlabs.springboot.configuration;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.Ordered;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableRetry
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/app-index.html");
		registry.addViewController("/login").setViewName("forward:/app-index.html");
		registry.addViewController("/index").setViewName("forward:/app-index.html");
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
	}

	@Bean
	@Primary
	public ServletRegistrationBean dispatcherRegistration(@SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection") DispatcherServlet dispatcherServlet) {
		ServletRegistrationBean registration = new ServletRegistrationBean(dispatcherServlet);
		registration.addUrlMappings("/*", "/api/*", "/app/*");
		return registration;
	}

	@Bean
	public CommonsMultipartResolver multipartResolver() {
		return new CommonsMultipartResolver();
	}


}
