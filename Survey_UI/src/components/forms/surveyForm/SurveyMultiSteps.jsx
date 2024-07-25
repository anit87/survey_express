import React, { useState, useEffect, useContext } from 'react';
import { Stepper, Step, StepLabel, Button, Toolbar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import SurveyForm from './SurveyForm';
import SurveyFormNoneEdit from "./SurveyFormNoneEdit";
import Navbar from '../../Navbar';
import axios from "axios";
import { useLanguageData } from '../../../utils/LanguageContext';
// import Loader from '../loader';
import Loader from '../../loader';

const apiUrl = import.meta.env.VITE_API_URL + '/users/record';

const steps = ['Basic Details', 'About Family', 'Voter Details', 'General', 'Family Details'];

const SurveyMultiSteps = () => {

  const { translate } = useLanguageData();
  let { id, formId } = useParams();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [formsDetail, setFormsDetail] = useState({});
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const formKey = id || formId;
    if (formKey) {
      getFormDetail(formKey);
    }
  }, [id, formId]);

  const getFormDetail = async (formKey) => {
    try {
      setisLoading(true)
      const response = await axios.post(apiUrl, { id: formKey });
      setFormsDetail(response.data.data);
      setisLoading(false)
    } catch (error) {
      console.error('Error fetching form details:', error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <Navbar />
      <Toolbar />
      <h6 style={{ fontSize: "20px", fontWeight: "bold" }} >Sahaya Hasta</h6>

      <br />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div >
          {!id && !formId && <SurveyForm activeStep={activeStep} setActiveStep={setActiveStep} formId={null} />}

          {isLoading ? <Loader /> : <div>{formId && Object.keys(formsDetail).length > 0 &&
            <SurveyForm
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              formsDetail={formsDetail}
              formId={formId}
            />
          }
            {id &&
              <SurveyFormNoneEdit
                activeStep={activeStep}
                formsDetail={formsDetail}
              />
            }
          </div>}
          <div style={{ margin: activeStep !== steps.length - 1 ? "1.5rem" : "1rem" }}>
            {activeStep !== 0 &&
              <Button disabled={activeStep === 0} onClick={handleBack} variant="contained" color="primary" sx={{ mr: '1rem' }} >
                {translate('Back')}
              </Button>}
            {activeStep !== steps.length - 1 && id &&
              <Button disabled={activeStep === steps.length - 1} variant="contained" color="primary" sx={{ mr: '1rem' }} onClick={handleNext}>
                {translate('Next')}
              </Button>}
            <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
              {translate('Cancel')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyMultiSteps;

