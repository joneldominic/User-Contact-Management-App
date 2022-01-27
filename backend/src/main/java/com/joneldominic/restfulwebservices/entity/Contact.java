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

	private String middlename;

	@Size(min = 2, message = "Lastname should have atleast 2 chars")
	private String lastname;

	@Length(min = 10, max = 13, message = "Invalid Input")
	private String number;

	@Email(message = "Invalid Input")
	private String email;

	@Size(min = 2, message = "Title should have atleast 2 chars")
	private String title;

	@Size(min = 2, message = "Address should have atleast 2 chars")
	private String address1;

	@Size(min = 2, message = "Address should have atleast 2 chars")
	private String address2;

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

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address) {
		this.address1 = address;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address) {
		this.address2 = address;
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
		return "Contact [id=" + id + ", firstname=" + firstname + ", middlename=" + middlename + ", lastname="
				+ lastname + ", number=" + number + ", email=" + email + ", title=" + title + ", address1=" + address1
				+ ", address2=" + address2 + ", notes=" + notes + ", user=" + user + "]";
	}

}
