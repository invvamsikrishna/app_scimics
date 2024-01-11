import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { useAlertContext } from './AlertProvider';

const BulkUpload = () => {
    const [excelData, setExcelData] = useState([]);
    const [open, setOpen] = useState(false);
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
                    userObject[header] = trimmedValue;
                });
                return userObject;
            });
            setExcelData(formattedData);
        };
        reader.readAsBinaryString(file);
    };

    const onHandleSubmitXL = async () => {
        // console.log("submit clicked");
        // console.log(excelData);
        setisLoading("true");
        if (excelData.length > 0) {
            try {
                const response = await axios.post("https://scimics-api.onrender.com/scimics/bulkuserupload", {
                    excelData
                });
                // console.log(response);
                showSnackbar("Bulk Upload successfully");
            } catch (error) {
                console.error("Error fetching data:", error);
                showSnackbar("Bulk Upload failed");
            } finally {
                setisLoading(false);
                fileInputRef.current.value = "";
                setExcelData("");
                setOpen(false);
            }
        } else {
            setisLoading(false);
            showSnackbar("Add file and submit");
            setOpen(false)
        }

    }
    return (
        <>
            {
                !open && (
                    <Box sx={{ padding: 1, }}>
                        <Button fullWidth
                            variant="outlined"
                            onClick={() => setOpen(true)}
                            sx={{ minHeight: "56px", color: "#5a64c1", fontSize: 16, fontWeight: 500, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7" }}
                        >
                            Bulk Upload
                        </Button>
                    </Box>)
            }
            {
                open && (
                    <Box sx={{ padding: 1, display: "flex", flexDirection: "column", alignContent: "center", gap: 1 }}>
                        <TextField type="file" onChange={handleFileChange} inputRef={fileInputRef} />
                        <LoadingButton
                            variant="outlined"
                            loading={isLoading}
                            onClick={() => onHandleSubmitXL()}
                            sx={{ marginTop: 1, minHeight: "56px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 4, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7" }}
                        >
                            Submit
                        </LoadingButton>
                    </Box>
                )
            }
        </>
    );
};

export default BulkUpload;
