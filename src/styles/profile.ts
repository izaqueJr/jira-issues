import Link from "next/link";
import { styled } from "@stitches/react";

export const HeaderTitle = styled(Link, { 
  fontFamily: "Poppins",
  margin: 0,
  color: "#fff",
  fontSize: 18,
});

export const ProfileName = styled("p", {
  fontFamily: "Poppins",
  margin: 0,
  color: "#fff",
  fontSize: 14,
});
export const Main = styled("main", {
  gap: 20,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  maxWidth: 900,
  margin:  "40px auto",
  padding : "0 20px",
});

