import React, { useState } from "react";
import SelectBox from "./components/SelectBox/SelectBox";

const App = () => {
  const [message, setMessage] = useState('');

  const [selectedValueOne, setSelectedValueOne] = useState("");
  const [selectedValueTwo, setSelectedValueTwo] = useState("");

  const handleSelectChangeOne = value => {
    setSelectedValueOne(value);
  };

  const handleSelectChangeTwo = value => {
    setSelectedValueTwo(value);
  };

  const question=`Erfinde bitte ${selectedValueOne} zufällige Namen für ${selectedValueTwo}`; 

  const optionsA = [
    { value: "", label: "" },
    { value: "2", label: "zwei" },
    { value: "5", label: "fünf" },
    { value: "10", label: "zehn" }
  ];
  
  const optionsB = [
    { value: "", label: "" },
    { value: "Spielwarengeschäft", label: "Spielwarengeschäft" },
    { value: "IT-Dienstleister", label: "IT-Dienstleister" },
    { value: "Gaststätte", label: "Gaststätte" }
  ];

  const getMessages = async () => {
    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          message: question,
      })
  }

  try {
    const response = await fetch('https://ai-brand-name.vercel.app:5000/completions', options);
    const data = await response.json();
    //console.log("DATA: ", data);
    setMessage(data.choices[0].message.content);
    console.log("messages::",data.choices[0].message.content);
  }
  catch(err){
      console.log("Error:", err);
  }
}


  return (
    <div>
      <h1>Hey AI sag mir:</h1>
      Anzahl: <SelectBox options={optionsA} onSelectChange={handleSelectChangeOne} />
      <br />
      Art: <SelectBox options={optionsB} onSelectChange={handleSelectChangeTwo} />
      <p>{question}</p>

      {message.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
      <hr></hr>
      <div id="submit" onClick={getMessages}>Frage stellen</div>

    </div> 
  );
};

export default App;
