
package com.example.backend.pythonscript;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PythonScriptController {

    @Autowired
    private CMDService cmdService;

    @GetMapping("/run-python")
    public String runPython(@RequestParam String scriptPath, @RequestParam(required = false) String args) {
        String[] arguments = (args != null && !args.isEmpty()) ? args.split(" ") : new String[0];
        return cmdService.runPythonScript(scriptPath, arguments);
    }
}
