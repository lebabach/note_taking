package com.ces.note.taking;

import com.ces.note.taking.service.InitService;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NoteTakingApplication {

	public NoteTakingApplication(InitService initService) {this.initService = initService;}

	public static void main(String[] args) {
		SpringApplication.run(NoteTakingApplication.class, args);
	}

	private final InitService initService;

	@PostConstruct
	public void initialize() {
		initService.createUserEntries();
	}

}
