//  import React, { useState } from "react";

//  const App = () => {
//    console.log(useState)
//     // useState when invoked will return an array containing two items, 0 index being the current state, 1 being the state to be set.
//    const defaultCurrency = "AUD";
//    const [currency, setCurrency] = useState(defaultCurrency);
//    console.log(setCurrency)
//    // setCurrency makes render runs again and thats it sends setCurrency into an infinite loop


//    return <div>The basic empty template</div>;
//  };

//  export default App;

import React, { useState, useEffect } from "react";
import currencies from "./supported-currencies.json";
import { Line } from 'react-chartjs-2';

 const App = () => {
   const defaultCurrency = "AUD";
   const [currency, setCurrency] = useState(defaultCurrency);
   const [bitcoinData, setBitcoinData] = useState({});

  // useEffect is run after the block of code below. It behaves similarly to componentDidMount() when the array in useEffect is empty. 
  // [] == componentDidMount()
  // [value] == componentDidUpdate(), when currency value updates, useEffect will run again 
  const bitcoinApi = "https://api.coindesk.com/v1/bpi/historical/close.json";
  // we cant make the whole function async, hence, has to use nested function
  useEffect(() => {
    console.log("inside of useEffect");
    async function getData() {
      try {
        const response = await fetch(`${bitcoinApi}?currency=${currency}`)
        const data = await response.json()
        setBitcoinData(data.bpi)
      } catch(err) {
        console.log(err)
      }
    }
    getData();
  }, [currency]);

   const onOptionChange = (event) => {
    //  console.log(event.target)
     setCurrency(event.target.value);
   };

   return (
     <div>
       <span>Select your currency:</span>
       <select value={currency} onChange={onOptionChange}>
         {currencies.map((obj, index) => (
           <option key={`${index}-${obj.country}`} value={obj.currency}>
             {obj.country}
           </option>
         ))}
       </select>

       <h1>Bitcoin Data for {currency}</h1>
       {Object.keys(bitcoinData).map((date) => (
         <div key={date}>
           Date: {date} Value: {bitcoinData[date]}
         </div>
       ))}
       
     </div>
   );
 };

 export default App;
