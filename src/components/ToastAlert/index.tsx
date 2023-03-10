import React from "react";
import * as Toast from "@radix-ui/react-toast";
import { ToastRoot, ToastDescription, ToastViewport } from "./styles";

export default function ToastAlert(props: any) {
  return (
    <Toast.Provider>
      <ToastRoot open={props.open} onOpenChange={props.setOpen}>
        <ToastDescription>
          <figure>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              {...props}
            >
              <path d="M17.207 8.207l-1.414-1.414L11 11.586 8.707 9.293l-1.414 1.414L11 14.414z" />
              <path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z" />
            </svg>
          </figure>
          Copiado!
        </ToastDescription>
      </ToastRoot>
      <ToastViewport />
    </Toast.Provider>
  );
}
