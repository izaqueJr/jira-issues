import React from "react";
import { Section, Title, Text, RelatorContainer, Container } from "./styles";

interface CardsProps {
  index: number;
  taskKey: string;
  taskProject: string;
  taskName: string;
  taskStatus: string;
  taskDueDate: string;
  taskPriority: string;
  taskReporter: string;
  taskReporterAvatar: string;
}

export function Cards({
  index,
  taskKey,
  taskProject,
  taskName,
  taskStatus,
  taskDueDate,
  taskPriority,
  taskReporter,
  taskReporterAvatar,
}: CardsProps) {
  return (
    <Section key={index}>
      <Container href={`https://ed3digital.atlassian.net/browse/${taskKey}`}>
        <div>
          <Title TitleType={"title"}>Projeto: {taskProject}</Title>
          <Title TitleType={"subtitle"}>
            Tarefa: {taskName} - {taskKey}
          </Title>

          <Text>
            <span>Status:</span> {taskStatus}
            <br />
            <span>Prazo:</span> {taskDueDate || "Sem prazo definido"}
            <br />
            <span>Prioridade: </span>
            {taskPriority}
            <br />
            <span></span>
          </Text>
        </div>
        <RelatorContainer>
          <h6> Relator - {taskReporter} </h6>
          <figure>
            <img src={taskReporterAvatar} />
          </figure>
        </RelatorContainer>
      </Container>
    </Section>
  );
}
