import { styled } from "@stitches/react";

export const Section = styled("section", {
  backgroundColor: "#2C3440",
  borderRadius: 10,
  boxShadow: "0px 10px 25px rgba(29, 52, 54, 0.08)",
  maxWidth: 400,
  minWidth: 300,
  width: "100%",
});
export const Container = styled("a", {
  width: "100%",
  backgroundColor: "#2C3440",
  display: "flex",
  flexDirection: "column",
  padding: 20,
  borderRadius: 10,
  height: "100%",
  justifyContent: "space-between",
});

export const Title = styled("h3", {
  fontFamily: "Poppins",

  margin: 0,
  marginBottom: 10,
  color: "#fff",

  variants: {
    TitleType: {
      title: {
        fontSize: 20,
        fontWeight: 500,
      },
      subtitle: {
        fontSize: 16,
        fontWeight: 400,
      },
    },
  },
})
export const Text = styled("p", {
  margin: 0,
  color: "#fff",
  fontSize: 14,
  lineHeight: "24px",
})

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