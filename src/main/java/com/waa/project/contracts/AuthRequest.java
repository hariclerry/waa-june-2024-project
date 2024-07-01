package com.waa.project.contracts;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
