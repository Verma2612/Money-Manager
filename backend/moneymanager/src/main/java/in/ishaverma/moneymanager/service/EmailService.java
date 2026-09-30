package in.ishaverma.moneymanager.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;


//    public void sendEmail(String to, String subject, String body) {
//
//        System.out.println("1. Entered sendEmail()");
//
//        try {
//            SimpleMailMessage message = new SimpleMailMessage();
//
//            System.out.println("2. Message object created");
//
//            message.setFrom(fromEmail);
//            message.setTo(to);
//            message.setSubject(subject);
//            message.setText(body);
//
//            System.out.println("3. About to call mailSender.send()");
//
//            System.out.println("Sending to: " + to);
//            System.out.println("From: " + fromEmail);
//
//            mailSender.send(message);
//
//            System.out.println("4. Email sent successfully");
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            System.out.println("5. Exception: " + e.getMessage());
//            throw new RuntimeException("Failed to send email", e);
//        }
//    }
//}
public void sendEmail(String to, String subject, String body) {
    try {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);

        // true tells Spring this is HTML
        helper.setText(body, true);

        mailSender.send(message);

    } catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Failed to send email", e);
    }
}

public void sendEmailWithAttachemnt(String to, String subject, String body, byte[] attachment, String filename)throws MessagingException {
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);
    helper.setFrom(fromEmail);
    helper.setTo(to);
    helper.setSubject(subject);
    helper.setText(body, true);
    helper.addAttachment(filename, new ByteArrayResource(attachment));
    mailSender.send(message);
}
}
