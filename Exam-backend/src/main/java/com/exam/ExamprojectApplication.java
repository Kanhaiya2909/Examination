package com.exam;

import java.util.HashSet;

import java.util.Set;
//
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.services.UserService;

@SpringBootApplication
public class ExamprojectApplication implements CommandLineRunner{
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	

	public static void main(String[] args) {
		SpringApplication.run(ExamprojectApplication.class, args);
		
	}
	

	@Override
	public void run(String... args) throws Exception {
		
		try {
		System.out.println("Starting code");
		
		
		User user = new User();
		
		user.setFirstName("Kanhaiya");
		user.setLastName("Kumar");
		user.setPassword(this.bCryptPasswordEncoder.encode("Kanha@123"));
		user.setEmailId("kanhaiyaKumar@gmail.com");
		user.setProfile("kk.png");
		user.setUsername("Kanhaiya2909");
		
		Role role1 = new Role();
		role1.setRoleName("ADMIN");
		role1.setRoleId(11L);
		
		Set<UserRole> userRoleSet = new HashSet<>();
		UserRole userRole = new UserRole();
		
		
		userRole.setRole(role1);
		userRole.setUser(user);
		userRoleSet.add(userRole);
		
		User user1 = this.userService.createUser(user, userRoleSet);
				System.out.println(user1.getUsername());
				
		}
				catch(Exception e) {
			e.printStackTrace();
		}
		
	}

}
