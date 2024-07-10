package com.example.backend.pythonscript;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class CMDService {

    public String runPythonScript(String scriptPath, String... args) {
        StringBuilder output = new StringBuilder();

        try {
            // Construct the command
            StringBuilder command = new StringBuilder("python ");
            command.append(scriptPath);
            for (String arg : args) {
                command.append(" ").append(arg);
            }

            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command("cmd.exe", "/c", command.toString());

            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            int exitVal = process.waitFor();
            if (exitVal == 0) {
                System.out.println("Success!");
                System.out.println(output);
            } else {
                // Abnormal termination
                output.append("Error occurred while executing command.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            output.append("Exception occurred: ").append(e.getMessage());
        }

        return output.toString();
    }
}
