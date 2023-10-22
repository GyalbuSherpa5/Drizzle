package com.gyalbu.drizzle_backend.entity;

import com.gyalbu.drizzle_backend.enums.PaymentMethod;
import com.gyalbu.drizzle_backend.enums.PaymentStatus;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetails {

    private PaymentMethod paymentMethod;

    private PaymentStatus status;

    private String paymentId;

    private String eSewaPaymentLinkId;

    private String eSewaPaymentLinkReferenceId;

    private String eSewaPaymentLinkStatus;

    private String eSewaPaymentId;
}
