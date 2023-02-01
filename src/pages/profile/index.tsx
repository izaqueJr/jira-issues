import { Cards } from "@/components/Cards";
import { HeaderTitle, Main, ProfileName } from "@/styles/profile";
import styles from "@/styles/Profile.module.css";
import axios from "axios";
import { GetServerSideProps } from "next";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ToastAlert from "./../../components/ToastAlert";

export default function Profile({ data }: any) {
  const [open, setOpen] = useState(false);
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
      <header className={styles.header}>
        <HeaderTitle href="/">
          <h1>Tasks</h1>
        </HeaderTitle>

        <div className={styles.profile}>
          <button
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
          </button>

          <ToastAlert open={open} onOpenChange={setOpen} />

          <ProfileName>{data[0]?.fields.assignee.displayName} </ProfileName>

          <figure>
            <img
              src={data[0]?.fields.assignee.avatarUrls["48x48"]}
              alt="Imagem de perfil"
              className={styles.avatar}
            />
          </figure>
        </div>
      </header>

      <Main>
        {dataItems.map((item: any, index: any) => {
          return (
            <Cards
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
