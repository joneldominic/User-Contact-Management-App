package com.joneldominic.restfulwebservices;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.joneldominic.restfulwebservices.entity.Contact;
import com.joneldominic.restfulwebservices.entity.User;
import com.joneldominic.restfulwebservices.repository.ContactRepository;
import com.joneldominic.restfulwebservices.repository.UserRepository;

@Component
public class DBInit implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(DBInit.class);

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ContactRepository contactRepository;

	@Override
	public void run(String... args) throws Exception {

		for (int i = 0; i < 5; i++) {
			User _user = new User();

			_user.setName("user " + i);
			_user.setUsername("user000" + i);
			_user.setPassword(passwordEncoder.encode("Password_" + 1));
			_user.setCreatedAt(new Date());
			_user.setUpdatedAt(new Date());
			_user.setEnabled(true);

			User savedUser = userRepository.save(_user);
			log.info("New User is Created: " + savedUser);

			for (int j = 0; j < 5; j++) {
				Contact _contact = new Contact();

				_contact.setFirstname("contact " + i + "-" + j);
				_contact.setMiddlename("middle " + i + "-" + j);
				_contact.setLastname("last " + i + "-" + j);
				_contact.setNumber("0900000000" + j);
				_contact.setEmail("contact" + j + "@test.com");
				_contact.setTitle("Contact for " + j);
				_contact.setAddress("Street " + j);
				_contact.setNotes("Notes" + j);
				_contact.setUser(savedUser);

				Contact _savedContact = contactRepository.save(_contact);
				log.info("New Contact is Created: " + _savedContact);
			}

		}

	}

}
