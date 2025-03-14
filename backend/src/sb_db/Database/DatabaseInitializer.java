package sb_db.Database;

import java.sql.*;

public class DatabaseInitializer {
    private static final String URL = "jdbc:postgresql://localhost:5432/studybuddy";
    private static final String USER = "postgres";  
    private static final String PASSWORD = "postgres";

    public static void main(String[] args) {
        try {
            Class.forName("org.postgresql.Driver");

            try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD)) {
                System.out.println("Successfully connected to the psql database!");

                String createTable = "CREATE TABLE IF NOT EXISTS tests (" +
                        "id SERIAL PRIMARY KEY, " +
                        "course_id TEXT NOT NULL, " +
                        "assess_type TEXT, " +
                        "assess_number INT NOT NULL, " +
                        "path TEXT NOT NULL, " +
                        "description TEXT)";
                
                try (Statement statement = connection.createStatement()) {
                    statement.executeUpdate(createTable);
                    System.out.println("Database initialized successfully!");
                }

                //insertTestData(connection, "CSCI-1100", "quiz", 2, "/tests/quiz2.pdf", "Second quiz of the semester");
                fetchTests(connection);

            }
        } catch (ClassNotFoundException e) {
            System.err.println("PostgreSQL driver not found");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("Database connection failed");
            e.printStackTrace();
        }
    }

    // Insert Data
    public static void insertTestData(Connection conn, String courseId, String assessType, int assessNumber, String path, String description) {
        String insertQuery = "INSERT INTO tests (course_id, assess_type, assess_number, path, description) VALUES (?, ?, ?, ?, ?)";

        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            pstmt.setString(1, courseId);
            pstmt.setString(2, assessType);
            pstmt.setInt(3, assessNumber);
            pstmt.setString(4, path);
            pstmt.setString(5, description);
            pstmt.executeUpdate();
            System.out.println("Data inserted");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void fetchTests(Connection conn) {
        String query = "SELECT * FROM tests";

        try (PreparedStatement pstmt = conn.prepareStatement(query);
            ResultSet rs = pstmt.executeQuery()) {

            System.out.println("🔹 Fetching Data:");
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
}
