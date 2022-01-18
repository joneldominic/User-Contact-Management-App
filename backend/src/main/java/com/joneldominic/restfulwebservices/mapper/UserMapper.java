package com.joneldominic.restfulwebservices.mapper;

import java.util.ArrayList;
import java.util.List;

import com.joneldominic.restfulwebservices.entity.User;
import com.joneldominic.restfulwebservices.response.UserGetResponseModel;

public class UserMapper {

	public static final UserGetResponseModel toResponseModel(User user) {

		UserGetResponseModel _user = new UserGetResponseModel();

		_user.setId(user.getId());
		_user.setUsername(user.getUsername());
		_user.setName(user.getName());
		_user.setCreatedAt(user.getCreatedAt());
		_user.setUpdatedAt(user.getUpdatedAt());
		_user.setEnabled(user.isEnabled());

		return _user;
	}

//	List<User> users = userRepository.findAll();
//	List<UserGetResponse> _users = new ArrayList<UserGetResponse>();
//
//	for (int i = 0; i < users.size(); i++) {
//
//		UserGetResponse tmpUser = new UserGetResponse();
//		tmpUser.setId(users.get(i).getId());
//		tmpUser.setUsername(users.get(i).getUsername());
//		tmpUser.setName(users.get(i).getName());
//		tmpUser.setCreatedAt(users.get(i).getCreatedAt());
//		tmpUser.setUpdatedAt(users.get(i).getUpdatedAt());
//		tmpUser.setEnabled(users.get(i).isEnabled());
//
//		_users.add(tmpUser);
//	}
}
