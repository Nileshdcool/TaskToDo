# TaskToDo

**TaskToDo** is an application designed for creating and managing daily tasks. Users can mark tasks as completed once done, and enjoy various features to enhance productivity.

---

## Application Overview

![TaskToDo Screenshot](./path-to-screenshot.png)

> *Screenshot of the application interface. Update the link to the actual image.*

---

## How to Start the Application

Follow the steps below to start the application.

### API Setup
1. Navigate to the API folder:
   ```bash
   cd API
   ```
2. Run the .NET API:
   ```bash
   dotnet run
   ```

### Client Setup
1. Navigate to the client folder:
   ```bash
   cd ..
   cd client-app
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## Development Commands

- **Run API in Watch Mode (no hot-reload)**:
  ```bash
  dotnet watch --no-hot-reload
  ```

- **List Available .NET Templates**:
  ```bash
  dotnet new -l
  ```

- **Build Docker Images**:
  ```bash
  docker-compose build
  ```

- **Start Docker Containers**:
  ```bash
  docker-compose up
  ```

- **Publish API in Release Mode**:
  ```bash
  dotnet publish -c Release -o ./bin/Publish
  ```

---

## Entity Framework Commands

- **Add Initial Migration**:
  ```bash
  dotnet ef migrations add InitialCreate -s API -p Persistence
  ```

- **Check Database**:
  ```bash
  dotnet ef database
  ```

- **Update Database**:
  ```bash
  dotnet ef database update -s API -p Persistence
  ```

---

## Features in Progress

Here are the upcoming features currently under development:

1. **User Authentication and Authorization**:
   - Implement JWT-based authentication.
   - Add role-based authorization for endpoint access.

2. **Real-time Notifications**:
   - Integrate SignalR to notify users of task updates in real-time.

3. **Task Reminders**:
   - Create a background service for sending task reminders via email or push notifications.

4. **Task Comments**:
   - Allow users to comment on tasks for better collaboration.

5. **File Attachments**:
   - Enable file attachments to tasks.

6. **Task Prioritization**:
   - Add task prioritization (high, medium, low).

7. **Search and Filtering**:
   - Implement search and filtering for easy task management.

8. **Activity Logging**:
   - Track and log user activities for auditing.

9. **API Rate Limiting**:
   - Add rate limiting to prevent API abuse.

10. **Internationalization (i18n)**:
    - Support multiple languages for global accessibility.

11. **Improved Error Handling**:
    - Enhance error handling with detailed messages.

12. **Unit and Integration Tests**:
    - Expand test coverage with more unit and integration tests.

13. **Performance Monitoring**:
    - Integrate tools like Application Insights for monitoring performance.

14. **Data Export**:
    - Enable task data export in various formats (e.g., CSV, Excel).

15. **Dark Mode**:
    - Add a dark mode for the client application.

---

## License

This project is licensed under the MIT License.
