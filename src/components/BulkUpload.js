import { LoadingButton } from '@mui/lab';
import { Box, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { useAlertContext } from './AlertProvider';
import { RHFTextField } from './hook-form';
import { connect } from "react-redux";
import { getAllColleges, getAllCoursesById } from "../actions/common";

const BulkUpload = ({ common, getAllColleges, getAllCoursesById }) => {
    const [excelData, setExcelData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const { showSnackbar } = useAlertContext();
    const fileInputRef = useRef(null);
    const [collegeId, setCollegeId] = useState(0);
    const [courseId, setCourseId] = useState(0);

    useEffect(() => {
        handleColleges();
    }, []);

    const handleColleges = async () => {
        var result = await getAllColleges();
        if (result != true) {
            showSnackbar(result, "error");
        }
    };

    const handleCourses = async (id) => {
        var result = await getAllCoursesById(id);
        if (result != true) {
            showSnackbar(result, "error");
        }
    };

    useEffect(() => {
        if (common.colleges.length > 0) {
            setCollegeId(common.colleges[0].college_pk);
            handleCourses(common.colleges[0].college_pk);
        }
    }, [common.colleges]);

    useEffect(() => {
        if (common.courses.length > 0) {
            setCourseId(common.courses[0].course_pk);
        }
    }, [common.courses]);

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
        // console.log(excelData, collegeId, courseId);
        setisLoading("true");
        if (excelData.length > 0) {
            try {
                const response = await axios.post("https://scimics-api.onrender.com/scimics/bulkuserupload", {
                    excelData,
                    collegeId,
                    courseId
                });
                // console.log(response);
                showSnackbar("Bulk Upload successfull");
            } catch (error) {
                console.error("Error fetching data:", error);
                showSnackbar("Bulk Upload failed");
            } finally {
                setisLoading(false);
                fileInputRef.current.value = "";
                setExcelData("");
                setCollegeId(0);
                setCourseId(0);
            }
        } else {
            setisLoading(false);
            showSnackbar("Add file and submit");
        }
    };

    return (
        <Box sx={{ display: "flex", alignItems: "start", width: { xs: "100%", md: "100%" }, flexWrap: "wrap" }}>
            <Box sx={{ width: { xs: "27%", md: "27%" }, minWidth: "120px", display: "flex", justifyContent: "center" }}>
                <TextField sx={{ marginTop: 1, width: "90%", marginRight: 1 }} fullWidth
                    name="college_id"
                    value={collegeId}
                    label="College"
                    onChange={(e) => {
                        setCollegeId(e.target.value);
                        handleCourses(e.target.value);
                    }}
                    select >
                    {common.colleges.map((item, index) => (
                        <MenuItem key={index} value={item.college_pk} >
                            {item.college_name}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box sx={{ width: { xs: "27%", md: "27%" }, minWidth: "120px", display: "flex", justifyContent: "center" }}>
                <TextField sx={{ marginTop: 1, width: "90%", marginRight: 1 }} fullWidth
                    name="course_id"
                    label="Course"
                    onChange={(e) => setCourseId(e.target.value)}
                    value={courseId}
                    select >
                    {common.courses.map((item, index) => (
                        <MenuItem key={index} value={item.course_pk} >
                            {item.course_name}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box sx={{ width: { xs: "27%", md: "27%" }, minWidth: "120px", display: "flex", justifyContent: "center" }}>
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

const mapStateToProps = (state) => {
    return {
        common: state.common,
    };
};

export default connect(mapStateToProps, { getAllColleges, getAllCoursesById })(BulkUpload);
