import React from "react";
import Router from "next/router";
import styles from "@/styles/Home.module.css";

import { useForm } from "react-hook-form";
export default function Home() {
  const { register, handleSubmit } = useForm({});

  async function redirectToTasks(data: any) {
    const { profile, domain } = data;
    await Router.push(`/profile?profile=${profile}&domain=${domain}`);
  }

  return (
    <main className={styles.main}>
      <h1>Buscar Perfil:</h1>
      <form onSubmit={handleSubmit(redirectToTasks)} className={styles.form}>
        <label htmlFor="profile">Id do perfil Jira</label>
        <input prefix="seu-usuário" type="text" {...register("profile")} />

        <label htmlFor="domain">
          {/* // eslint-disable-next-line react/no-unescaped-entities */}
          Domínio Jira, ex: _myaccount_.atlassian.net
        </label>
        <input type="text" {...register("domain")} />
        <button type="submit">Buscar</button>
      </form>
    </main>
  );
}
