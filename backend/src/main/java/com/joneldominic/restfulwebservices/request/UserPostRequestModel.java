package com.joneldominic.restfulwebservices.request;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserPostRequestModel {
	@Size(min = 2, message = "name should have atleast 2 chars")
	private String name;

	@Pattern(regexp = "^[a-zA-Z0-9_.-]{6,}$")
	private String username;

	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$")
	private String password;

	public UserPostRequestModel() {
	}

	public UserPostRequestModel(String name, String username, String password) {
		this.name = name;
		this.username = username;
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
