export const personalityOpennessAchived =["Not Attempted","Unimaginative","Moderately Unimaginative","Moderately Imaginative","Imaginative"]
export const personalityConscientiousnessAchived =["Not Attempted","Disorganized","Moderately Disorganized","Moderately Conscientious","Conscientious"]
export const personalityExtraversionAchived =["Not Attempted","Introvert","Moderately Introvert","Moderately Extrovert","Extrovert"]
export const personalityAgreeablenessAchived =["Not Attempted","Self Centered","Moderately Self Centered","Moderately Agreeable","Agreeable"]
export const personalityEmotionalAchived =["Not Attempted","Neurotic","Moderately Neurotic","Moderately Tranquil","Tranquil"]

// const allSkills = [...greenSkills, ...graySkills];
        
// const skills = [
//     {
//         name: "Analytical",
//         score: analyticalSkillScore,
//         greenImage: AnalyticalWhite,
//         grayImage: AnalyticalGry,
//       },
//       {
//         name: "Quantitative",
//         score: QuantitativeSkillScore,
//         greenImage: QuantitativeWhite,
//         grayImage: QuantitativeGry,
//       },
//     {
//         name: "English",
//         score: EnglishSkillScore,
//         greenImage: EnglishWhite,
//         grayImage: EnglishGry,
//     },
//     {
//         name: "Domain",
//         score: DomainSkillScore,
//         greenImage: DomainWhite,
//         grayImage: DomainGry,
//     },
//     {
//         name: "Computer Fundamentals",
//         score: ComputerSkillScore,
//         greenImage: ComputerWhite,
//         grayImage: ComputerGry,
//     },
//     {
//         name: "Coding",
//         score: CodingSkillScore,
//         greenImage: CodingWhite,
//         grayImage: CodingGry,
//     },
//     {
//         name: "WET",
//         score: WETSkillScore,
//         greenImage: WetWhite,
//         grayImage: WetGry,
//     },
// ];
// {skills.map((skill, index) => (
//     <Box
//         key={index}
//         sx={{
//             display: "flex",
//             ...(skill.score > 35
//                 ? { border: "2px solid #66a91e", id: "greenBox", color: "#66a91e" }
//                 : { border: "2px solid #cfcfcf", id: "grayBox", color: "#cfcfcf" }),
//         }}
//     >
//         <Box
//             sx={{
//                 borderBottom: `2px solid ${skill.color}`,
//                 borderLeft: `2px solid ${skill.color}`,
//                 borderTop: `2px solid ${skill.color}`,
//                 width: "10px",
//                 height: "100%",
//             }}
//         />
//         <Box sx={{}}>
//             <Box
//                 sx={{
//                     backgroundColor: skill.color,
//                     height: "10px",
//                     marginBottom: "10px",
//                     marginTop: "10px",
//                 }}
//             />
//             <Box
//                 sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                 }}
//             >
//                 <Box
//                     sx={{
//                         backgroundColor: skill.color,
//                         borderRadius: "50%",
//                         width: "80px",
//                         height: "80px",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                     }}
//                 >
//                     <Box
//                         component="img"
//                         sx={{ width: "80%", height: "80%" }}
//                         alt="The End"
//                         src={skill.score > 35 ? skill.greenImage : skill.grayImage}
//                     />
//                 </Box>
//                 <Typography sx={{ fontSize: "25px" }}>{skill.name}</Typography>
//             </Box>
//         </Box>
//         <Box
//             sx={{
//                 borderBottom: `2px solid ${skill.color}`,
//                 borderRight: `2px solid ${skill.color}`,
//                 borderTop: `2px solid ${skill.color}`,
//                 width: "10px",
//                 height: "100%",
//             }}
//         />
//     </Box>
// ))}