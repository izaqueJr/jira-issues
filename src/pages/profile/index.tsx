import styles from "@/styles/Profile.module.css";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Profile({ data, params }: any) {
  console.log(params, ">>>>>>>>>>>>>>>>>>>>>");

  const [isCopied, setIsCopied] = useState<boolean>(false);

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
Prazo: ${item?.fields.duedate}
Prioridade: ${item?.fields.priority.name}
Relator: ${item?.fields.reporter.displayName}
- - -
    `;

    return text;
  });

  return (
    <>
      <header className={styles.header}>
        <h1>Tasks</h1>

        <div className={styles.profile}>
          <button
            disabled={isCopied}
            onClick={() => {
              navigator.clipboard.writeText(
                textToClipboard.toString().replace(/,/g, "")
              );
              setIsCopied(true);
            }}
          >
            {isCopied ? "Copiado!" : "Copiar Tasks"}
          </button>
          <h2>{data[0]?.fields.assignee.displayName} </h2>

          <figure>
            <img
              src={data[0]?.fields.assignee.avatarUrls["48x48"]}
              alt="Imagem de perfil"
              className={styles.avatar}
            />
          </figure>
        </div>
      </header>

      <main className={styles.main}>
        {dataItems.map((item: any, index: any) => {
          return (
            <section key={index} className={styles.container}>
              <a href={`https://ed3digital.atlassian.net/browse/${item?.key}`}>
                <h3 className={styles.title}>
                  Projeto: {item?.fields.project.name}
                </h3>
                <h4 className={styles.subtitle}>
                  Tarefa: {item?.fields.summary} - {item?.key}
                </h4>

                <p className={styles.content}>
                  <span>Status:</span> {item?.fields.status.name}
                  <br />
                  <span>Prazo:</span> {item?.fields.duedate}
                  <br />
                  <span>Prioridade: </span>
                  {item?.fields.priority.name}
                  <br />
                  <span></span>
                </p>
                <div className={styles.relator_content}>
                  <h6> Relator - {item?.fields.reporter.displayName} </h6>
                  <figure>
                    <img
                      src={item?.fields.reporter.avatarUrls["48x48"]}
                      className={styles.avatar}
                    />
                  </figure>
                </div>
              </a>
            </section>
          );
        })}
      </main>
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
