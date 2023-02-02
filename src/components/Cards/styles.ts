import { styled } from '../../../stitches.config';


export const Section = styled("section", {
  borderRadius: 10,
  maxWidth: 400,
  minWidth: 300,
  width: "100%",
  boxShadow: "0px 10px 25px rgba(29, 52, 54, 0.08)",
});

export const Container = styled('a', {
  width: "100%",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  padding: 20,
  borderRadius: 10,
  height: "100%",
  justifyContent: "space-between",

  variants: {
    darkMode: {
      true: {
        backgroundColor: "#2C3440",
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
  },
});

export const RelatorContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: 'flex-end',
  marginTop: 10,
  borderTop: "1px solid #dddddd4a",
  alignItems: "center",
  gap: 30,
  paddingTop: 18,

  "& > h6": {
    fontSize: 14,
    color: "#fff",


  },

  "& > figure img": {
    borderRadius: "100%",


  }

})