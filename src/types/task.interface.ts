export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string;
  priority: string;
  deadline: string; 
  category_id: number;
}
