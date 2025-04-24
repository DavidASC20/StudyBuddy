# StudyBuddy
Web app to help with studying

NOTE: before you run any code you must populate the database as well as download the following frameworks and dependencies
    Make sure you have the following frameworks installed on your local machine
        - PostgreSQL
    Make sure you have node.js, npm installed on your machine
    After install npm, install:
        - axios    

FOR FIRST TIME INSTALLATION ONLY (do not do this after you do it the first time)
### Populate the databse (if this is your first time running the code, otherwise skip this section)
1. Create the database itself by logging into the psql terminal with 
```
psql -h localhost -U postgres -d studybuddy
```
2. Then, once in the postgres terminal run the following commands in succession:
```
CREATE DATABASE studybuddy;
\q
```
3. Now you are back in your normal terminal, run the following commands in succession:
```
psql -h localhost -U postgres -d studybuddy -f database_init.sql
psql -h localhost -U postgres -d studybuddy -f insertCourses.sql
```
2. Log into your database to check if it populated correctly by logging in with:
```
psql -h localhost -U postgres -d studybuddy
```
Once in the postgres terminal run the following in sucession:
```
\c studybuddy
SELECT * FROM courses;
```
If there are things being printed, the initialization worked and you can run:
```
\q
```
to exit out of the terminal.



## HOW TO RUN

### Starting your postgres database
1. Check the status of your service
```
sudo service postgresql status
```
If prompted to enter a password, enter the password you use to log onto the main user on the laptop.
It should display something like this
```
[sudo] password for <your_username>:
14/main (port 5432): down
``` 
If you have previously started your server and never shut it down it will display that it is still running

2. Start the service with:
```
sudo service postgresql start
```
If prompted to enter a password, enter the same password as you entered before.
It should display something like this
```
 * Starting PostgreSQL 14 database server                                                                        [ OK ]
```

### Starting api.js
1. Now in order to run the program you will first have to navigate to
```
~/your_filesystem/StudyBuddy/backend/src/sb_db/Database
```
2. Run the command:
```
node api.js
```
which should display the following:
```
Server running on http://localhost:5000
```

### Starting the frontend
1. Open up another terminal and navigate to the following location
```
~/your_filesystem/StudyBuddy/studybuddy
```
2. run
```
npm start
```
NOTE: If you run into any package issues, just run 
```
npm install <package>
```
to resolve any issues.
Upon success a window will pop up with the application!

You are done! You play around with the fields and search for tests.
To see a result try clicking "view existing tests"
search for CSCI 1100 exams and see what populates!
You can even specify the teacher like adding Jianxi Gao.

## Thank you for trying out our project! We hope to have more available soon! Good luck studying!