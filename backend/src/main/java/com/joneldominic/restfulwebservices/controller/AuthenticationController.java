package com.joneldominic.restfulwebservices.controller;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joneldominic.restfulwebservices.config.JWTTokenHelper;
import com.joneldominic.restfulwebservices.entity.User;
import com.joneldominic.restfulwebservices.mapper.UserMapper;
import com.joneldominic.restfulwebservices.request.AuthenticationRequestModel;
import com.joneldominic.restfulwebservices.response.LoginResponseModel;
import com.joneldominic.restfulwebservices.response.UserGetResponseModel;
import com.joneldominic.restfulwebservices.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	JWTTokenHelper jWTTokenHelper;

	@Autowired
	private UserService userService;

	@PostMapping("/auth/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequestModel authenticationRequest)
			throws InvalidKeySpecException, NoSuchAlgorithmException {

		final Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
						authenticationRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		User user = (User) authentication.getPrincipal();
		String jwtToken = jWTTokenHelper.generateToken(user.getUsername());

		LoginResponseModel response = new LoginResponseModel();
		response.setToken(jwtToken);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/auth/userinfo")
	public ResponseEntity<?> getUserInfo(Principal user) {
		User userObj = (User) userService.loadUserByUsername(user.getName());

		UserGetResponseModel userInfo = UserMapper.toResponseModel(userObj);

		return ResponseEntity.ok(userInfo);
	}

}
