import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { useAlertContext } from './AlertProvider';

const BulkUpload = ({fetchData}) => {
    const [excelData, setExcelData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const { showSnackbar } = useAlertContext();
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            const headers = data[0];
            const formattedData = data.slice(1).map((row) => {
                const userObject = {};
                headers.forEach((header, index) => {
                    const trimmedValue = String(row[index]).trim();
                    if (trimmedValue !== '') { // Check if the cell is not empty
                        userObject[header] = trimmedValue;
                    }
                    // userObject[header] = trimmedValue;
                });
                return userObject;
            });
            setExcelData(formattedData);
        };
        reader.readAsBinaryString(file);
    };

    const onHandleSubmitXL = async () => {
        setisLoading(true);
        if (excelData.length > 0) {
            try {
                    const response = await axios.post("https://scimics-api.onrender.com/scimics/bulkuserupload", {
                    excelData,
                });
                // console.log(response);
                showSnackbar(`Bulk Upload successful, ${response.data.data}`);
            } catch (error) {
                console.error("Error fetching data:", error);
                showSnackbar("Bulk Upload failed");
            } finally {
                setisLoading(false);
                fileInputRef.current.value = "";
                fetchData();
                setExcelData([]);
            }
        } else {
            setisLoading(false);
            showSnackbar("Add file and submit");
        }
    };

    return (
        <Box sx={{ display: "flex", alignItems: "start", width: { xs: "100%", md: "100%" }, flexWrap: "wrap" }}>
            <Box sx={{ width: { xs: "30%", md: "30%" }, minWidth: "120px", display: "flex", justifyContent: "center" }}>
                <TextField type="file" sx={{ marginTop: 1, width: "90%", marginRight: 1 }} fullWidth onChange={handleFileChange} inputRef={fileInputRef} />
            </Box>

            <Box sx={{ width: { xs: "19%", md: "19%" }, minWidth: "120px", display: "flex", justifyContent: "center" }}>
                <LoadingButton
                    variant="outlined"
                    loading={isLoading}
                    onClick={() => onHandleSubmitXL()}
                    sx={{ marginTop: 1, minHeight: "56px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 6, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7" }}
                >
                    Submit
                </LoadingButton>
            </Box>
        </Box>
    );
};

export default BulkUpload;
