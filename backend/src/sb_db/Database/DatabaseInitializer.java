package sb_db.Database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

public class DatabaseInitializer {
    private static final String URL = "jdbc:h2:/Users/szetok2/Documents/compsci/persl/StudyBuddy/backend/database/studybuddy;MODE=PostgreSQL";
    private static final String USER = "sa";
    private static final String PASSWORD = "";

    public static void main(String[] argv) {
        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement statement = connection.createStatement()) {

            // Drop and recreate the tests table
            String dropTable = "DROP TABLE IF EXISTS tests";
            String createTable = "CREATE TABLE tests (" +
                "id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, " +
                "course_id TEXT NOT NULL, " +
                "assess_type TEXT, " +
                "assess_number INT NOT NULL, " +
                "path TEXT NOT NULL, " +
                "description TEXT)";

            statement.executeUpdate(dropTable);
            statement.executeUpdate(createTable);
            System.out.println("Database initialized successfully!");

            // Insert sample data into the table
            String insertData = "INSERT INTO tests (course_id, assess_type, assess_number, path, description) " +
                    "VALUES ('CS101', 'quiz', 1, '/tests/quiz1.pdf', 'First quiz of the semester')";
            statement.executeUpdate(insertData);
            System.out.println("Sample data inserted!");

            fetchTests();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void fetchTests() {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM tests")) {

            while (rs.next()) {
                System.out.println(rs.getInt("id") + " | " +
                        rs.getString("course_id") + " | " +
                        rs.getString("assess_type") + " | " +
                        rs.getInt("assess_number") + " | " +
                        rs.getString("path") + " | " +
                        rs.getString("description"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
