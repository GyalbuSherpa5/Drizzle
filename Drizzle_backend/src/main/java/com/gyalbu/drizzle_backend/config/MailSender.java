package com.gyalbu.drizzle_backend.config;

import com.gyalbu.drizzle_backend.constant.PropertyName;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;


import java.util.Properties;

@Configuration
public class MailSender {

    @Value(PropertyName.HOST_NAME)
    private String hostName;

    @Value(PropertyName.MAIL_PORT)
    private int mailPort;

    @Value(PropertyName.USER_NAME)
    private String userName;

    @Value(PropertyName.PASSWORD)
    private String password;

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(hostName);
        mailSender.setPort(mailPort);
        mailSender.setUsername(userName);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        return mailSender;
    }
}

