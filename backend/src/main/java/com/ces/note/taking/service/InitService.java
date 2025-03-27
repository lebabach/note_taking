package com.ces.note.taking.service;

import com.ces.note.taking.model.ERole;
import com.ces.note.taking.model.Role;
import com.ces.note.taking.model.User;
import com.ces.note.taking.repository.RoleRepository;
import com.ces.note.taking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class InitService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public void createUserEntries() {
        Role userRole = new Role(1, ERole.ROLE_USER);
        Role adminRole = new Role(2, ERole.ROLE_ADMIN);
        User user = new User("bachlb@ecs.com", passwordEncoder.encode("user"));
        User admin = new User("admin@ecs.com", passwordEncoder.encode("admin"));

        user.setRoles(Set.of(userRole));
        admin.setRoles(Set.of(adminRole));

        roleRepository.save(userRole);
        roleRepository.save(adminRole);
        userRepo.save(user);
        userRepo.save(admin);
    }

}
