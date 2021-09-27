import {
  AllTasks,
  Container,
  Content,
  Delete,
  DeleteContainer,
  ExecuteContainer,
  FinishedTasksContainer,
  FinishedTasksContent,
  InputContainer,
  Instruction,
  ListContainer,
  Ongoing,
  OngoingDescription,
  OngoingDescriptionContainer,
  OnGoingTask,
  OnGoingTaskContainer,
  OngoingText,
  QueueContainer,
  QueueContentContainer,
  QueueOngoing,
  Table,
  TableDescription,
  TableDescriptionContainer,
  Task,
  TaskContainer,
  TaskInQueue,
  TaskInQueueContainer,
  TaskInQueueContent,
  TaskInQueueDescription,
  TaskName,
  TaskPriority,
  TasksContainer,
  Title,
} from "./MainPageStyles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentTask,
  removeOngoingTask,
  removeQueueElement,
  removeTask,
  setCurrentTask,
  setFinishedTasks,
  setOngoingTask,
  setQueue,
  setTaskDetail,
  sortedQueue,
  sortedTask,
} from "./service/mainPageSlice";
import { RootState } from "../../redux/rootReducer";
import { useForm } from "react-hook-form";
import { SingleTask, TaskProps } from "./service/mainPageModel";
import { AppDispatch } from "../../redux/store";

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [id, setId] = useState<number>(1);
  const { tasksDetails, queue, onGoingTask, finishedTasks } = useSelector(
    (state: RootState) => state.mainPage
  );
  const sortTask = useSelector(sortedTask);
  const currentTask = useSelector(getCurrentTask);
  const sortQueue = useSelector(sortedQueue);
  const { register, handleSubmit } = useForm<TaskProps>();

  const randomTime = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const findIndexToDelete = () => {
    if (sortTask.length > 0 && currentTask !== undefined) {
      const taskIndex = tasksDetails.findIndex((task: SingleTask) => {
        return task.id === currentTask.id;
      });
      return taskIndex;
    }
  };

  const taskList = useMemo(() => {
    if (tasksDetails.length > 0) {
      return sortTask.map((task: SingleTask, index: number) => {
        return (
          <TaskContainer
            key={index}
            onClick={() => dispatch(setCurrentTask(task.id))}
            showClicked={currentTask?.id === task.id}
          >
            <TaskName>{task.name}</TaskName>
            <TaskPriority>{task.priority}</TaskPriority>
            <Delete>X</Delete>
          </TaskContainer>
        );
      });
    } else {
      return [];
    }
  }, [tasksDetails, sortTask, currentTask, dispatch]);

  const onSubmit = useCallback(
    (formData: TaskProps) => {
      dispatch(setTaskDetail({ ...formData, time: randomTime(5, 10), id: id }));
    },
    [id, dispatch]
  );

  const queueList = useMemo(() => {
    if (queue.length > 0) {
      const list = sortQueue.map((que: SingleTask) => {
        return (
          <TaskInQueueContent key={que.id}>
            <Task>{que.name}</Task>
            <Task>{que.priority}</Task>
          </TaskInQueueContent>
        );
      });
      return list;
    } else {
      return <div>Nothing's here :(</div>;
    }
  }, [queue, sortQueue]);

  const finishedList = useMemo(() => {
    if (finishedTasks.length > 0) {
      const list = finishedTasks.map((finish: SingleTask) => {
        return (
          <FinishedTasksContent key={finish.id}>
            <div>{finish.name}</div>
            <div>{finish.priority}</div>
          </FinishedTasksContent>
        );
      });
      return list;
    } else {
      return (
        <div style={{ textAlign: "center" }}>No tasks have finished yet :(</div>
      );
    }
  }, [finishedTasks]);

  const findTaskIndex = useMemo(() => {
    if (tasksDetails.length > 0) {
      const sortedIndex = tasksDetails.findIndex((task: SingleTask) => {
        return task.id === sortTask[0].id;
      });
      if (sortedIndex !== -1) {
        return sortedIndex;
      }
    }
  }, [tasksDetails, sortTask]);

  useEffect(() => {
    if (queue.length > 0 && onGoingTask.length < 1) {
      dispatch(setOngoingTask(queue[0]));
      dispatch(removeQueueElement(0));
    }
  }, [taskList, queue, onGoingTask, dispatch]);

  useEffect(() => {
    if (onGoingTask.length > 0) {
      setTimeout(() => {
        dispatch(setFinishedTasks(onGoingTask[0]));
        dispatch(removeOngoingTask(0));
        console.log(`Zadanie wykonało się po ${onGoingTask[0].time}`);
      }, onGoingTask[0].time * 1000);
    }
  }, [onGoingTask, dispatch]);

  return (
    <Container>
      <Instruction>
        <DeleteContainer>
          <div style={{ textAlign: "center" }}>Delete:</div>
          <div style={{ textAlign: "justify" }}>
            If you want to delete task, you need to click on it. Then click
            delete button and voil la!
          </div>
        </DeleteContainer>
        <ExecuteContainer>
          <div style={{ textAlign: "center" }}>Execute task:</div>
          <div style={{ textAlign: "justify" }}>
            In queue you can decide when you want your task to start, so if you
            add task to list you can execute them to queue
          </div>
        </ExecuteContainer>
      </Instruction>
      <div>
        <Title>Queue Page</Title>
      </div>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder={"Add task"}
          {...register("name", { required: true })}
        />
        <div>Select priority of your task</div>
        <select {...register("priority")}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={() => setId(id + 1)}>Add</button>
      </InputContainer>
      <ListContainer>
        <Title>All task lists</Title>
        <Content>
          <TasksContainer>
            <button
              onClick={() => {
                if (queue.length < 10 && taskList.length > 0) {
                  dispatch(setQueue(sortTask[0]));
                  dispatch(removeTask(findTaskIndex));
                }
              }}
            >
              Execute
            </button>
            <AllTasks>All tasks</AllTasks>
            <Table>
              <TableDescriptionContainer>
                <TableDescription>Name</TableDescription>
                <TableDescription>Priority</TableDescription>
                <TableDescription
                  style={{ border: "1px solid black", cursor: "pointer" }}
                  onClick={() => {
                    dispatch(removeTask(findIndexToDelete()));
                  }}
                >
                  Delete
                </TableDescription>
              </TableDescriptionContainer>
              {taskList}
            </Table>
          </TasksContainer>
          <QueueContainer>
            <h1>Queue</h1>
            <Table>
              <QueueContentContainer>
                <QueueOngoing>
                  <Ongoing>
                    <OngoingText>Ongoing task</OngoingText>
                    <OngoingDescriptionContainer>
                      <OngoingDescription>Name</OngoingDescription>
                      <OngoingDescription>Priority</OngoingDescription>
                      <OngoingDescription>When finished</OngoingDescription>
                    </OngoingDescriptionContainer>
                    <OnGoingTaskContainer>
                      {onGoingTask[0] && (
                        <OnGoingTask>{onGoingTask[0].name}</OnGoingTask>
                      )}
                      {onGoingTask[0] && (
                        <OnGoingTask>{onGoingTask[0].priority}</OnGoingTask>
                      )}
                      {onGoingTask[0] && (
                        <OnGoingTask>
                          {onGoingTask[0].time}s to finish
                        </OnGoingTask>
                      )}
                    </OnGoingTaskContainer>
                  </Ongoing>
                  <TaskInQueueContainer>
                    <div>Task in queue</div>
                    <TaskInQueueDescription>
                      <Task>Name</Task>
                      <Task>Priority</Task>
                    </TaskInQueueDescription>
                    <TaskInQueue>{queueList}</TaskInQueue>
                  </TaskInQueueContainer>
                </QueueOngoing>
              </QueueContentContainer>
            </Table>
          </QueueContainer>
          <div>
            <h1 style={{ textAlign: "center" }}>Finished tasks</h1>
            <Table>
              <FinishedTasksContainer>
                <div style={{ textAlign: "center" }}>Finished tasks</div>
                <div>{finishedList}</div>
              </FinishedTasksContainer>
            </Table>
          </div>
        </Content>
      </ListContainer>
    </Container>
  );
};

export default MainPage;
