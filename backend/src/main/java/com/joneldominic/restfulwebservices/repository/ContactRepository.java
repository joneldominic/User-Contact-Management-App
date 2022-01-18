package com.joneldominic.restfulwebservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.joneldominic.restfulwebservices.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

}
