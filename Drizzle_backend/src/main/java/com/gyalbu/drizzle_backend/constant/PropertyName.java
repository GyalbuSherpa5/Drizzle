package com.gyalbu.drizzle_backend.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.NONE)
public class PropertyName {

    public static final String HOST_NAME = "${mail-sender.host}";
    public static final String MAIL_PORT = "${mail-sender.port}";
    public static final String USER_NAME = "${mail-sender.username}";
    public static final String PASSWORD = "${mail-sender.password}";
    public static final String EMAIL_URL = "${mail-sender.url}";
}
