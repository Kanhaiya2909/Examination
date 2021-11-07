package com.exam.services;

import java.util.Set;


import com.exam.entity.User;
import com.exam.entity.UserRole;

public interface UserService {
	
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;
	
	public User getUser(String username);
	
	public void deleteUser(Long userId);

}
