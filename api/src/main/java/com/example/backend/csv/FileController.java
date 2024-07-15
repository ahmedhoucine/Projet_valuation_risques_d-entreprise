package com.example.backend.csv;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FileController {

    private static final String CSV_FILE_PATH = "C:\\Users\\Ahmed\\Desktop\\Projet Stage\\api\\csvs\\";

    @GetMapping("/read-csv")
    public ResponseEntity<List<String[]>> readCsv(@RequestParam String filename) {
        // Replace spaces with underscores in the filename
        String sanitizedFilename = filename.replace(" ", "_");

        List<String[]> csvData = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(CSV_FILE_PATH + sanitizedFilename))) {
            String line;
            while ((line = br.readLine()) != null) {
                csvData.add(line.split(","));
            }
            return ResponseEntity.ok(csvData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
