import apiClient from './apiClient';
import { Task } from '@/components/TaskCard';

export type PaginatedTasks = {
  items: Task[];
  total: number;
  page: number;
  perPage: number;
};

export const fetchTasks = async (page = 1): Promise<PaginatedTasks> => {
  const response: any = await apiClient.get('/tasks', { params: { page, perPage: 3 } });
  const payload = response.data && response.data.data ? response.data.data : response.data;
  return payload as PaginatedTasks;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response: any = await apiClient.post('/tasks', task);
  return (response.data && response.data.data ? response.data.data : response.data) as Task;
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const response: any = await apiClient.patch(`/tasks/${id}`, task);
  return (response.data && response.data.data ? response.data.data : response.data) as Task;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
