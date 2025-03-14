package sb_db.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseInteractions {

    private static final String URL = "jdbc:postgresql://localhost:5432/studybuddy";
    private static final String USER = "postgres";
    private static final String PASSWORD = "postgres";

    public DatabaseInteractions() {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("psql driver not found");
            e.printStackTrace();
        }
    }

    public static void create_db() {
        String createTable = "CREATE TABLE IF NOT EXISTS tests (" +
                        "id SERIAL PRIMARY KEY, " +
                        "course_id TEXT NOT NULL, " +
                        "assess_type TEXT, " +
                        "assess_number INT NOT NULL, " +
                        "path TEXT NOT NULL, " +
                        "description TEXT)";
        
        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
                PreparedStatement st = connection.prepareStatement(createTable)) {
                    st.executeUpdate();
                    System.out.println("Table exists now.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void add_test(String coursecode, String assesstype, int assessnum, String path, String desc) {
        String insertQuery = "INSERT INTO tests (course_id, assess_type, assess_number, path, description) VALUES (?, ?, ?, ?, ?)";

        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
                PreparedStatement st = connection.prepareStatement(insertQuery)) {
            st.setString(1, coursecode);
            st.setString(2, assesstype);
            st.setInt(3, assessnum);
            st.setString(4, path);
            st.setString(5, desc);

            st.executeUpdate();
            System.out.println("Data inserted");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // function is not done yet,, need to figure out how to do this when multiple of the same type of tests
    /*
    public static int remove_by_name (String coursecode, String assesstype, int assessnum) {
        String deleteQuery = "SELECT assess_number FROM tests WHERE course_id = ? AND assess_type = ? AND assess_number = ?";
        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
                PreparedStatement st = conn.prepareStatement(deleteQuery)) {
            
            st.setInt(1, coursecode);
            st.setInt(2, assesstype);
            st.setInt(3, assessnum);
            st.executeUpdate();
            System.out.println()
            System.out.println("Data selected");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    */ 

    public static void remove_by_id(int id) {
        String deleteQuery = "DELETE FROM tests WHERE id = ?";
        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
                PreparedStatement st = connection.prepareStatement(deleteQuery)) {
            
            st.setInt(1, id);
            st.executeUpdate();
            System.out.println("Data deleted");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<String> getAllTests() {
        List<String> results = new ArrayList<>();
        String sql = "SELECT * FROM tests";

        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement st = connection.prepareStatement(sql);
             ResultSet rs = st.executeQuery()) {

            while (rs.next()) {
                String record = rs.getInt("id") + " | " +
                                rs.getString("course_id") + " | " +
                                rs.getString("assess_type") + " | " +
                                rs.getInt("assess_number") + " | " +
                                rs.getString("path") + " | " +
                                rs.getString("description");
                results.add(record);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return results;
    }

    // need desc update, file update, assess update?
    // APIs?
}