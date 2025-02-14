package studybuddy.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseInitializer {
    private static final String URL = "jdbc:h2:~/test";
    private static final String USER = "sa";
    private static final String PASSWORD = "";

    public static void initializeDatabase() {
        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement statement = connection.createStatement()) {

            String createTestsTable = "CREATE TABLE IF NOT EXISTS tasks (" +
                    "id INT AUTO_INCREMENT PRIMARY KEY, " +
                    "course_id TEXT NOT NULL, " +
                    "asses_type TEXT, " + // exam quiz other
                    "assess_number INT NOT NULL, " +
                    "path TEXT NOT NULL, " +
                    "description TEXT, ";
            statement.executeUpdate(createTestsTable);

            System.out.println("Database initialized successfully");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
