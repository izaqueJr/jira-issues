import { Heading, Text } from "@/styles/global";
import React from "react";
import { Section, RelatorContainer, Container } from "./styles";
interface CardsProps {
  index: number;
  taskKey: string;
  taskProject: string;
  taskName: string;
  taskStatus: string;
  taskDueDate: string;
  taskPriority: string;
  taskReporter: string;
  darkMode: boolean;
  taskReporterAvatar: string;
}

export function Cards({
  index,
  taskKey,
  taskProject,
  taskName,
  taskStatus,
  darkMode,
  taskDueDate,
  taskPriority,
  taskReporter,
  taskReporterAvatar,
}: CardsProps) {
  return (
    <Section key={index}>
      <Container
        href={`https://ed3digital.atlassian.net/browse/${taskKey}`}
        darkMode={darkMode}
        gap="12"
      >
        <Heading as="h3" size="2" darkMode={darkMode}>
          Projeto: {taskProject}
        </Heading>
        <Heading as="h4" size="3" darkMode={darkMode}>
          Tarefa: {taskName} - {taskKey}
        </Heading>

        <Text darkMode={darkMode}>
          <span>Status:</span> {taskStatus}
          <br />
          <span>Prazo:</span> {taskDueDate || "Sem prazo definido"}
          <br />
          <span>Prioridade: </span>
          {taskPriority}
          <br />
          <span></span>
        </Text>

        <RelatorContainer>
          <Heading size="6" darkMode={darkMode}>
            Relator - {taskReporter}
          </Heading>
          <figure>
            <img src={taskReporterAvatar} />
          </figure>
        </RelatorContainer>
      </Container>
    </Section>
  );
}
