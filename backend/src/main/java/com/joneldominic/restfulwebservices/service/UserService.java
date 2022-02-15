package com.joneldominic.restfulwebservices.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.joneldominic.restfulwebservices.entity.Contact;
import com.joneldominic.restfulwebservices.entity.User;
import com.joneldominic.restfulwebservices.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<User> user = userRepository.findByUsername(username);

		if (!user.isPresent()) {
			throw new UsernameNotFoundException("User Not Found with userName " + username);
		}
		return user.get();
	}

	public Optional<Contact> findUserContactById(User user, long contactId) {

		for (Contact _contact : user.getContacts()) {
			if (contactId == _contact.getId()) {
				return Optional.of(_contact);
			}
		}

		return Optional.empty();
	}

}
