package com.ces.note.taking.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserInfoResponse {

    private String jwt;
    private String email;
    private List<String> roles;

}
