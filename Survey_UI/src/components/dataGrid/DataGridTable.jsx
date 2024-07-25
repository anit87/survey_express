import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Stack, FormControl, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';

import axios from 'axios';
import dayjs from 'dayjs';
import { capitalizeFirstLetter, verifyUser } from '../../utils/functions/verifyUser';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import CustomTablePagination from '../TablePaginationActions';
import DynamicDatePicker from '../inputs/DynamicDatePicker';
import Loader from '../loader';
import NoData from '../NoData';
import TableHeader from './TableHeader';
import { SelectInput } from '../inputs/SelectInput';
import { generateIncomeOptions, maritalOptions, generateTrueFalseOptions, generateEducationalOptions, generatereligionOptions, occupationOptios, generateCasteOptions, generateEstablishmentOptions } from "../../utils/constants";
import { useLanguageData } from '../../utils/LanguageContext';
import { modes, useModeData } from '../../utils/ModeContext';
import { useGetSurveyFormsMutation } from '../../features/auth/userDasbord';

const tableCells = [
    { label: 'S.No' },
    { label: 'Respondent Name' },
    { label: 'Mobile No' },
    { label: 'Pincode' },
    { label: 'Marital Status' },
    { label: 'Created Date' },
    { label: '' }
]

const commercialCells = [
    { label: 'S.No' },
    { label: 'Establishment Name' },
    { label: 'Establishment Type' },
    { label: 'Business Nature' },
    { label: 'Contact person' },
    { label: 'Contact Number' },
    { label: 'Created Date' },
    { label: '' }
]

const apiUrl = import.meta.env.VITE_API_URL;

const isAgentActive = (inputDate) => {
    const inputDateObj = dayjs(inputDate);
    let fiveDaysAgo = new Date();

    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    fiveDaysAgo = dayjs(fiveDaysAgo);

    const isAfter = inputDateObj.isAfter(fiveDaysAgo);
    return isAfter
}
const formatDate = (dateString) => {
    const parsedDate = moment(dateString);
    const formattedDate = parsedDate.format("DD-MM-YYYY HH:mm");
    return formattedDate
}

export default function SurveyForms() {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const { mode } = useModeData();
    const { translate } = useLanguageData();


    const [userDetail, setUserDetail] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [filterData, setFilterData] = useState({
        birthdayDate: '',
        maritalStatus: '',
        monthlyHouseholdIncome: '',
        isOwnProperty: '',
        occupationStatus: '',
        religion: '',
        caste: '',
        cweEducation: '',
        startDate: moment().subtract(1, 'months').format('YYYY-MM-DD'), // Setting defaultValue to today's date with previous month
        endDate: new Date().toISOString().slice(0, 10)
    });

    const [activeAgents, setActiveAgents] = useState({
        status: false,
        result: { agents: [], fieldAgents: [] }
    });

    const [getSurveyForms, { isLoading: verifyLoading, data }] = useGetSurveyFormsMutation();

    const incomeOptions = generateIncomeOptions(translate);
    const trueFalseOptions = generateTrueFalseOptions(translate);
    const educationalOptions = generateEducationalOptions(translate);
    const casteOptions = generateCasteOptions(translate);
    const religionOptions = generatereligionOptions(translate);
    const establishmentOptions = generateEstablishmentOptions(translate);

    useEffect(() => {
        const user = verifyUser(token);
        setUserDetail(user);
        getActiveUsers(user);
    }, [])

    useEffect(() => {
        let endpoint = mode === modes.residential ? 'users/allrecords' : 'commercial'
        getData(endpoint);
    }, [filterData, mode])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("surveyApp"),
    };

    const getData = async (endpoint) => {
        try {
            await getSurveyForms({ ...filterData, endpoint });
        } catch (error) {
            console.log("Error in Dashboard ", error);
        }
    }
    const getActiveUsers = async (userInfo) => {
        try {
            if (userInfo.userRole !== 'admin' && userInfo.userRole !== '2') {
                return setActiveAgents({ status: false, result: { agents: [], fieldAgents: [] } });
            }

            let agents = [];
            const result = await axios.get(`${apiUrl}/users/getlastform`, { headers });

            if (userInfo.userRole === 'admin') {
                agents = await Promise.all(result?.data?.result?.agents?.map(obj => {
                    let userStatus = false;
                    const allFilledForms = [...obj?.surveys, ...obj?.lastCommercial];

                    if (allFilledForms.length < 1) {
                        return { ...obj, userStatus };
                    } else {
                        allFilledForms.sort((a, b) => new Date(b.date) - new Date(a.date));
                        userStatus = isAgentActive(allFilledForms[0].date);
                        return { ...obj, userStatus };
                    }
                }))
            }
            const fieldAgents = await Promise.all(result?.data?.result?.fieldAgents?.map(obj => {
                let userStatus = false;
                const allFilledForms = [...obj?.surveys, ...obj?.lastCommercial];
                if (allFilledForms.length < 1) {
                    return { ...obj, userStatus };
                } else {
                    allFilledForms.sort((a, b) => new Date(b.date) - new Date(a.date));
                    userStatus = isAgentActive(allFilledForms[0].date);
                    return { ...obj, userStatus };
                }
            }))

            setActiveAgents({ status: true, result: { agents, fieldAgents } });
        } catch (error) {
            console.log(error)
        }
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (data?.length)) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const changeHandler = (e) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value
        });
    }

    const baseHeaders = mode === modes.residential ? tableCells : commercialCells;
    const tableHeaders = userDetail.userRole === 'admin'
        ? [...baseHeaders.slice(0, 5), { label: 'Supervisor' }, ...baseHeaders.slice(5)]
        : baseHeaders
        ;

    return (
        <TableContainer component={Paper}>

            {userDetail.userRole === "admin" &&
                <div className='d-flex' >
                    <h6 className='m-4' style={{ fontSize: "20px", fontWeight: "bold" }} >
                        {`Active Supervisor: ${activeAgents.result.agents.filter(obj => obj.userStatus).length}`}
                    </h6>
                    <h6 className='m-4' style={{ fontSize: "20px", fontWeight: "bold" }} >
                        {`Active Field Agents: ${activeAgents.result.fieldAgents.filter(obj => obj.userStatus).length}`}
                    </h6>
                </div>
            }
            {userDetail.userRole === "2" &&
                <>
                    <h6 className='m-4' style={{ fontSize: "20px", fontWeight: "bold" }} >
                        {`Active Field Agents: ${activeAgents.result.fieldAgents.filter(obj => obj.userStatus).length}`}
                    </h6>
                </>
            }

            {mode === modes.residential &&
                <>
                    <h6 className='m-4' style={{ fontSize: "20px", fontWeight: "bold" }} >Smart Filters</h6>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
                    >

                        <SelectInput
                            label="Filter By Marital Status"
                            name="maritalStatus"
                            options={maritalOptions}
                            value={filterData.maritalStatus}
                            changeHandler={(e) => changeHandler(e)}
                        />

                        <SelectInput
                            label="Filter By Income"
                            name="monthlyHouseholdIncome"
                            options={incomeOptions}
                            value={filterData.monthlyHouseholdIncome}
                            changeHandler={(e) => changeHandler(e)}
                        />

                        <SelectInput
                            label="Own Property"
                            name="isOwnProperty"
                            options={trueFalseOptions}
                            value={filterData.isOwnProperty}
                            changeHandler={(e) => changeHandler(e)}
                        />

                        <DynamicDatePicker
                            label="Filled From"
                            name="startDate"
                            defaultValue={filterData.startDate}
                            minDate="2023-08-01"
                            filterData={filterData}
                            setFilterData={setFilterData}
                        />

                    </Stack>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
                    >
                        <FormControl fullWidth >
                            <SelectInput
                                label="Religion"
                                name="religion"
                                options={religionOptions}
                                value={filterData.religion}
                                changeHandler={(e) => changeHandler(e)}
                            />
                            <SelectInput
                                label="Caste"
                                name="caste"
                                options={casteOptions}
                                value={filterData.caste}
                                changeHandler={(e) => changeHandler(e)}
                            />
                        </FormControl>

                        <SelectInput
                            label="Occupation Status"
                            name="occupationStatus"
                            options={occupationOptios}
                            value={filterData.occupationStatus}
                            changeHandler={(e) => changeHandler(e)}
                        />

                        <SelectInput
                            label="Education Of Chief Wage Earner"
                            name="cweEducation"
                            options={educationalOptions}
                            value={filterData.cweEducation}
                            changeHandler={(e) => changeHandler(e)}
                        />

                        <DynamicDatePicker
                            label="Upto"
                            name="endDate"
                            minDate={filterData.startDate}
                            filterData={filterData}
                            setFilterData={setFilterData}
                        />
                    </Stack>
                </>
            }

            {
                <>
                    {verifyLoading ? <Loader /> :
                        (!data || data.length < 1) ? <NoData msg="No Surveys Found" /> :
                            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                <TableHeader tableCells={tableHeaders} />
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : data
                                    ).map((row, i) => (
                                        <TableRow key={row._id}>
                                            <TableCell component="th" scope="row">
                                                {parseInt(i) + 1}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {mode === modes.residential ? row.respondentName : (row.establishmentName || 'N/A')}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }}>
                                                {
                                                    mode === modes.residential ?
                                                        row.mobileNo :
                                                        establishmentOptions.find(item => item.value == row?.establishmentType)?.label

                                                }
                                            </TableCell>
                                            <TableCell style={{ width: 160 }}>
                                                {mode === modes.residential ? row.pincode : (row.natureOfBusiness || 'N/A')}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }}>
                                                {mode === modes.residential ? (row.maritalStatus === 1 ? "Single" : "Married") : (row.contactPerson || 'N/A')}
                                            </TableCell>
                                            {(userDetail.userRole != '3' && userDetail.userRole != '2') &&
                                                <TableCell style={{ width: 160 }}>
                                                    {capitalizeFirstLetter(row?.filledBy?.displayName) || "Admin"}
                                                </TableCell>
                                            }
                                            {mode === modes.commercial &&
                                                <TableCell style={{ width: 160 }}>
                                                    {row.contactNumber || 'N/A'}
                                                </TableCell>
                                            }
                                            <TableCell>
                                                {formatDate(row.date)}
                                            </TableCell>
                                            <TableCell>
                                                {mode === modes.residential &&
                                                    <IconButton color="primary" aria-label="add to shopping cart"
                                                        onClick={() => navigate(`/formdetail/${row._id}`)}
                                                    >
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                }

                                                {userDetail.userRole === "admin" &&
                                                    <IconButton color="primary" aria-label="add to shopping cart"
                                                        onClick={() => navigate(`/${(mode === modes.residential) ? 'form' : 'commercial'}/${row._id}`)}
                                                    >
                                                        <EditTwoToneIcon />
                                                    </IconButton>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {
                                        emptyRows > 0 &&
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    }
                                </TableBody>
                                {
                                    (data.length > 10) &&
                                    <CustomTablePagination
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                }
                            </Table>
                    }
                </>}
        </TableContainer>
    );
}