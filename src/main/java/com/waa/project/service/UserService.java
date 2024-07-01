package com.waa.project.service;

import com.waa.project.security.contracts.AuthUserResponse;

public interface UserService {
    AuthUserResponse findByUsername(String username);
}
