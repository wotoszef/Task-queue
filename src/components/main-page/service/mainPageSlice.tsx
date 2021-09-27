import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/rootReducer";
import { MainPageInitial, SingleTask } from "./mainPageModel";

const initialState = {
  tasksDetails: [],
  queue: [],
  onGoingTask: [],
  finishedTasks: [],
  currentTask: 1,
} as MainPageInitial;

export const sortedTask = createSelector(
  (state: RootState) => state.mainPage,
  (mainPage: MainPageInitial) => {
    if (mainPage.tasksDetails.length > 0) {
      //There is type any because it's sorting Array of object's so it need to be number, enum or bigInt
      const sortedTaskList = mainPage.tasksDetails
        .slice()
        .sort((a: any, b: any) => {
          return b.priority - a.priority;
        });
      return sortedTaskList;
    } else {
      return [];
    }
  }
);

export const sortedQueue = createSelector(
  (state: RootState) => state.mainPage,
  (mainPage: MainPageInitial) => {
    if (mainPage.queue.length > 0) {
      //There is type any because it's sorting Array of object's so it need to be number, enum or bigInt
      const sortQueueList = mainPage.queue.slice().sort((a: any, b: any) => {
        return b.priority - a.priority;
      });
      return sortQueueList;
    } else {
      return [];
    }
  }
);

export const getCurrentTask = createSelector(
  (state: RootState) => state.mainPage,
  (mainPage: MainPageInitial) => {
    const currentTaskIndex = mainPage.tasksDetails.findIndex(
      (task: SingleTask) => {
        return task.id === mainPage.currentTask;
      }
    );
    if (currentTaskIndex !== -1) {
      return mainPage.tasksDetails[currentTaskIndex];
    }
  }
);

const mainPageSlice = createSlice({
  name: "mainPage",
  initialState,
  reducers: {
    setTaskDetail(state, action) {
      state.tasksDetails.push(action.payload);
    },
    removeTask(state, action) {
      state.tasksDetails.splice(action.payload, 1);
    },
    setQueue(state, action) {
      state.queue.push(action.payload);
    },
    setOngoingTask(state, action) {
      state.onGoingTask.push(action.payload);
    },
    setFinishedTasks(state, action) {
      state.finishedTasks.push(action.payload);
    },
    removeOngoingTask(state, action) {
      state.onGoingTask.splice(action.payload, 1);
    },
    removeQueueElement(state, action) {
      state.queue.splice(action.payload, 1);
    },
    setCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
  },
});

export const {
  setTaskDetail,
  setCurrentTask,
  removeTask,
  setQueue,
  setOngoingTask,
  removeQueueElement,
  setFinishedTasks,
  removeOngoingTask,
} = mainPageSlice.actions;
export default mainPageSlice.reducer;
