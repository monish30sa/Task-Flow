# TaskFlow — React Task Management Application

A small, demo-ready task manager built with React, React Router, a JSON REST API, reusable components, form validation, and Jest + React Testing Library.

## Requirements

- Node.js 18 or newer
- npm

## Run the application

1. Extract the ZIP.
2. Open a terminal in the extracted `react-task-manager` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the frontend and mock REST API together:

   ```bash
   npm run dev
   ```

5. Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

The React frontend runs on port 5173 and the JSON Server API runs on port 3001. The API endpoint is `http://localhost:3001/tasks`.

## Available commands

- `npm run dev` — starts both the frontend and API
- `npm run build` — creates a production build
- `npm test` — runs Jest and React Testing Library tests

## Features

- Dashboard statistics and task list
- Create, view, edit, and delete tasks
- Status and priority filters, plus text search
- Form validation and confirmation before deletion
- Loading, error, and empty states
- React Router pages for dashboard, task details, and task form
- Shared task state through Context API
- REST API requests with `fetch`
- Responsive layout
- Tests for the task form and task list

## API notes

This project uses JSON Server as a local mock REST API. It supports the usual REST operations and stores demo data in `db.json`. It is intended for training/demo use, not production deployment.

If the API server is not running, the app displays an error message with a retry option. Start the project with `npm run dev` so both services are launched.

## Suggested demo flow

1. Show dashboard cards and existing tasks.
2. Search for a task and filter by status.
3. Add a task with an invalid title to demonstrate validation.
4. Add a valid task and show it in the list.
5. Open a task, edit it, and change its status.
6. Delete a task and confirm the deletion.
7. Explain component props, Context API, `useEffect`, `useState`, routing, API calls, and tests.

## Important

Read through the components and service before presenting. Be prepared to explain why state is shared, why each route exists, and how loading/error states are handled.
