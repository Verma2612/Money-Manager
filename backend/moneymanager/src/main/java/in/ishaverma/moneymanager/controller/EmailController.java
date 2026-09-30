package in.ishaverma.moneymanager.controller;


import in.ishaverma.moneymanager.entity.ProfileEntity;
import in.ishaverma.moneymanager.service.*;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final ExcelService excelService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final EmailService emailService;
    private final ProfileService profileService;

    @GetMapping("/income-excel")
    public ResponseEntity<Void> emailIncomeExcel() throws IOException, MessagingException {
        ProfileEntity profile = profileService.getCurrentProfile();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excelService.writeIncomesToExcel(baos, incomeService.getCurrentMonthIncomeForCurrentUser());
        emailService.sendEmailWithAttachemnt(profile.getEmail(),
                "Your Income Excel Report",
                       "Please find your attached  income report",
                baos.toByteArray(),
                "income_report.xlsx");
        return  ResponseEntity.ok(null);
    }


    @GetMapping("/expense-excel")
    public ResponseEntity<Void> emailExpenseExcel() throws IOException, MessagingException {
        ProfileEntity profile = profileService.getCurrentProfile();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excelService.writeExpensesToExcel(baos, expenseService.getCurrentMonthExpensesForCurrentUser());
        emailService.sendEmailWithAttachemnt(profile.getEmail(),
                "Your Income Excel Report",
                "Please find your attached expense report",
                baos.toByteArray(),
                "income_report.xlsx");
        return  ResponseEntity.ok(null);
    }
}
