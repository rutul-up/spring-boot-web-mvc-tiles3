package com.mvmlabs.springboot.service;

import com.mvmlabs.springboot.domain.sql.bean.Role;
import com.mvmlabs.springboot.domain.sql.bean.User;
import com.mvmlabs.springboot.domain.sql.repository.RoleRepository;
import com.mvmlabs.springboot.domain.sql.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	public UserService(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}


	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public void saveUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user.setActive(1);
		user.setRoles(user.getRoles());
		userRepository.save(user);
	}

	public List<User> getUsers() {
		return userRepository.findAll();
	}

	public Set<Role> getRoles() {
		return new HashSet<>(roleRepository.findAll());
	}

	public List<User> deleteUser(Long userId) {
		User user = userRepository.findOne(userId);
		user.setRoles(null);
		userRepository.delete(user);
		return getUsers();
	}

	public User getUser(String username) {
		return userRepository.findByUserName(username);
	}

	public User findUserById(Long userId) {
		return userRepository.findOne(userId);
	}

	public Page<User> findPaginated(Pageable pageable) {
		return userRepository.findAll(pageable);
	}


	/*private static List<User> users;
	private static Set<Role> roles;
	private static long counter;

	@Autowired
	public UserService() {
		users = new ArrayList<>();
		roles = new HashSet<>();
		counter = 1;
		loadUsers();
		loadRoles();
	}

	private void loadRoles() {
		Role role = new Role();
		role.setId(1L);
		role.setRole("ADMIN");
		roles.add(role);

		role = new Role();
		role.setId(2L);
		role.setRole("USER");
		roles.add(role);

		role = new Role();
		role.setId(3L);
		role.setRole("EMPLOYEE");
		roles.add(role);

		role = new Role();
		role.setId(4L);
		role.setRole("SUB");
		roles.add(role);

		role = new Role();
		role.setId(5L);
		role.setRole("MEMBER");
		roles.add(role);

	}

	private void loadUsers() {
		User user1 = new User();
		user1.setId(counter ++);
		user1.setFirstName("Joe");
		user1.setLastName("Doe");
		user1.setUserName("joe");
		user1.setPassword("joe");
		user1.setRoles(roles1());
		users.add(user1);

		user1 = new User();
		user1.setId(counter ++);
		user1.setFirstName("Rutul");
		user1.setLastName("Patel");
		user1.setPassword("abc");
		user1.setUserName("rutul");
		user1.setRoles(roles2());
		users.add(user1);

	}

	private Set<Role> roles1() {
		HashSet<Role> roles = new HashSet<>();
		Role role = new Role();
		role.setId(1L);
		role.setRole("ADMIN");
		roles.add(role);

		role = new Role();
		role.setId(2L);
		role.setRole("USER");
		roles.add(role);

		return roles;
	}

	private Set<Role> roles2() {
		HashSet<Role> roles = new HashSet<>();
		Role role = new Role();
		role.setId(1L);
		role.setRole("ADMIN");
		roles.add(role);


		return roles;
	}

	public List<User> getUsers() {
		return  users;
	}

	public User getUser(final String username) {
		return users.stream().filter(u -> u.getUserName().equals(username)).findFirst().orElse(null);
	}

	public List<User> deleteUser(Long userId) {
		//users.removeIf(u -> !u.getId().equals(userId));
		return users;
	}

	public Set<Role> getRoles() {
		return  roles;
	}

	public void save(User user) {
		user.setId(counter ++);
		users.add(user);
	}*/
}
