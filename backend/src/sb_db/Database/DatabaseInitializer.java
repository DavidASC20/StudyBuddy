package sb_db.Database;

import java.sql.*;
import java.util.List;

public class DatabaseInitializer {
    private static final String URL = "jdbc:postgresql://localhost:5432/studybuddy";
    private static final String USER = "postgres";  
    private static final String PASSWORD = "postgres";

    public static void main(String[] args) {
        try {
            /*
            DatabaseInteractions dbi = new DatabaseInteractions();

            dbi.create_db();

            dbi.add_test("CSCI-1100", "test", 1, "/tests/test1.pdf", "COPY 2: First test of the semester");
            dbi.add_test("CSCI-1100", "test", 2, "/tests/test2.pdf", "COPY 2: Second test of the semester");
                //fetchTests(connection);

            List<String> tests = dbi.getAllTests();
            System.out.println("\n\n\n AFTER INSERTS \n\n\n");
            for (String test : tests) { System.out.println(test); }

            dbi.remove_by_id(1);

            tests = dbi.getAllTests();
            System.out.println("\n\n\n After DELETE \n\n\n");
            for (String test : tests) { System.out.println(test); }
            */

        } catch (Exception e) {
            System.err.println("Database connection failed");
            e.printStackTrace();
        }
    }
}