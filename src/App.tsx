import React, { useMemo, useState } from 'react';
import './App.css';
import { ApplicantTable } from './components/Table';
import { Header } from './components/Header';
import { Context } from "./context";
import { IApplicantContext } from './interfaces';

const App: React.FC = () => {
  const [applicants, setApplicants] = useState<IApplicantContext['applicants']>([]);
  const [primaryApplicant, setPrimaryApplicant] = useState<IApplicantContext['primaryApplicant']>(null);
  const value = useMemo(()=> ({applicants, setApplicants, primaryApplicant, setPrimaryApplicant}), [applicants, primaryApplicant])

  return (
    <div>
      <Context.Provider value={value}>
        <Header />
        <div className="container" style={{marginTop: "50px"}}>
          <ApplicantTable />
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;
