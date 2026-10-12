import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useTasks } from './state/TaskContext';
import DashboardPage from './pages/DashboardPage';
import TaskFormPage from './pages/TaskFormPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

function Header() {
  return (
    <header className="topbar">
      <NavLink to="/" className="brand" aria-label="TaskFlow home">
        <span className="brand-mark">T</span>
        <span>taskflow<span className="brand-dot">.</span></span>
      </NavLink>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/tasks/new">Create task</NavLink>
      </nav>
      <div className="profile-chip"><span className="avatar">MP</span><span className="profile-name">My workspace</span></div>
    </header>
  );
}

function AppShell() {
  const { loading, error, reload } = useTasks();
  return (
    <div className="app-shell">
      <Header />
      {error && (
        <div className="global-alert" role="alert">
          <span><strong>Could not reach the task API.</strong> Make sure the API server is running.</span>
          <button className="button button-small button-outline" onClick={reload}>Try again</button>
        </div>
      )}
      {loading && <div className="loading-line"><span /> Loading your workspace…</div>}
      <main className="page-container">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tasks/new" element={<TaskFormPage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
          <Route path="/tasks/:taskId/edit" element={<TaskFormPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="footer"><span>TaskFlow</span><span>Keep the important things moving.</span></footer>
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
