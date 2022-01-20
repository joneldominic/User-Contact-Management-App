package com.joneldominic.restfulwebservices.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.joneldominic.restfulwebservices.entity.Contact;
import com.joneldominic.restfulwebservices.entity.User;
import com.joneldominic.restfulwebservices.exception.EntityNotFoundException;
import com.joneldominic.restfulwebservices.repository.ContactRepository;
import com.joneldominic.restfulwebservices.repository.UserRepository;
import com.joneldominic.restfulwebservices.service.UserService;

@RestController
@RequestMapping("/api")
public class ContactController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ContactRepository contactRepository;

	@Autowired
	private UserService userService;

	@GetMapping("/users/{id}/contacts")
	public List<Contact> getAllContacts(@PathVariable long id) {

		Optional<User> user = userRepository.findById(id);

		if (user.isEmpty())
			throw new EntityNotFoundException(User.class, "id", String.valueOf(id));

		return user.get().getContacts();
	}

	@GetMapping("/users/{id}/contacts/{contactId}")
	public Contact getContact(@PathVariable long id, @PathVariable long contactId) {

		Optional<User> user = userRepository.findById(id);
		if (user.isEmpty())
			throw new EntityNotFoundException(User.class, "id", String.valueOf(id));

		Optional<Contact> contact = userService.findUserContactById(user.get(), contactId);
		if (contact.isEmpty())
			throw new EntityNotFoundException(Contact.class, "id", String.valueOf(contactId));

		return contact.get();
	}

	@PostMapping("/users/{id}/contacts")
	public ResponseEntity<Object> createContact(@PathVariable long id, @Valid @RequestBody Contact contact) {

		Optional<User> user = userRepository.findById(id);

		if (user.isEmpty())
			throw new EntityNotFoundException(User.class, "id", String.valueOf(id));

		contact.setUser(user.get());
		contactRepository.save(contact);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(contact.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@PutMapping("/users/{id}/contacts/{contactId}")
	public ResponseEntity<Object> updateContact(@PathVariable long id, @PathVariable long contactId,
			@Valid @RequestBody Contact updatedContact) {

		Optional<User> user = userRepository.findById(id);
		if (user.isEmpty())
			throw new EntityNotFoundException(User.class, "id", String.valueOf(id));

		Optional<Contact> contact = userService.findUserContactById(user.get(), contactId);
		if (contact.isEmpty())
			throw new EntityNotFoundException(Contact.class, "id", String.valueOf(contactId));

		Contact _contact = contact.get();

		_contact.setFirstname(updatedContact.getFirstname());
		_contact.setMiddlename(updatedContact.getMiddlename());
		_contact.setLastname(updatedContact.getLastname());
		_contact.setNumber(updatedContact.getNumber());
		_contact.setEmail(updatedContact.getEmail());
		_contact.setTitle(updatedContact.getTitle());
		_contact.setAddress1(updatedContact.getAddress1());
		_contact.setAddress2(updatedContact.getAddress2());
		_contact.setNotes(updatedContact.getNotes());

		Contact savedContact = contactRepository.save(_contact);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedContact.getId()).toUri();

		return ResponseEntity.created(location).build();
	}

	@DeleteMapping("/users/{id}/contacts/{contactId}")
	public void deleteContact(@PathVariable long id, @PathVariable long contactId) {

		Optional<User> user = userRepository.findById(id);
		if (user.isEmpty())
			throw new EntityNotFoundException(User.class, "id", String.valueOf(id));

		Optional<Contact> contact = userService.findUserContactById(user.get(), contactId);
		if (contact.isEmpty())
			throw new EntityNotFoundException(Contact.class, "id", String.valueOf(contactId));

		contactRepository.deleteById(contactId);

	}

}
