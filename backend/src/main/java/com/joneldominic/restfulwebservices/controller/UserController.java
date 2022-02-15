package com.joneldominic.restfulwebservices.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.joneldominic.restfulwebservices.entity.User;
import com.joneldominic.restfulwebservices.exception.EntityConflictException;
import com.joneldominic.restfulwebservices.exception.EntityNotFoundException;
import com.joneldominic.restfulwebservices.mapper.UserMapper;
import com.joneldominic.restfulwebservices.repository.UserRepository;
import com.joneldominic.restfulwebservices.request.UserPostRequestModel;
import com.joneldominic.restfulwebservices.response.UserGetResponseModel;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/users")
	public List<UserGetResponseModel> getAllUsers() {

		List<User> users = userRepository.findAll();
		
		List<UserGetResponseModel> userList = new ArrayList<>();
		
		for(User _user : users) {
			UserGetResponseModel userGetResponse = new UserGetResponseModel();
			
			userGetResponse.setId(_user.getId());
			userGetResponse.setName(_user.getName());
			userGetResponse.setUsername(_user.getUsername());
			userGetResponse.setCreatedAt(_user.getCreatedAt());
			userGetResponse.setUpdatedAt(_user.getUpdatedAt());
			
			userList.add(userGetResponse);
		}

		return userList;
	}

	@GetMapping("/users/{id}")
	public EntityModel<UserGetResponseModel> getUser(@PathVariable long id) {

		Optional<User> user = userRepository.findById(id);

		if (!user.isPresent())
			throw new EntityNotFoundException(User.class, "id", String.valueOf(id));

		UserGetResponseModel _user = UserMapper.toResponseModel(user.get());

		EntityModel<UserGetResponseModel> userModel = EntityModel.of(_user);

		WebMvcLinkBuilder linkToUsers = linkTo(methodOn(this.getClass()).getAllUsers());

		userModel.add(linkToUsers.withRel("all-users"));

		return userModel;
	}

	@PostMapping("/users")
	public ResponseEntity<Object> createUser(@Valid @RequestBody UserPostRequestModel userPostRequest) {

		Optional<User> existingUser = userRepository.findByUsername(userPostRequest.getUsername());
		if (existingUser.isPresent())
			throw new EntityConflictException(User.class, "username", userPostRequest.getUsername());

		User _user = new User();
		_user.setName(userPostRequest.getName());
		_user.setUsername(userPostRequest.getUsername());
		_user.setPassword(passwordEncoder.encode(userPostRequest.getPassword()));
		_user.setCreatedAt(new Date());
		_user.setUpdatedAt(new Date());
		_user.setEnabled(true);

		User savedUser = userRepository.save(_user);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<Object> updateUser(@PathVariable long id,
			@Valid @RequestBody UserPostRequestModel updatedUser) {

		Optional<User> existingUser = userRepository.findByUsername(updatedUser.getUsername());
		if (existingUser.isPresent() && existingUser.get().getId() != id)
			throw new EntityConflictException(User.class, "username", updatedUser.getUsername());

		Optional<User> user = userRepository.findById(id);
		if (!user.isPresent())
			throw new EntityNotFoundException(User.class, "id", String.valueOf(id));

		User _user = user.get();

		_user.setName(updatedUser.getName());
		_user.setUsername(updatedUser.getUsername());
		_user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
		_user.setUpdatedAt(new Date());
		_user.setEnabled(true);

		User savedUser = userRepository.save(_user);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId())
				.toUri();

		return ResponseEntity.created(location).build();

	}

	@DeleteMapping("/users/{id}")
	public void deleteUser(@PathVariable long id) {

		Optional<User> user = userRepository.findById(id);
		if (!user.isPresent())
			throw new EntityNotFoundException(User.class, "id", String.valueOf(id));

		userRepository.deleteById(id);
	}

}
