
import { styled } from '../../stitches.config';

export const Button = styled("button", {
  padding : "8px 20px",
  borderRadius: 5,
  border: "none",
  backgroundColor: "#fff",
  background: "#6d79ff",
  color: "#fff",
  fontFamily: "Poppins",
  fontSize: 14,
  fontWeight: 500,

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#525bbb",
  }
});

export const Heading = styled("h2", {
  fontFamily: "Poppins",
  margin: 0,
  color: "#000",
  variants: {
    size: {
      1: {
        fontSize: '24px',
        lineHeight: "32px",
        fontWeight: 500,
      },
      2: {
        lineHeight: '28px',
        fontSize: '20px',
        fontWeight: 500,
      },
      3: {
        lineHeight: '24px',
        fontSize: '16px',
        fontWeight: 400,
      },
      6: {
        lineHeight: '18px',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    darkMode:{
      true: {
        color: "#fff",
      }
    }
  },
})

export const Content = styled("div", {
  display: "flex",
  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },

    gap:{
      8: { gap: 8 },
      12: { gap:12 },
      16: { gap: 16 },
      20: { gap: 20 },
      24: { gap: 24 },
      28: { gap: 28 },
    }
  }
})

export const Text = styled("p", {
  margin: 0,
  color: "#000",
  fontSize: 14,
  lineHeight: "24px",

  variants: {
    darkMode:{
      true: {
        color: "#fff",
      }
    }
  }
})

