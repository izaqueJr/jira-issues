import { Cards } from "@/components/Cards";
import { Heading, Text } from "@/styles/global";
import {
  Header,
  HeaderContainer,
  Main,
  ProfileContainer,
  Button,
  DarkModeButton,
  Container,
} from "@/styles/profile";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import ToastAlert from "./../../components/ToastAlert";
import * as Switch from "@radix-ui/react-switch";
export default function Profile({ data }: any) {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearTimeout(timerRef.current);
  }, []);

  const sortArr = () => {
    return data.sort((a: any, b: any) => {
      if (a.fields.status.name < b.fields.status.name) return -1;
      if (a.fields.status.name > b.fields.status.name) return 1;
      return 0;
    });
  };

  let dataItems = sortArr();

  const textToClipboard = dataItems.map((item: any, index: any) => {
    let text = `
Projeto: ${item?.fields.project.name}
Tarefa: ${item?.fields.summary} - ${item?.key}
Status: ${item?.fields.status.name}
Prazo: ${item?.fields.duedate || "Sem prazo definido"} 
Prioridade: ${item?.fields.priority.name}
Link: https://ed3digital.atlassian.net/browse/${item?.key}
- - -
    `;

    return text;
  });

  return (
    <>
      <Header darkMode={darkMode}>
        <HeaderContainer>
          <Heading as="h1" darkMode={darkMode}>
            Tasks
          </Heading>

          <ProfileContainer>
            <DarkModeButton
              darkMode={darkMode}
              onClick={() => {
                darkMode ? setDarkMode(false) : setDarkMode(true);
              }}
            >
              {darkMode ? (
                <>
                  <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                    <path fill="currentColor" d="M12 16a4 4 0 000-8v8z" />
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2v4a4 4 0 100 8v4a8 8 0 100-16z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              ) : (
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit={10}
                    strokeWidth={32}
                    d="M464 256 A208 208 0 0 1 256 464 A208 208 0 0 1 48 256 A208 208 0 0 1 464 256 z"
                  />
                  <path d="M256 176v160a80 80 0 010-160zM256 48v128a80 80 0 010 160v128c114.88 0 208-93.12 208-208S370.88 48 256 48z" />
                </svg>
              )}
            </DarkModeButton>

            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  textToClipboard.toString().replace(/,/g, "")
                );
                setOpen(true);
                window.clearTimeout(timerRef.current);
                timerRef.current = window.setTimeout(() => {
                  setOpen(false);
                }, 1000);
              }}
            >
              Copiar
            </Button>

            <ToastAlert open={open} onOpenChange={setOpen} />

            <Heading size="3" darkMode={darkMode}>
              {data[0]?.fields.assignee.displayName}{" "}
            </Heading>

            <figure>
              <img
                src={data[0]?.fields.assignee.avatarUrls["48x48"]}
                alt="Imagem de perfil"
              />
            </figure>
          </ProfileContainer>
        </HeaderContainer>
      </Header>
      <Main darkMode={darkMode}>
        <Container>
          {dataItems.map((item: any, index: any) => {
            return (
              <Cards
                darkMode={darkMode}
                key={index}
                index={index}
                taskKey={item?.key}
                taskProject={item?.fields.project.name}
                taskName={item?.fields.summary}
                taskStatus={item?.fields.status.name}
                taskDueDate={item?.fields.duedate}
                taskPriority={item?.fields.priority.name}
                taskReporter={item?.fields.reporter.displayName}
                taskReporterAvatar={item?.fields.reporter.avatarUrls["48x48"]}
              />
            );
          })}
        </Container>
      </Main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { domain, profile } = context.query;

  console.log("context", domain, profile);

  const result = await axios.get(
    `https://${domain}.atlassian.net/rest/api/2/search?jql=assignee%20in%20(${profile})%20AND%20status%20in%20(Aberto%2C%20%22Aguardando%20informa%C3%A7%C3%A3o%20externa%22%2C%20%22Em%20Andamento%22%2C%20%22In%20Progress%22%2C%20%22In%20Review%22%2C%20QA%2C%20Reopened%2C%20Rework%2C%20%22To%20Do%22)%20ORDER%20BY%20due%20ASC%2C%20priority&fields=priority,project,status,subtasks,summary,id,key,self,duedate,assignee,creator,reporter`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `izaque.junior@ed3.com.br:${process.env.JIRA_TOKEN}`
        ).toString("base64")}`,
        Accept: "application/json",
      },
    }
  );
  const data = result.data.issues;

  return {
    props: {
      data,
    },
  };
};
