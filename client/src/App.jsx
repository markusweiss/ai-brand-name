import React, { useState } from "react";
import SelectBox from "./components/SelectBox/SelectBox";

const HOST = import.meta.env.VITE_HOST;

const App = () => {
  const [message, setMessage] = useState('');

  const [selectedValueOne, setSelectedValueOne] = useState("");
  const [selectedValueTwo, setSelectedValueTwo] = useState("");
  const [selectedValueThree, setSelectedValueThree] = useState("");
  const [selectedValueFour, setSelectedValueFour] = useState("");

  const handleSelectChangeOne = value => {
    setSelectedValueOne(value);
  };

  const handleSelectChangeTwo = value => {
    setSelectedValueTwo(value);
  };

  const handleSelectChangeThree = value => {
    setSelectedValueThree(value);
  };

  const handleSelectChangeFour = value => {
    setSelectedValueFour(value);
  };


  const question=`Erfinde bitte ${selectedValueOne} zufällige ${selectedValueTwo} in der Branche ${selectedValueFour} bestehend aus maximal zwei Wörtern, Zielgruppe sind ${selectedValueThree}.`; 

  const optionsA = [
    { value: "", label: "" },
    { value: "3", label: "3" },
    { value: "5", label: "5" },
    { value: "10", label: "10" }
  ];

  const optionsB = [
    { value: "", label: "" },
    { value: "contemporary names", label: "Zeitgenössische Namen" },
    { value: "traditional names", label: "Traditionelle Namen" },
    { value: "corporate names", label: "Firmennamen" },
    { value: "dynamic names", label: "Dynamische Namen" },
    { value: "fantasy names", label: "Fantasie Namen" },
    { value: "informal names", label: "Informelle Namen" },
    { value: "elegant names", label: "Elegante Namen" },
    { value: "technical names", label: "Technische Namen" },
    { value: "provocative names", label: "Provozierende Namen" }
    
  ];

  const optionsC = [
    { value: "alle", label: "" },
    { value: "Kids", label: "Kinder" },
    { value: "Women", label: "Frauen" },
    { value: "Men", label: "Männer" }
  ];
  
  const optionsD = [
    { value: "", label: "" },
    { value: "Architecture", label: "Architektur" },
    { value: "Animals", label: "Tiere" },
    { value: "Beauty", label: "Schönheit" },
    { value: "Care", label: "Pflege" },
    { value: "Clothing", label: "Kleidung" },
    { value: "Consulting", label: "Consulting" },
    { value: "Creative", label: "Kreativ" },
    { value: "Design", label: "Design" },
    { value: "e-commerce", label: "E-commerce" },
    { value: "it", label: "IT" },
  ];

  const getMessages = async () => {
    console.log("Q:", {question});
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
    const response = await fetch(HOST, options);
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
      <h1>Hey AI generiere mir einen Namen mit folgenden Parametern:</h1>
      Anzahl: <SelectBox options={optionsA} onSelectChange={handleSelectChangeOne} />
      <br />
      Namen Typ: <SelectBox options={optionsB} onSelectChange={handleSelectChangeTwo} />
      <br />
      Zielgruppe: <SelectBox options={optionsC} onSelectChange={handleSelectChangeThree} />
      <br />
      Branche: <SelectBox options={optionsD} onSelectChange={handleSelectChangeFour} />
      <hr></hr>
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
