package com.joneldominic.restfulwebservices.request;

import javax.validation.constraints.NotEmpty;

public class AuthenticationRequestModel {

	@NotEmpty(message = "Username may not be empty")
	private String username;

	@NotEmpty(message = "Password may not be empty")
	private String password;

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

}
