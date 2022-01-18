package com.joneldominic.restfulwebservices.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Contact {

	@Id
	@GeneratedValue
	private Long id;
	
	@Size(min = 2, message = "Firstname should have atleast 2 chars")
	private String firstname;
	
	@Size(min = 2, message = "Middlename should have atleast 2 chars")
	private String middlename;
	
	@Size(min = 2, message = "Lastname should have atleast 2 chars")
	private String lastname;
	
	@Length(min = 11, max=13, message = "Invalid Input")
	private String number;
	
	@Email(message = "Invalid Input")
	private String email;
	
	@Size(min = 2, message = "Title should have atleast 2 chars")
	private String title;
	
	@Size(min = 2, message = "Title should have atleast 2 chars")
	private String address;

	private String notes;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private User user;

	public Long getId() {
		return id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getMiddlename() {
		return middlename;
	}

	public void setMiddlename(String middlename) {
		this.middlename = middlename;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return String.format(
				"Contact [id=%s, firstname=%s, middlename=%s, lastname=%s, number=%s, email=%s, title=%s, address=%s, notes=%s, user=%s]",
				id, firstname, middlename, lastname, number, email, title, address, notes, user);
	}

}
