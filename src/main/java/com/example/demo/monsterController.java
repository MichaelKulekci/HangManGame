package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017-08-21.
 */
@RestController
public class monsterController {
    @Autowired
    DataSource dataSource;

    @RequestMapping(path = "/GET", method = RequestMethod.GET)
    @ResponseBody
    public List<String> generateWordArray() throws SQLException {
        List<String> words = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM Words")) {
            while(rs.next()) {
                words.add(rs.getString("Name"));
            }
        }
        return words;
    }


}
