export interface MainPageInitial {
  tasksDetails: Array<SingleTask>;
  queue: Array<SingleTask>;
  onGoingTask: Array<SingleTask>;
  finishedTasks: Array<SingleTask>;
  currentTask: number;
}

export interface SingleTask {
  name: string;
  priority: string;
  time: number;
  id: number;
}

export interface TaskProps {
  name: string;
  priority: number;
}
