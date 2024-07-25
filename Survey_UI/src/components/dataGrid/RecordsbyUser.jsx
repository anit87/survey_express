import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import NoData from "../NoData";
import Loader from '../loader';
import TableHeader, { StyledTableCell } from './TableHeader';
import { modes, useModeData } from '../../utils/ModeContext';
import { useLanguageData } from '../../utils/LanguageContext';
import { maritalOptions, generateEstablishmentOptions } from '../../utils/constants';

const apiUrl = import.meta.env.VITE_API_URL;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }
}));

const RecordsbyUser = () => {
  const { id } = useParams();
  const { mode } = useModeData();
  const navigate = useNavigate();
  const { translate } = useLanguageData();
  const establishmentOptions = generateEstablishmentOptions(translate);

  const [formsDetail, setFormsDetail] = useState({ data: [], user: { displayName: "" } });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserRecords();
  }, [id, mode]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("surveyApp"),
  };

  const fetchUserRecords = async () => {
    setIsLoading(true);
    const url = mode === modes.residential ? '/users/records' : '/commercial/filledbyuser';
    try {
      const response = await axios.post(apiUrl + url, { id }, { headers });
      setFormsDetail(response.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const getEstablishmentType = (value) => {
    return establishmentOptions.find(item => item.value == value).label
  };

  const getTableCellContent = (row, residentialValue, commercialValue) => {
    if (mode !== modes.residential && commercialValue === 'establishmentType' && row.establishmentType) {
      return getEstablishmentType(row['establishmentType'])
    }
    return mode === modes.residential ? row[residentialValue] : row[commercialValue];
  };

  const getMaritalStatus = (row) => {
    if (mode === modes.residential) {
      return maritalOptions.find(item => row?.maritalStatus == item.value)?.label;
    }
    return row.contactPerson;
  };

  const tableCells = [
    { label: 'S.No' },
    { label: 'Respondent Name' },
    { label: 'Mobile No' },
    { label: 'Pincode' },
    { label: 'Marital Status' },
    { label: '' },
  ];

  const commercialTableCells = [
    { label: 'S.No' },
    { label: 'Establishment Name' },
    { label: 'Establishment Type' },
    { label: 'Business Nature' },
    { label: 'Contact person' }
  ];

  return (
    <>
      <h6 style={{ fontSize: '20px', fontWeight: '600' }}>{`Surveys By ${formsDetail.user.displayName}`}</h6>
      <TableContainer component={Paper}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : formsDetail.data.length < 1 ? (
          <NoData msg="No Surveys Found" />
        ) : (
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHeader tableCells={mode === modes.residential ? tableCells : commercialTableCells} />
            <TableBody>
              {formsDetail.data.map((row, i) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell scope="row">
                    {getTableCellContent(row, 'respondentName', 'establishmentName')}
                  </StyledTableCell>
                  <StyledTableCell>{getTableCellContent(row, 'mobileNo', 'establishmentType')}</StyledTableCell>
                  <StyledTableCell>{getTableCellContent(row, 'pincode', 'natureOfBusiness')}</StyledTableCell>
                  <StyledTableCell>{getMaritalStatus(row)}</StyledTableCell>
                  {mode === modes.residential &&
                    < StyledTableCell >
                      <Button onClick={() => navigate(`/formdetail/${row._id}`)}>View</Button>
                    </StyledTableCell>
                  }
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Button sx={{ m: 4 }} variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
      </TableContainer >
    </>
  );
};

export default RecordsbyUser;
