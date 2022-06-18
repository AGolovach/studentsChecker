import React, {useEffect, useState} from 'react';
import {read, utils} from "xlsx";
import {StudentsDisplay} from "./components/StudentsDisplay";


function App() {

  return (
    <div>
     <StudentsDisplay />
    </div>
  );
}

export default App;
