package com.example.backend.test;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @GetMapping("/")
    public String getHome(){
        return "home";
    }
    @GetMapping("/test")
    public String getTest(){
        return "test";
    }

}
