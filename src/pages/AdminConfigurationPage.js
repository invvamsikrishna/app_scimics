import { Box, Container, TextField, Typography} from "@mui/material";
import Page from "../components/Page";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

const AdminConfigurationPage = () => {
  const [DSKQuantity,setDSKQuantity]=useState(0);
  const [HCQuantity,setHCQuantity]=useState(0);
  const [TPTime,setTPTime]=useState(0);
  const [qaQuantity,setQAQuantity]=useState(0);
  const [lrQuantity,setLRQuantity]=useState(0);
  const [CATime,setCATime]=useState(0);
  const [ELQuantity,setELQuantity]=useState(0);
  const [ERQuantity,setERQuantity]=useState(0);
  const [EWQuantity,setEWQuantity]=useState(0);
  const [ESQuantity,setESQuantity]=useState(0);
  const [CSTime,setCSTime]=useState(0);
  const [ITWSQuantity,setITWSQuantity]=useState(0);
  const [ACLQuantity,setACLQuantity]=useState(0);
  const [PMTMQuantity,setPMTMQuantity]=useState(0);
  const [PEIPQuantity,setPEIPQuantity]=useState(0);
  const [PBTime,setPBTime]=useState(0);
  // const [QuestionsCount,setQuestionsCount]=useState({});
  const [DSKCount,setDSKCount]=useState({});
  const [HCCount,setHCCount]=useState({});
  const [qaCount,setQACount]=useState({});
  const [lrCount,setLRCount]=useState({});
  const [ELCount,setELCount]=useState({});
  const [ERCount,setERCount]=useState({});
  const [EWCount,setEWCount]=useState({});
  const [ESCount,setESCount]=useState({});
  const [ITWSCount,setITWSCount]=useState({});
  const [ACLCount,setACLCount]=useState({});
  const [PMTMCount,setPMTMCount]=useState({});
  const [PEIPCount,setPEIPCount]=useState({});
  const questionsCountFetch =async () => {
    try {
      const response = await axios.get("https://scimics-api.onrender.com/scimics/questioncount");
      console.log(response.data.data);
      // setQuestionsCount(response.data.data[2]);
      setQACount(response.data.data[0])
      setLRCount(response.data.data[1])
      setDSKCount(response.data.data[2])
      setHCCount(response.data.data[3])
      setESCount(response.data.data[4])
      setELCount(response.data.data[5])
      setERCount(response.data.data[6])
      setEWCount(response.data.data[7])
      setITWSCount(response.data.data[8])
      setACLCount(response.data.data[9])
      setPMTMCount(response.data.data[10])
      setPEIPCount(response.data.data[11])
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
// console.log(DSKCount.question_count);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("https://scimics-api.onrender.com/scimics/getconfig");
        console.log(response.data.data);
        setDSKQuantity(response.data.data.tp_dsk_total);
        setHCQuantity(response.data.data.tp_hc_total);
        setTPTime(response.data.data.tp_time);
        setQAQuantity(response.data.data.ca_qa_total);
        setLRQuantity(response.data.data.ca_lr_total);
        setCATime(response.data.data.ca_time);
        setELQuantity(response.data.data.cs_l_total);
        setERQuantity(response.data.data.cs_r_total);
        setEWQuantity(response.data.data.cs_w_total);
        setESQuantity(response.data.data.cs_s_total);
        setCSTime(response.data.data.cs_time);
        setITWSQuantity(response.data.data.pb_itws_total);
        setACLQuantity(response.data.data.pb_acl_total);
        setPMTMQuantity(response.data.data.pb_pmtm_total);
        setPEIPQuantity(response.data.data.pb_peip_total);
        setPBTime(response.data.data.pb_time);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    
    questionsCountFetch();
  },[])
  // useEffect(()=>{
  //   setDSKCount((prevCount) => {
  //     const updatedQuestionsCount = QuestionsCount.map((item) => {
  //       if (item.icap_subcategory_id === 3) {
  //         return { ...item, question_count: prevCount };
  //       }
  //       return item;
  //     });
  //     setQuestionsCount(updatedQuestionsCount);
  //     return prevCount; 
  //   });
  // },[QuestionsCount])
  // console.log(DSKCount);
const onConfigUpdateHandle=async()=>{
  console.log("onConfigUpdateHandle");
  try {
    const response = await axios.post("https://scimics-api.onrender.com/scimics/updateconfig", {
        "ca_qa_total":qaQuantity,
        "ca_lr_total":lrQuantity,
        "ca_time":CATime,
        "tp_dsk_total":DSKQuantity,
        "tp_hc_total":HCQuantity,
        "tp_time":TPTime,
        "cs_s_total":ESQuantity,
        "cs_w_total":EWQuantity,
        "cs_l_total":ELQuantity,
        "cs_r_total":ERQuantity,
        "cs_time":CSTime,
        "pb_itws_total":ITWSQuantity,
        "pb_acl_total":ACLQuantity,
        "pb_pmtm_total":PMTMQuantity,
        "pb_peip_total":PEIPQuantity,
        "pb_time":PBTime,
    });
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
  return (
    <Page title="Configuration">
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Box px={5} py={1} 
          sx={{ 
          bgcolor: "background.primary", 
          borderRadius: "12px", 
          width: { xs: "100%", md: "100%" }, 
          marginBottom:"15px"}}>
          <Typography variant="subtitle1" >
            Technical Proficiency
          </Typography>
          <Box sx={{width:"100%", display:"flex", alignItems:"center"}}>
            <Box sx={{width:"20%"}}>
              <TextField name="sessionTime" label="Time (min)" type="number"  sx={{width: "80%"}} 
              value={TPTime} onChange={(e) => setTPTime(e.target.value)} 
              />
            </Box>
            <Box sx={{width:"80%"}} >
              <TextField name="questionCount" label={`Domian-specific (${DSKCount.question_count})`} type="number" sx={{margin: 2, width: "20%" }} 
              value={DSKQuantity} onChange={(e) => setDSKQuantity(e.target.value)} 
              />
              <TextField name="questionCount" label={`Hands on coding (${HCCount.question_count})`} type="number" sx={{ margin: 2, width: "20%" }} 
              value={HCQuantity} onChange={(e) => setHCQuantity(e.target.value)} 
              />
            </Box>
          </Box>
        </Box>
        <Box px={5} py={1} 
          sx={{ 
          bgcolor: "background.primary", 
          borderRadius: "12px", 
          width: { xs: "100%", md: "100%" }, 
          marginBottom:"15px"}}>
          <Typography variant="subtitle1" >
            Cognitive Abilities
          </Typography>
          <Box sx={{width:"100%", display:"flex", alignItems:"center"}}>
            <Box sx={{width:"20%"}}>
              <TextField name="sessionTime" label="Time (min)" type="number"  sx={{width: "80%"}} 
              value={CATime} onChange={(e) => setCATime(e.target.value)} 
              />
            </Box>
            <Box sx={{width:"80%"}} >
              <TextField name="questionCount" label={`Quantitative Aptitude (${qaCount.question_count})`} type="number" sx={{margin: 2, width: "20%" }} 
              value={qaQuantity} onChange={(e) => setQAQuantity(e.target.value)} 
              />
              <TextField name="questionCount" label={`Logical Reasoning (${lrCount.question_count})`} type="number" sx={{ margin: 2, width: "20%" }} 
              value={lrQuantity} onChange={(e) => setLRQuantity(e.target.value)} 
              />
            </Box>
          </Box>
        </Box>
        <Box px={5} py={1} 
          sx={{ 
          bgcolor: "background.primary", 
          borderRadius: "12px", 
          width: { xs: "100%", md: "100%" }, 
          marginBottom:"15px"}}>
          <Typography variant="subtitle1" >
            Communication Skills
          </Typography>
          <Box sx={{width:"100%", display:"flex", alignItems:"center"}}>
            <Box sx={{width:"20%"}}>
              <TextField name="sessionTime" label="Time (min)" type="number"  sx={{width: "80%"}} 
              value={CSTime} onChange={(e) => setCSTime(e.target.value)} 
              />
            </Box>
            <Box sx={{width:"80%"}} >
              <TextField name="questionCount" label={`English Listening (${ELCount.question_count/5})`} type="number" sx={{margin: 2, width: "20%" }} 
              value={ELQuantity} onChange={(e) => setELQuantity(e.target.value)} 
              />
              <TextField name="questionCount" label={`English Reading (${ERCount.question_count/5})`} type="number" sx={{ margin: 2, width: "20%" }} 
              value={ERQuantity} onChange={(e) => setERQuantity(e.target.value)} 
              />
              <TextField name="questionCount" label={`English Writing (${EWCount.question_count*0})`} type="number" sx={{margin: 2, width: "20%" }} 
              value={EWQuantity} onChange={(e) => setEWQuantity(e.target.value)} 
              />
              <TextField name="questionCount" label={`English Speaking (${ESCount.question_count*0})`} type="number" sx={{ margin: 2, width: "20%" }} 
              value={ESQuantity} onChange={(e) => setESQuantity(e.target.value)} 
              />
            </Box>
          </Box>
        </Box>
        <Box px={5} py={1} 
          sx={{ 
          bgcolor: "background.primary", 
          borderRadius: "12px", 
          width: { xs: "100%", md: "100%" }, 
          marginBottom:"15px"}}>
          <Typography variant="subtitle1" >
            Personality & Behavioral
          </Typography>
          <Box sx={{width:"100%", display:"flex", alignItems:"center"}}>
            <Box sx={{width:"20%"}}>
              <TextField name="sessionTime" label="Time (min)" type="number"  sx={{width: "80%"}} 
              value={PBTime} onChange={(e) => setPBTime(e.target.value)} 
              />
            </Box>
            <Box sx={{width:"80%"}} >
              <TextField name="questionCount" label={`I.T.W.S (${ITWSCount.question_count})`} type="number" sx={{margin: 2, width: "20%" }} 
              value={ITWSQuantity} onChange={(e) => setITWSQuantity(e.target.value)} 
              />
              <TextField name="questionCount" label={`A.C.L (${ACLCount.question_count})`} type="number" sx={{ margin: 2, width: "20%" }} 
              value={ACLQuantity} onChange={(e) => setACLQuantity(e.target.value)} 
              />
              <TextField name="questionCount" label={`P.M.T.M (${PMTMCount.question_count})`} type="number" sx={{margin: 2, width: "20%" }} 
              value={PMTMQuantity} onChange={(e) => setPMTMQuantity(e.target.value)} 
              />
              <TextField name="questionCount" label={`P.E.I.P (${PEIPCount.question_count})`} type="number" sx={{ margin: 2, width: "20%" }} 
              value={PEIPQuantity} onChange={(e) => setPEIPQuantity(e.target.value)} 
              />
            </Box>
          </Box>
        </Box>

        <Box  
          sx={{ 
          display:"flex",
          justifyContent:"end"
          }}>

        <LoadingButton
            variant="outlined"
            onClick={() => onConfigUpdateHandle()}
            sx={{ minHeight: "56px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 6, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7", }}
          >
            Update
          </LoadingButton>
        </Box>
      </Container>
    </Page>
  );
};
export default AdminConfigurationPage;