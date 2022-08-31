package com.threepillarglobal.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("hello")
public class HelloResource {
	
	@GET
	public String greeting() {
		return "Hello from Docker - Java";
	}
}
