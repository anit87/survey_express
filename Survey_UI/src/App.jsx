import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ProtectedRoute from "./components/ProtectedRoute";
import LoginSignUp from './pages/LoginSignUp';
import SignIn from './components/forms/LoginForm';
import ResetPassword from './components/forms/ResetPassword';
import Layout from './components/admin/ClippedDrawer';
import CreateUser from './components/forms/CreateUser';
import SurveyMultiStepForm from './components/forms/surveyForm/SurveyMultiSteps';
import CollapsibleTable from './components/dataGrid/allUsers';
import RecordsbyUser from './components/dataGrid/RecordsbyUser';
import DataGridTable from './components/dataGrid/DataGridTable';
import { LanguageProvider } from './utils/LanguageContext';
import { ModeProvider } from './utils/ModeContext';
import CommercialForm from './components/forms/surveyForm/CommercialForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <LanguageProvider>
          <ModeProvider>
            <Routes>
              <Route path='/' element={<ProtectedRoute><LoginSignUp /></ProtectedRoute>}>
                <Route index element={<SignIn />} />
                <Route path='/' element={<SignIn />} />
                <Route path='/reset' element={<ResetPassword />} />
              </Route>
              <Route path='/form' element={<ProtectedRoute><SurveyMultiStepForm /></ProtectedRoute>} />
              <Route path='/form/:formId' element={<ProtectedRoute><SurveyMultiStepForm /></ProtectedRoute>} />
              <Route path='/formdetail/:id' element={<ProtectedRoute><SurveyMultiStepForm /></ProtectedRoute>} />

              <Route path='/commercial' element={<ProtectedRoute><Layout><CommercialForm /></Layout></ProtectedRoute>} />
              <Route path='/commercial/:formId' element={<ProtectedRoute><Layout><CommercialForm /></Layout></ProtectedRoute>} />

              <Route path='/allusers' element={<ProtectedRoute><Layout><CollapsibleTable /></Layout></ProtectedRoute>} />
              <Route path='/allRecords/:id' element={<ProtectedRoute><Layout><RecordsbyUser /></Layout></ProtectedRoute>} />
              <Route path='/createuser' element={<ProtectedRoute><Layout><CreateUser /></Layout></ProtectedRoute>} />
              <Route path='/createuser/:id' element={<ProtectedRoute><Layout><CreateUser /></Layout></ProtectedRoute>} />
              <Route path='/surveys' element={<ProtectedRoute><Layout><DataGridTable /></Layout></ProtectedRoute>} />
            </Routes>
          </ModeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </>
  )
}

export default App;