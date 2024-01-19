import * as React from 'react';
import { Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useAlertContext } from './AlertProvider';

const UserDataManagement = ({ userData, fetchData }) => {
  const [isLoading, setisLoading] = React.useState(false);
  const { showSnackbar } = useAlertContext();

  const onHandleUnBlockUser = async (user) => {
    // console.log(user);
    setisLoading(true);
    try {
      const response = await axios.post("https://scimics-api.onrender.com/scimics/updateuserblockedstatus", {
        is_blocked: false,
        user_id: user.user_id
      });
      // console.log(response);
      showSnackbar("User Unblock Successful");
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
      showSnackbar("User Unblock Failed");
    } finally {
      setisLoading(false);
    }
  }

  const onHandleBlockUser = async (user) => {
    // console.log(user);
    setisLoading(true);
    try {
      const response = await axios.post("https://scimics-api.onrender.com/scimics/updateuserblockedstatus", {
        is_blocked: true,
        user_id: user.user_id
      });
      // console.log(response);
      showSnackbar("User Block Successful");
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
      showSnackbar("User Block Failed");
    } finally {
      setisLoading(false);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {userData.map((list, index) => (
            <CollegesChild key={index} list={list} isLoading={isLoading} onHandleUnBlockUser={onHandleUnBlockUser} onHandleBlockUser={onHandleBlockUser} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default UserDataManagement;

function CollegesChild({ list, isLoading, onHandleUnBlockUser, onHandleBlockUser }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {list.college_name}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {
                  list.d_data.map((dep, index) => (
                    <DepartmentsChild key={index} dep={dep} isLoading={isLoading} onHandleUnBlockUser={onHandleUnBlockUser} onHandleBlockUser={onHandleBlockUser}/>
                  ))
                }
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
}

function DepartmentsChild({ dep, isLoading, onHandleUnBlockUser, onHandleBlockUser }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {dep.department_name}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {
                  dep.c_data.map((course, index) => (
                    <CoursesChild key={index} course={course} isLoading={isLoading} onHandleUnBlockUser={onHandleUnBlockUser} onHandleBlockUser={onHandleBlockUser}/>
                  ))
                }
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
}

function CoursesChild({ course, isLoading, onHandleUnBlockUser, onHandleBlockUser }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {course.course_name}
        </TableCell>
      </TableRow>

      {
        course.u_data.length > 0 &&
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{ fontWeight: "bold" }}>
                    <TableCell align="center" sx={{ fontSize: "16px" }}>User_ID</TableCell>
                    <TableCell align="center" sx={{ fontSize: "16px" }}>First_Name</TableCell>
                    <TableCell align="center" sx={{ fontSize: "16px" }}>Last_Name</TableCell>
                    <TableCell align="center" sx={{ fontSize: "16px" }}>Email</TableCell>
                    <TableCell align="center" sx={{ fontSize: "16px" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    course.u_data.map((users, index) => (
                      <UsersChild key={index} users={users} isLoading={isLoading} onHandleUnBlockUser={onHandleUnBlockUser} onHandleBlockUser={onHandleBlockUser}/>
                    ))
                  }
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      }
    </React.Fragment>
  );
}

function UsersChild({ users, isLoading, onHandleUnBlockUser, onHandleBlockUser }) {
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row" align="center">
          {users.user_id}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {users.first_name}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {users.last_name}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {users.email}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {
            users.is_blocked ?
              <LoadingButton
                variant="outlined"
                loading={isLoading}
                onClick={() => onHandleUnBlockUser(users)}
                sx={{ minHeight: "20px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 4, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7" }}
              >
                Unblock User
              </LoadingButton> : <LoadingButton
                variant="outlined"
                loading={isLoading}
                onClick={() => onHandleBlockUser(users)}
                sx={{ minHeight: "20px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 6, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7" }}
              >
                Block User
              </LoadingButton>
          }
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}