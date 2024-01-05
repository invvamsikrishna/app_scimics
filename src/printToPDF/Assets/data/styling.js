//pdf height per page 1123px
//header height 130px
//content height 922px
//footer height 64+7px

//style used for page1,
export const aFullPdfPage = {
  minHeight:"1454px",
  background: 'linear-gradient(to bottom, #08242c, #1f6679, #08242c)',
}
//style used for page3,
export const bFullPDFPage ={
  minHeight:"1454px",
  backgroundColor:"white",
  color:"black"
}
//style used for page1, page3 - After Header component Styles for center Box
export const ApageRenderingBox = {
  display: "flex",
  flexDirection: "column",
  // gap: "1.5rem",
  // backgroundColor:"blue",
  // paddingBottom:"338px",
  minHeight: "1256px",
};
//style used for page4, page5, page9, page10 - After Header component Styles for center Box
export const pageRenderingBox = {
  display: "flex",
  flexDirection: "column",
  // gap: "1rem",
  paddingLeft: "30px",
  paddingRight: "30px",
  // paddingBottom:"338px",
  // backgroundColor:"blue",
  minHeight: "1256px",
};


//Individual inner styles
export const mainHeaderTypography = {
  // fontSize: "35px",
  fontWeight: "bold",
  borderBottom: "3px solid #d4d4d4",
};
export const eachSkillBox = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  paddingLeft: "40px",
  paddingBottom: "1rem",
  borderBottom: "3px solid #d4d4d4",
};
export const eachSkillEndBox = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  paddingLeft: "40px",
  paddingBottom: "1rem",
};
export const barHeaderTypography = {
  // fontSize: "35px",
  fontWeight: "bold",
};
export const flexWraperBox = {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "25px"
};
export const linksTypography = {
  color: "#337ab9",
  borderRight: "2px solid #d4d4d4",
  paddingLeft: "2%",
  paddingRight: "2%",
};
export const eachPersonalityBox = {
  display:"flex", 
  flexDirection:"column", 
  gap:"1rem", 
  paddingBottom:"5rem", 
  paddingLeft: "30px",
  borderBottom:"5px solid #368dba"
}
export const eachPersonalityPageEndBox={
  display:"flex", 
  flexDirection:"column", 
  gap:"1rem", 
  paddingBottom:"5rem", 
  paddingLeft: "30px",
}
export const eachPersonalityInnerBox ={
  display: "flex", 
  alignItems: "center", 
  gap: "5px",
}
export const eachPersonalityEndTypography={
  paddingLeft:"1rem",
}

//page3 inner stylings
export const thirdPageContentBoxs ={
  width:"70%",
  display:"flex",
  borderBottom:"3px solid #6dcff6",
  padding:"1rem"
}
export const leftContentBox ={
  display:"flex",
  flexDirection:"column",
  alignItems:"end",
  width:"90%"
}
export const rightNumberTypography ={
  width:"10%",
  textAlign:"end",
  fontSize:"22px"
}
export const leftContentTypography ={
  color:"#7d7d87",
  fontSize:"14px"
}
//Page3 stylings end
