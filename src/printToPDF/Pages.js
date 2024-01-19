import './pages.css';
import React from 'react';
import { Box } from "@mui/material";
// import Page1 from './Pages/Page1';
// import Page2 from './Pages/Page2';
// import Page3 from './Pages/Page3';
// import Page4 from './Pages/Page4';
// import Page5 from './Pages/Page5';
// import Page9 from './Pages/Page9';
// import Page10 from './Pages/Page10';
// import Page12 from './Pages/Page12';
// import Page13 from './Pages/Page13';
import { useEffect, useState } from 'react';
import { fDateTime } from '../services/formatTime';
import { useRowData } from '../components/createContextCodes/RowDataContext';
import PdfPage2 from './PdfPages/PdfPage2';
import PdfPage8 from './PdfPages/PdfPage8';
import PdfPage7 from './PdfPages/PdfPage7';
import PdfPage3 from './PdfPages/PdfPage3';

const Pages = ({ personData }) => {
  // console.log(personData);
  const { rowData } = useRowData();
  // console.log(rowData);
  // console.log(rowData.firstname);

  const [id, setId] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [universityName, setuniversityName] = useState("");
  const [region, setregion] = useState("");
  const [course, setcourse] = useState("");
  const [applicationValidity, setapplicationValidity] = useState("");
  const [assessedOn, setassessedOn] = useState("");
  const [batch, setbatch] = useState(0);
  const [overallScore,setoverallScore]=useState(0);
  const [scoreMinRange,setscoreMinRange]=useState(0);
  const [scoreMaxRange,setscoreMaxRange]=useState(0);
  const [institutePercentile,setinstitutePercentile]=useState(0);
  const [nationalPercentile,setnationalPercentile]=useState(0);
  const [regionalPercentile,setregionalPercentile]=useState(0);
  const [examCondectedOn,setexamCondectedOn]=useState("");
  
  const [skillDataArray,setskillDataArray] = useState([]);
  const [analyticalSkillScore, setanalyticalSkillScore] = useState(null);
  const [analyticalSkillName, setanalyticalSkillName] = useState(null);
  const [analyticalSkillLinks, setanalyticalSkillLinks] = useState([]);
  const [QuantitativeSkillScore, setQuantitativeSkillScore] = useState(null);
  const [QuantitativeSkillName, setQuantitativeSkillName] = useState(null);
  const [QuantitativeSkillLinks, setQuantitativeSkillLinks] = useState([]);
  const [EnglishSkillScore, setEnglishSkillScore] = useState(null);
  const [EnglishSkillName, setEnglishSkillName] = useState(null);
  const [EnglishSkillLinks, setEnglishSkillLinks] = useState([]);
  const [DomainSkillScore, setDomainSkillScore] = useState(null);
  const [DomainSkillName, setDomainSkillName] = useState(null);
  const [DomainSkillLinks, setDomainSkillLinks] = useState([]);
  const [ComputerSkillScore, setComputerSkillScore] = useState(null);
  const [ComputerSkillName, setComputerSkillName] = useState(null);
  const [ComputerSkillLinks, setComputerSkillLinks] = useState([]);
  const [CodingSkillScore, setCodingSkillScore] = useState(null);
  const [CodingSkillName, setCodingSkillName] = useState(null);
  const [CodingSkillLinks, setCodingSkillLinks] = useState([]);
  const [WETSkillScore, setWETSkillScore] = useState(null);
  const [WETSkillName, setWETSkillName] = useState(null);
  const [WETSkillLinks, setWETSkillLinks] = useState([]);

  const [OpennessZScore, setOpennessZScore] = useState(null);
  const [ConscientiousnessZScore, setConscientiousnessZScore] = useState(null);
  const [ExtraversionZScore, setExtraversionZScore] = useState(null);
  const [AgreeablenessZScore, setAgreeablenessZScore] = useState(null);
  const [EmotionalZScore, setEmotionalZScore] = useState(null);

  useEffect(() => {
    setId(rowData.user_id);
    setfirstName(rowData.firstname);
    setlastName(rowData.lastname);
    // setId(personData.map(items => items.id));
    // setfirstName(personData.map(items => items.firstName));
    // setlastName(personData.map(items => items.lastName));
    setuniversityName(personData.map(items => items.universityName));
    setregion(personData.map(items => items.region));
    setcourse(personData.map(items => items.course));
    setapplicationValidity(personData.map(items => items.applicationValidity));
    setassessedOn(fDateTime(rowData.createdon));
    // setassessedOn(personData.map(items => items.assessedOn));
    setbatch(personData.map(items => items.batch));
    setoverallScore (personData.map(items=>items.overallScore));
    setscoreMinRange (personData.map(items=>items.scoreMinRange));
    setscoreMaxRange (personData.map(items=>items.scoreMaxRange));
    setinstitutePercentile (personData.map(items=>items.institutePercentile));
    setnationalPercentile (personData.map(items=>items.nationalPercentile));
    setregionalPercentile (personData.map(items=>items.regionalPercentile));
    setexamCondectedOn(personData.map(items=>items.examCondectedOn));
    // setexamCondectedOn(rowData.createdon);
    
    setskillDataArray (personData.map(items=>items.skillAnalisisData));

    if (personData.length > 0) {
      const firstItem = personData[0];

      const analyticalData = firstItem.skillAnalisisData.find(item => item.skills === "Analytical");
      const scoreToSend = analyticalData ? analyticalData.persentageScore : 0;
      setanalyticalSkillScore(scoreToSend);
      setanalyticalSkillName(analyticalData.skills);
      setanalyticalSkillLinks(analyticalData.helpLinks);

      const QuantitativeData = firstItem.skillAnalisisData.find(item => item.skills === "Quantitative");
      const QuantitativescoreToSend = QuantitativeData ? QuantitativeData.persentageScore : 0;
      setQuantitativeSkillScore(QuantitativescoreToSend);
      setQuantitativeSkillName(QuantitativeData.skills);
      setQuantitativeSkillLinks(QuantitativeData.helpLinks);

      const EnglishData = firstItem.skillAnalisisData.find(item => item.skills === "English");
      const EnglishscoreToSend = EnglishData ? EnglishData.persentageScore : 0;
      setEnglishSkillScore(EnglishscoreToSend);
      setEnglishSkillName(EnglishData.skills);
      setEnglishSkillLinks(EnglishData.helpLinks);

      const DomainData = firstItem.skillAnalisisData.find(item => item.skills === "Domain");
      const DomainscoreToSend = DomainData ? DomainData.persentageScore : 0;
      setDomainSkillScore(DomainscoreToSend);
      setDomainSkillName(DomainData.skills);
      setDomainSkillLinks(DomainData.helpLinks);

      const ComputerData = firstItem.skillAnalisisData.find(item => item.skills === "Computer Fundamentals");
      const ComputerscoreToSend = ComputerData ? ComputerData.persentageScore : 0;
      setComputerSkillScore(ComputerscoreToSend);
      setComputerSkillName(ComputerData.skills);
      setComputerSkillLinks(ComputerData.helpLinks);

      const CodingData = firstItem.skillAnalisisData.find(item => item.skills === "Coding");
      const CodingscoreToSend = CodingData ? CodingData.persentageScore : 0;
      setCodingSkillScore(CodingscoreToSend);
      setCodingSkillName(CodingData.skills);
      setCodingSkillLinks(CodingData.helpLinks);

      const WETData = firstItem.skillAnalisisData.find(item => item.skills === "WET");
      const WETscoreToSend = WETData ? WETData.persentageScore : 0;
      setWETSkillScore(WETscoreToSend);
      setWETSkillName(WETData.skills);
      setWETSkillLinks(WETData.helpLinks);

      const OpennessData = firstItem.personalityData.find(item => item.personality === "Openness");
      const OpennessZScoreToSend = OpennessData ? OpennessData.zscore : -2;
      setOpennessZScore(OpennessZScoreToSend);

      const ConscientiousnessData = firstItem.personalityData.find(item => item.personality === "Conscientiousness");
      const ConscientiousnessZScoreToSend = ConscientiousnessData ? ConscientiousnessData.zscore : -2;
      setConscientiousnessZScore(ConscientiousnessZScoreToSend);

      const ExtraversionData = firstItem.personalityData.find(item => item.personality === "Extraversion");
      const ExtraversionZScoreToSend = ExtraversionData ? ExtraversionData.zscore : -2;
      setExtraversionZScore(ExtraversionZScoreToSend);

      const AgreeablenessData = firstItem.personalityData.find(item => item.personality === "Agreeableness");
      const AgreeablenessZScoreToSend = AgreeablenessData ? AgreeablenessData.zscore : -2;
      setAgreeablenessZScore(AgreeablenessZScoreToSend);

      const EmotionalData = firstItem.personalityData.find(item => item.personality === "Emotional Stability");
      const EmotionalZScoreToSend = EmotionalData ? EmotionalData.zscore : -2;
      setEmotionalZScore(EmotionalZScoreToSend);

    }
  }, [personData])
  // console.log(OpennessZScore);

  return (
    <Box>
      <PdfPage2 id={id} overallScore={overallScore} scoreMinRange={scoreMinRange} scoreMaxRange={scoreMaxRange}/>
      <PdfPage3 id={id} />
      <PdfPage7 id={id} examCondectedOn={examCondectedOn} />
      <PdfPage8 id={id}/>
      {/* <Page1 firstName={firstName} lastName={lastName} assessedOn={assessedOn} batch={batch} universityName={universityName} region={region} course={course} applicationValidity={applicationValidity} /> */}

      {/* <Page2 id={id} firstName={firstName} lastName={lastName} overallScore={overallScore} scoreMinRange={scoreMinRange} scoreMaxRange={scoreMaxRange}
        OpennessZScore={OpennessZScore}
        ConscientiousnessZScore={ConscientiousnessZScore}
        ExtraversionZScore={ExtraversionZScore}
        AgreeablenessZScore={AgreeablenessZScore}
        EmotionalZScore={EmotionalZScore}
        analyticalSkillScore={analyticalSkillScore}
        QuantitativeSkillScore={QuantitativeSkillScore}
        EnglishSkillScore={EnglishSkillScore} 
        DomainSkillScore={DomainSkillScore}
        ComputerSkillScore={ComputerSkillScore}
        CodingSkillScore={CodingSkillScore}
        WETSkillScore={WETSkillScore}
        institutePercentile={institutePercentile} nationalPercentile={nationalPercentile} regionalPercentile={regionalPercentile}
        />
      <Page3 id={id} firstName={firstName} lastName={lastName} />
      <Page4 id={id} firstName={firstName} lastName={lastName}
        skillDataArray={skillDataArray}
        analyticalSkillScore={analyticalSkillScore}
        QuantitativeSkillScore={QuantitativeSkillScore}
        EnglishSkillScore={EnglishSkillScore} 
        DomainSkillScore={DomainSkillScore}
        ComputerSkillScore={ComputerSkillScore}
        CodingSkillScore={CodingSkillScore}
        WETSkillScore={WETSkillScore} />
      <Page5 id={id} firstName={firstName} lastName={lastName}
        analyticalSkillScore={analyticalSkillScore} analyticalSkillName={analyticalSkillName} analyticalSkillLinks={analyticalSkillLinks}
        QuantitativeSkillScore={QuantitativeSkillScore} QuantitativeSkillName={QuantitativeSkillName} QuantitativeSkillLinks={QuantitativeSkillLinks}
        EnglishSkillScore={EnglishSkillScore} EnglishSkillName={EnglishSkillName} EnglishSkillLinks={EnglishSkillLinks}
        DomainSkillScore={DomainSkillScore} DomainSkillName={DomainSkillName} DomainSkillLinks={DomainSkillLinks}
        ComputerSkillScore={ComputerSkillScore} ComputerSkillName={ComputerSkillName} ComputerSkillLinks={ComputerSkillLinks}
        CodingSkillScore={CodingSkillScore} CodingSkillName={CodingSkillName} CodingSkillLinks={CodingSkillLinks}
        WETSkillScore={WETSkillScore} WETSkillName={WETSkillName} WETSkillLinks={WETSkillLinks}
      />
      <Page9 id={id} firstName={firstName} lastName={lastName}
        OpennessZScore={OpennessZScore}
        ConscientiousnessZScore={ConscientiousnessZScore}
        ExtraversionZScore={ExtraversionZScore}
        AgreeablenessZScore={AgreeablenessZScore}
        EmotionalZScore={EmotionalZScore}
      />
      <Page10 id={id} firstName={firstName} lastName={lastName}
        OpennessZScore={OpennessZScore}
        ConscientiousnessZScore={ConscientiousnessZScore}
        ExtraversionZScore={ExtraversionZScore}
        AgreeablenessZScore={AgreeablenessZScore}
        EmotionalZScore={EmotionalZScore}
      />
      <Page12 id={id} firstName={firstName} lastName={lastName} examCondectedOn={examCondectedOn}/>
      <Page13 /> */}
    </Box>
  )
}
export default Pages;