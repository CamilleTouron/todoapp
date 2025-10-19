import apiClient from './apiClient';
import { Task } from '@/components/TaskCard';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>('/tasks');
  return response.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await apiClient.post<Task>('/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
