import { Box, Container, IconButton, Typography } from "@mui/material";
import Page from "../../components/Page";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { ACQCTextField, ACTTextField } from "../../components/hook-form/RHFTextField";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAlertContext } from "../../components/AlertProvider";

const AdminConfigurationPage = () => {
  const [isLoading, setLoading] = useState(false);
  const { showSnackbar } = useAlertContext();
  const [isUpdateDisable, setUpdateDisable] = useState(true);

  const [QAQuantity, setQAQuantity] = useState(0);
  const [LRQuantity, setLRQuantity] = useState(0);
  const [CATime, setCATime] = useState(0);
  const [DSKQuantity, setDSKQuantity] = useState(0);
  const [HCQuantity, setHCQuantity] = useState(0);
  const [TPTime, setTPTime] = useState(0);
  const [ELQuantity, setELQuantity] = useState(0);
  const [ERQuantity, setERQuantity] = useState(0);
  const [EWQuantity, setEWQuantity] = useState(0);
  const [ESQuantity, setESQuantity] = useState(0);
  const [CSTime, setCSTime] = useState(0);
  const [ITWSQuantity, setITWSQuantity] = useState(0);
  const [ACLQuantity, setACLQuantity] = useState(0);
  const [PMTMQuantity, setPMTMQuantity] = useState(0);
  const [PEIPQuantity, setPEIPQuantity] = useState(0);
  const [PBTime, setPBTime] = useState(0);

  const [qaCount, setQACount] = useState({});
  const [lrCount, setLRCount] = useState({});
  const [DSKCount, setDSKCount] = useState({});
  const [HCCount, setHCCount] = useState({});
  const [ELCount, setELCount] = useState({});
  const [ERCount, setERCount] = useState({});
  const [EWCount, setEWCount] = useState({});
  const [ESCount, setESCount] = useState({});
  const [ITWSCount, setITWSCount] = useState({});
  const [ACLCount, setACLCount] = useState({});
  const [PMTMCount, setPMTMCount] = useState({});
  const [PEIPCount, setPEIPCount] = useState({});
  const [CSMarks, setCSMarks] = useState(0);
  const [TPMarks, setTPMarks] = useState(0);
  const [CAMarks, setCAMarks] = useState(0);
  const [PBMarks, setPBMarks] = useState(0);

  const questionsCountFetch = async () => {
    try {
      const response = await axios.get("https://scimics-api.onrender.com/scimics/questioncount");
      setQACount(response.data.data[0]);
      setLRCount(response.data.data[1]);
      setDSKCount(response.data.data[2]);
      setHCCount(response.data.data[3]);
      setESCount(response.data.data[4]);
      setELCount(response.data.data[5]);
      setERCount(response.data.data[6]);
      setEWCount(response.data.data[7]);
      setITWSCount(response.data.data[8]);
      setACLCount(response.data.data[9]);
      setPMTMCount(response.data.data[10]);
      setPEIPCount(response.data.data[11]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://scimics-api.onrender.com/scimics/getconfig");
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

  useEffect(() => {
    fetchData();
    questionsCountFetch();
  }, []);

  useEffect(() => {
    if (CATime == 0 || TPTime == 0 || CSTime == 0 || PBTime == 0) {
      setUpdateDisable(true);
      // console.log("zero");
    } else if (CATime > 0 && QAQuantity == 0 && LRQuantity == 0) {
      setUpdateDisable(true);
      // console.log("zero");
    } else if (TPTime > 0 && DSKQuantity == 0 && HCQuantity == 0) {
      setUpdateDisable(true);
      // console.log("zero");
    } else if (CSTime > 0 && ELQuantity == 0 && ERQuantity == 0) {
      setUpdateDisable(true);
      // console.log("zero");
    } else if (PBTime > 0 && ITWSQuantity == 0 && ACLQuantity == 0 && PMTMQuantity == 0 && PEIPQuantity == 0) {
      setUpdateDisable(true);
      // console.log("zero");
    } else {
      // console.log("not zero");
      setUpdateDisable(false);
    }

    setCAMarks(QAQuantity * 1 + LRQuantity * 1);
    setTPMarks(DSKQuantity * 1 + HCQuantity * 1);
    setCSMarks(ESQuantity * 5 + EWQuantity * 5 + ELQuantity * 5 + ERQuantity * 5);
    setPBMarks(ITWSQuantity * 1 + ACLQuantity * 1 + PMTMQuantity * 1 + PEIPQuantity * 1);
  }, [CATime, TPTime, CSTime, PBTime, QAQuantity, LRQuantity, DSKQuantity, HCQuantity, ESQuantity, ELQuantity, ERQuantity, EWQuantity, ITWSQuantity, ACLQuantity, PMTMQuantity, PEIPQuantity]);

  const onConfigUpdateHandle = async () => {
    setLoading(true);
    if (
      CATime > 0 ||
      TPTime > 0 ||
      CSTime > 0 ||
      PBTime > 0 ||
      ESQuantity > 0 ||
      EWQuantity > 0 ||
      ELQuantity > 0 ||
      ERQuantity > 0 ||
      DSKQuantity > 0 ||
      HCQuantity > 0 ||
      QAQuantity > 0 ||
      LRQuantity > 0 ||
      ITWSQuantity > 0 ||
      ACLQuantity > 0 ||
      PMTMQuantity > 0 ||
      PEIPQuantity > 0
    ) {
      try {
        const response = await axios.post("https://scimics-api.onrender.com/scimics/updateconfig", {
          ca_qa_total: QAQuantity,
          ca_lr_total: LRQuantity,
          ca_time: CATime,
          tp_dsk_total: DSKQuantity,
          tp_hc_total: HCQuantity,
          tp_time: TPTime,
          cs_s_total: ESQuantity,
          cs_w_total: EWQuantity,
          cs_l_total: ELQuantity,
          cs_r_total: ERQuantity,
          cs_time: CSTime,
          pb_itws_total: ITWSQuantity,
          pb_acl_total: ACLQuantity,
          pb_pmtm_total: PMTMQuantity,
          pb_peip_total: PEIPQuantity,
          pb_time: PBTime,
        });
        // console.log(response);
        setLoading(false);
        showSnackbar("Configuration Updated successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        showSnackbar("Configuration failed to update");
      }
    } else {
      setLoading(false);
      showSnackbar("All values shouldn't be 0");
    }
  };

  return (
    <Page title="Configuration">
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          Configuraion
          <IconButton>
            <InfoOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Typography>

        <Box p={1} />

        <Box
          px={5}
          py={0}
          sx={{
            bgcolor: "background.primary",
            borderRadius: "12px",
            width: { xs: "100%", md: "100%" },
          }}
        >
          <Typography variant="subtitle2">Cognitive Abilities ({CAMarks} Marks)</Typography>
          <Box p={1} />

          <Box sx={{ width: "100%", height: "80px", display: "flex", alignItems: "start" }}>
            <Box sx={{ width: "20%" }}>
              <ACTTextField name="CASessionTime" value={CATime} setTime={setCATime} />
            </Box>
            <Box sx={{ width: "80%" }}>
              <ACQCTextField name="qaCount" label={`(${qaCount.question_count}) Quantitative Aptitude`} value={QAQuantity} max={qaCount.question_count * 1} setQuantity={setQAQuantity} />
              <ACQCTextField name="lrCount" label={`(${lrCount.question_count}) Logical Reasoning`} value={LRQuantity} max={lrCount.question_count * 1} setQuantity={setLRQuantity} />
            </Box>
          </Box>
        </Box>
        <Box p={1} />

        <Box
          px={5}
          py={0}
          sx={{
            bgcolor: "background.primary",
            borderRadius: "12px",
            width: { xs: "100%", md: "100%" },
          }}
        >
          <Typography variant="subtitle2">Technical Proficiency ({TPMarks} Marks)</Typography>
          <Box p={1} />
          <Box sx={{ width: "100%", height: "80px", display: "flex", alignItems: "start" }}>
            <Box sx={{ width: "20%" }}>
              <ACTTextField name="TPSessionTime" value={TPTime} setTime={setTPTime} />
            </Box>
            <Box sx={{ width: "80%" }}>
              <ACQCTextField name="DSKCount" label={`(${DSKCount.question_count}) Domian Specific`} value={DSKQuantity} max={DSKCount.question_count * 1} setQuantity={setDSKQuantity} />
              <ACQCTextField name="HCCount" label={`(${HCCount.question_count}) Hands-on Coding`} value={HCQuantity} max={HCCount.question_count * 1} setQuantity={setHCQuantity} />
            </Box>
          </Box>
        </Box>
        <Box p={1} />

        <Box
          px={5}
          py={0}
          sx={{
            bgcolor: "background.primary",
            borderRadius: "12px",
            width: { xs: "100%", md: "100%" },
          }}
        >
          <Typography variant="subtitle2">Communication Skills ({CSMarks} Marks)</Typography>
          <Box p={1} />
          <Box sx={{ width: "100%", height: "80px", display: "flex", alignItems: "start" }}>
            <Box sx={{ width: "20%" }}>
              <ACTTextField name="CSSessionTime" value={CSTime} setTime={setCSTime} />
            </Box>
            <Box sx={{ width: "80%" }}>
              <ACQCTextField name="ESCount" disabled label={`(${ESCount.question_count * 0}) Speaking`} value={ESQuantity} max={ESCount.question_count * 0} setQuantity={setESQuantity} />
              <ACQCTextField name="ELCount" label={`(${ELCount.question_count / 5}) Listening`} value={ELQuantity} max={ELCount.question_count / 5} setQuantity={setELQuantity} />
              <ACQCTextField name="ERCount" label={`(${ERCount.question_count / 5}) Reading`} value={ERQuantity} max={ERCount.question_count / 5} setQuantity={setERQuantity} />
              <ACQCTextField name="EWCount" disabled label={`(${EWCount.question_count * 0}) Writing`} value={EWQuantity} max={EWCount.question_count * 0} setQuantity={setEWQuantity} />
            </Box>
          </Box>
        </Box>
        <Box p={1} />

        <Box
          px={5}
          py={0}
          sx={{
            bgcolor: "background.primary",
            borderRadius: "12px",
            width: { xs: "100%", md: "100%" },
          }}
        >
          <Typography variant="subtitle2">Personality & Behavioral ({PBMarks} Marks)</Typography>
          <Box p={1} />
          <Box sx={{ width: "100%", height: "80px", display: "flex", alignItems: "start" }}>
            <Box sx={{ width: "20%" }}>
              <ACTTextField name="PBSessionTime" value={PBTime} setTime={setPBTime} />
            </Box>
            <Box sx={{ width: "80%" }}>
              <ACQCTextField name="ITWSCount" label={`(${ITWSCount.question_count}) I.T.W.S`} value={ITWSQuantity} max={ITWSCount.question_count * 1} setQuantity={setITWSQuantity} />
              <ACQCTextField name="ACLCount" label={`(${ACLCount.question_count}) A.C.L`} value={ACLQuantity} max={ACLCount.question_count * 1} setQuantity={setACLQuantity} />
              <ACQCTextField name="PMTMCount" label={`(${PMTMCount.question_count}) P.M.T.M`} value={PMTMQuantity} max={PMTMCount.question_count * 1} setQuantity={setPMTMQuantity} />
              <ACQCTextField name="PEIPCount" label={`(${PEIPCount.question_count}) P.E.I.P `} value={PEIPQuantity} max={PEIPCount.question_count * 1} setQuantity={setPEIPQuantity} />
            </Box>
          </Box>
        </Box>
        <Box p={1} />

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <LoadingButton
            variant="outlined"
            loading={isLoading}
            // disabled={checkDisable}
            disabled={isUpdateDisable}
            onClick={() => onConfigUpdateHandle()}
            sx={{ minHeight: "56px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 6, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7" }}
          >
            Update
          </LoadingButton>
        </Box>
      </Container>
    </Page>
  );
};
export default AdminConfigurationPage;
