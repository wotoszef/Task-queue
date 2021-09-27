import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Instruction = styled.div`
  position: absolute;
  top: 5rem;
  left: 5rem;
  width: 15rem;
  height: 15rem;
  padding: 0.5rem 1rem;
  border: 1px solid black;
`;

export const DeleteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid black;
`;

export const ExecuteContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

export const AllTasks = styled.div`
  margin: 0.7rem 0;
  font-size: 2rem;
  font-weight: bold;
`;

export const InputContainer = styled.form`
  margin: 3rem 0;
  height: 10rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

export const ListContainer = styled.div`
  margin: 3rem 0;
`;

export const Title = styled.h1`
  text-align: center;
  font-family: sans-serif;
`;

export const Content = styled.div`
  width: 70rem;
  display: flex;
  justify-content: space-around;
`;

export const TasksContainer = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.div`
  width: 20rem;
  height: 20rem;
  border: 2px solid grey;
  overflow: scroll;
  overflow-x: hidden;
`;

export const TaskContainer = styled.div<{ showClicked: boolean }>`
  width: 20rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid grey;
  margin: 1rem 0;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: 0.5s;
  background-color: ${(props) =>
    props.showClicked ? "#d9d9d9" : "transparent"};

  &:hover {
    background-color: #d9d9d9;
  }
`;

export const TaskName = styled.div`
  width: 33%;
  text-align: center;
`;

export const TaskPriority = styled.div`
  width: 33%;
  text-align: center;
`;

export const Delete = styled.div`
  width: 33%;
  text-align: center;
`;

export const TableDescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20rem;
  height: 1.5rem;
  border-bottom: 2px solid grey;
`;

export const TableDescription = styled.div`
  width: 33%;
  text-align: center;
`;

export const QueueContainer = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const QueueContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const QueueOngoing = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Ongoing = styled.div`
  width: 100%;
  height: 5rem;
  border-bottom: 2px solid grey;
`;

export const OngoingText = styled.div`
  text-align: center;
  font-family: sans-serif;
`;

export const OngoingDescriptionContainer = styled.div`
  width: 15rem;
  height: 1rem;
  display: flex;
  justify-content: center;
`;

export const OngoingDescription = styled.div`
  width: 33%;
  font-size: 0.7rem;
  font-family: sans-serif;
  white-space: nowrap;
  text-align: center;
`;

export const OnGoingTaskContainer = styled.div`
  width: 15rem;
  height: 1rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
`;

export const OnGoingTask = styled.div`
  width: 33%;
  font-size: 0.7rem;
  font-weight: 600;
  font-family: sans-serif;
  white-space: nowrap;
  text-align: center;
`;

export const FinishedTask = styled.div`
  width: 10rem;
  display: flex;
  justify-content: center;
`;

export const TaskInQueueContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TaskInQueueDescription = styled.div`
  width: 15rem;
  margin: 1rem 0;
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid grey;
`;

export const TaskInQueue = styled.div`
  width: 15rem;
  height: 10rem;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
`;

export const TaskInQueueContent = styled.div`
  display: flex;
  width: 15rem;
  display: flex;
  justify-content: space-around;
`;

export const Task = styled.div`
  width: 5rem;
  text-align: center;
  margin: 0.5rem 0;
`;

export const FinishedTasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FinishedTasksContent = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-around;
`;
