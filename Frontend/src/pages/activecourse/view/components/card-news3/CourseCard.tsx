import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { styled, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Info, InfoSubtitle, InfoTitle } from "./info-basic";
import { Ribbon } from "react-ribbons";


const titleFontSize = "1rem";
const family = "'Sen', sans-serif";

const StyledCard = styled(Card)(() => ({
  width: '100%',
  height: 100,
  position: "relative",
  boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)",
  overflow: "visible",
  borderRadius: "1.5rem",
  transition: "0.4s",

  "&:hover": {
    transform: "translateY(-2px)",
    "& .Shadow1": {
      bottom: "-1.5rem",
    },
    "& .Shadow2": {
      bottom: "-2.5rem",
    },
  },

  "&:before": {
    content: '""',
    position: "absolute",
    zIndex: 0,
    display: "block",
    width: "80%",
    bottom: -1,
    height: "100%",
    borderRadius: "1.5rem",
    backgroundColor: "rgba(0,0,0,0.08)",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 0,
  backgroundColor: "rgba(0, 0, 0, 0.08)",
  backgroundPosition: "center",
  opacity: "70%"
});

const BoxMain = styled(Box)(() => ({
  overflow: "hidden",
  borderTopLeftRadius: "1.5rem",
  borderTopRightRadius: "1.5rem",
  zIndex: 1,

  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    display: "block",
    width: "100%",
    height: "0%",
    background: "linear-gradient(to top, #014a7d, rgba(0,0,0,0))",
  },
}));

const StyledDivContent = styled("div")(() => ({
  position: "absolute",
  alignItems: "center",
  width: "100%",
  zIndex: 1,
  padding: "1.5rem 1.5rem 1rem",
}));


const TypographyTitle = styled(Typography)(() => ({
  fontFamily: "'Sen', sans-serif",
  fontSize: "1.5rem",
  lineHeight: 1,
  fontWeight: 800,
  color: "#fff",
  alignItems: "center"
}));

const RowAuthor = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  minWidth: 10,
  padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(3)}`,
  margin: 0,
  backgroundColor: theme.palette.mode === "dark" ? "grey.900" : "#fff",
  zIndex: 1,
  position: "relative",
  borderBottomLeftRadius: "1.5rem",
  borderBottomRightRadius: "1.5rem",
}));



const newsInfoStyles = ({ palette }: Theme) => ({
  title: {
    fontFamily: family,
    fontSize: titleFontSize,
    color: palette.grey["600"],
    lineHeight: 1.2,
    marginBottom: 0,
    fontWeight: 600,
  },
  subtitle: {
    fontFamily: family,
    color: palette.grey["500"],
    fontSize: titleFontSize,
    lineHeight: 1.75,
  },
});



const CourseCard = ({
  image,
  status,
  title,
  numSessions,
  numChapters,
}: {
  image: string;
  status: string;
  title: string;
  numSessions: string;
  numChapters: string;
}) => {

  return (
    <Grid container spacing={10}>
      <Grid item>
        <StyledCard>
          <BoxMain
            height={150}
            width={250}
            position={"relative"}
            alignItems={"center"}
            display={"flex"}
          >
            <StyledCardMedia
              image={image}
            />
            <Ribbon
              side="right"
              type="edge"
              size="normal"
              backgroundColor="green"
              color="#fff"
              fontFamily="sans"
              withStripes={false}
            >
              {status}
            </Ribbon>
            <StyledDivContent>

              <TypographyTitle
                variant={"subtitle1"}>
                {title}
              </TypographyTitle>
            </StyledDivContent>
          </BoxMain>
          <RowAuthor sx={{ background: "grey.900" }}>
            <Info useStyles={newsInfoStyles} sx={{ alignSelf: "center" }} >
              <InfoSubtitle>{numSessions}</InfoSubtitle>
              <InfoTitle>SESSIONS</InfoTitle>
            </Info>
            <Info useStyles={newsInfoStyles}>
              <InfoSubtitle>{numChapters}</InfoSubtitle>
              <InfoTitle>CHAPTERS</InfoTitle>
            </Info>
          </RowAuthor>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default CourseCard;
