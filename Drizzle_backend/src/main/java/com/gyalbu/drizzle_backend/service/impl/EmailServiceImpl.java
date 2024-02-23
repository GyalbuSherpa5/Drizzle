package com.gyalbu.drizzle_backend.service.impl;

import com.gyalbu.drizzle_backend.entity.Order;
import com.gyalbu.drizzle_backend.repository.OrderRepository;
import com.gyalbu.drizzle_backend.service.EmailService;
import com.gyalbu.drizzle_backend.service.OrderService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final OrderService orderService;
    private final OrderRepository orderRepository;

    @Override
    public void email(String to, String subject, String content) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, StandardCharsets.UTF_8.name());

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);

            mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error("Error sending email to {}, due to {}", to, e.getMessage());
        }
    }

    // every ten seconds
    // @Scheduled(cron = "*/10 * * * * *")

    // every mid-night
    // @Scheduled(cron = "0 0 0 * * *")
    @Override
    public void set() {
        List<Order> allUserInstallments = orderService.getAllUserInstallments();

        for (Order order : allUserInstallments) {

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd yyyy");
            LocalDate dueDate = LocalDate.parse(order.getDueDate(), formatter);
            LocalDate today = LocalDate.now();

            if (today.isAfter(dueDate)) {
                log.info("Installment is overdue for order Id: {}", order.getId());
                Integer totalDiscountedPrice = order.getTotalDiscountedPrice();
                totalDiscountedPrice /= 4;

                double fineAmt = totalDiscountedPrice * 0.005; // 0.5% fine
                double fineAmountInDb = order.getFineAmount();
                fineAmountInDb += fineAmt;
                order.setFineAmount((double) Math.round(fineAmountInDb * 100) / 100);
                orderRepository.save(order);
                email(order.getUser().getEmail(), "Installment Due",
                        "<html><body>" +
                                "<p>Dear " + order.getUser().getFirstName() + ",</p>" +
                                "<p>We regret to inform you that your installment payment is now overdue. As a result, there is a fine amount of " + fineAmt + " that has been incurred.</p>" +
                                "<p>Please note that the fine amount will continue to accumulate daily until the installment is cleared.Please take the necessary steps to settle this amount at your earliest convenience to avoid further inconvenience.</p>" +
                                "<p>Thank you for your attention to this matter.</p>" +
                                "<p>Best regards,<br/>Drizzle Team</p>" +
                                "</body></html>");
            }
        }
    }
}
