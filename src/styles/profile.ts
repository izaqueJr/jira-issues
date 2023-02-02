import Link from "next/link";
import { styled } from '../../stitches.config';

export const Container = styled("div", {
  gap: 20,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  maxWidth: 900,
  margin:  "40px auto",
  padding : "0 20px",
});

export const Main = styled("main", {
  backgroundColor: "#FAFAFA",
  padding: "20px 0",

  variants: {
    darkMode:{
      true: {
        backgroundColor: "#181c22",
      }
    }
  },
});

export const Header = styled("header", {
  boxShadow: "0px 10px 25px rgba(29, 52, 54, 0.08)",
  backgroundColor: "#fff",
  padding: "20px 0",
  variants: {
    darkMode:{
      true: {
        backgroundColor: "#252c36",
      }
    }
  },
});
export const HeaderContainer = styled("div", {
  maxWidth: 900,
  margin:  "0 auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding : "0 20px",
  alignItems: "center",
});

export const ProfileContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 20,
  justifyContent: "space-between",
  alignItems: "center",
  padding : "0 20px",

  "& figure > img":{
    borderRadius: "100%",
  }
});

export const Button = styled("button", {
  padding : "8px 20px",
  borderRadius: 5,
  border: "none",
  background: "#6d79ff",
  fontFamily: "Poppins",
  fontSize: 14,
  fontWeight: 500,
  color: "#fff",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#434a98"
  }
});

export const DarkModeButton = styled("button", {
  fontSize: 30,
  height: 40,
  width: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: "100%",
  backgroundColor: "transparent",

  "&:hover": {
    cursor: "pointer",
  },

  variants: {
    darkMode:{
      true: {
        color: "#fff",
      },
    }
  },
});

