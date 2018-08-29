package com.mvmlabs.springboot.configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import springfox.documentation.builders.AuthorizationScopeBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.BasicAuth;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;

import static com.google.common.collect.Lists.newArrayList;

// @EnableSwagger2
@Configuration
public class SwaggerConfig {

	private final Environment environment;

	@Autowired
	public SwaggerConfig(Environment environment) {
		this.environment = environment;
	}

	@Bean
	public Docket docket() {
		return addBasicAuth(initDocket());
	}

	private Docket initDocket() {
		return new Docket(DocumentationType.SWAGGER_2)
				.enable(environment.acceptsProfiles("swagger"))
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.wheelsup.social.server.core.web"))
				.paths(PathSelectors.any())
				.build()
				.pathMapping("app");
	}

	private Docket addBasicAuth(Docket docket) {
		AuthorizationScope[] authScopes = new AuthorizationScope[1];
		authScopes[0] = new AuthorizationScopeBuilder()
				.scope("Read Write")
				.description("Read Write access")
				.build();
		SecurityReference securityReference = SecurityReference.builder()
				.reference("swagger")
				.scopes(authScopes)
				.build();
		ArrayList<SecurityContext> securityContexts = newArrayList(SecurityContext.builder().securityReferences(newArrayList(securityReference)).build());


		return docket
				.securitySchemes(newArrayList(new BasicAuth("swagger")))
				.securityContexts(newArrayList(securityContexts));
	}
}
