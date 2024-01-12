import { Box, Container, Tooltip, Typography } from "@mui/material";
import Page from "../../components/Page";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BulkUpload from "../../components/BulkUpload";

const AdminUserConfigurationPage = () => {
    return (
        <Page title="User Configuration">
            <Container maxWidth="xl" sx={{ py: 1 }} >
                <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
                    User Configuraion and Management
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
                    <Typography variant="subtitle2">User Sign-up Bulk Upload</Typography>

                    <Box p={1} />

                    <BulkUpload />

                </Box>
            </Container>
        </Page>
    )
}
export default AdminUserConfigurationPage;