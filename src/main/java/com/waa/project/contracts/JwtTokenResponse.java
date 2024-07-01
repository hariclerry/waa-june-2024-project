package com.waa.project.contracts;

import lombok.Data;

@Data
public class JwtTokenResponse {
    private String accessToken;
    private String refreshToken;
}
