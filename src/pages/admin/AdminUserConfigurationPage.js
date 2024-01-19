import { Box, Container, Tooltip, Typography } from "@mui/material";
import Page from "../../components/Page";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BulkUpload from "../../components/BulkUpload";
import UserDataManagement from "../../components/UserDataManagement";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminUserConfigurationPage = () => {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://scimics-api.onrender.com/scimics/getusersbycollege");
      // console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

    return (
        <Page title="User Configuration">
            <Container maxWidth="xl" sx={{ py: 1 }} >
                <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
                    User Management
                    <Tooltip title={"Sign-up users in bulk and Manage users"} placement="right" arrow>
                        <InfoOutlinedIcon sx={{ color: "gray", cursor: "pointer", fontSize: 16, marginLeft: 1, }} />
                    </Tooltip>
                </Typography>

                <Box p={1} />

                <Box
                    px={4}
                    py={1}
                    sx={{
                        bgcolor: "background.primary",
                        borderRadius: "12px",
                        width: { xs: "100%", md: "100%" },
                        minHeight: "140px"
                    }}
                >
                    <Typography variant="subtitle2">Excel sheet Bulk Upload 
                    <Tooltip title={"Sheet Header's format: FirstName, LastName, Phone, Email, College, Department, Course"} placement="right" arrow>
                        <InfoOutlinedIcon sx={{ color: "gray", cursor: "pointer", fontSize: 13, marginLeft: 1, }} />
                    </Tooltip></Typography>

                    <Box p={1} />

                    <BulkUpload fetchData={fetchData}/>

                </Box>
                <Box p={1}/>

                <Box
                    px={4}
                    py={1}
                    sx={{
                        bgcolor: "background.primary",
                        borderRadius: "12px",
                        width: { xs: "100%", md: "100%" },
                        minHeight: "140px"
                    }}
                >
                    <Typography variant="subtitle2">User Data</Typography>

                    <Box p={1} />

                    <UserDataManagement userData={userData} fetchData={fetchData}/>
                </Box>
            </Container>
        </Page>
    )
}
export default AdminUserConfigurationPage;