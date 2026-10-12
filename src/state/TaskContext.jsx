import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { taskApi } from '../services/taskApi';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await taskApi.getAll();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Unable to load tasks.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const createTask = async (values) => {
    const task = {
      ...values,
      id: String(Date.now()),
      createdAt: new Date().toISOString()
    };
    const saved = await taskApi.create(task);
    setTasks((current) => [saved, ...current]);
    return saved;
  };

  const updateTask = async (id, values) => {
    const current = tasks.find((task) => String(task.id) === String(id));
    if (!current) throw new Error('This task no longer exists.');
    const saved = await taskApi.update(id, { ...current, ...values });
    setTasks((items) => items.map((task) => String(task.id) === String(id) ? saved : task));
    return saved;
  };

  const deleteTask = async (id) => {
    await taskApi.remove(id);
    setTasks((items) => items.filter((task) => String(task.id) !== String(id)));
  };

  const value = useMemo(() => ({
    tasks, loading, error, reload, createTask, updateTask, deleteTask
  }), [tasks, loading, error, reload]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used inside TaskProvider');
  return context;
}
