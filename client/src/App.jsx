import React, { useState } from 'react';
import SelectBox from './components/SelectBox/SelectBox';

const HOST = import.meta.env.VITE_HOST;

const App = () => {
  const [message, setMessage] = useState('');

  const [selectedValueOne, setSelectedValueOne] = useState('3');
  const [selectedValueTwo, setSelectedValueTwo] = useState('');
  const [selectedValueThree, setSelectedValueThree] = useState('all people');
  const [selectedValueFour, setSelectedValueFour] = useState('');

  const handleSelectChangeOne = (value) => {
    setSelectedValueOne(value);
  };

  const handleSelectChangeTwo = (value) => {
    setSelectedValueTwo(value);
  };

  const handleSelectChangeThree = (value) => {
    setSelectedValueThree(value);
  };

  const handleSelectChangeFour = (value) => {
    setSelectedValueFour(value);
  };

  const question = `Generate ${selectedValueOne} random ${selectedValueTwo} in the industry ${selectedValueFour} consisting of a maximum of two words, target group are ${selectedValueThree}.`;

  const optionsA = [
    { value: '3', label: '3' },
    { value: '5', label: '5' },
    { value: '10', label: '10' }
  ];

  const optionsB = [
    { value: '', label: '' },
    {
      value: 'contemporary brand names',
      label: 'Zeitgenössische Namen'
    },
    {
      value: 'traditional brand names',
      label: 'Traditionelle Namen'
    },
    {
      value: 'corporate brand names',
      label: 'Firmennamen'
    },
    {
      value: 'dynamic brand names',
      label: 'Dynamische Namen'
    },
    {
      value: 'fantasy brand names',
      label: 'Fantasie Namen'
    },
    {
      value: 'informal brand names',
      label: 'Informelle Namen'
    },
    {
      value: 'elegant brand names',
      label: 'Elegante Namen'
    },
    {
      value: 'technical brand names',
      label: 'Technische Namen'
    },
    {
      value: 'provocative brand names',
      label: 'Provozierende Namen'
    }
  ];

  const optionsC = [
    { value: 'all people', label: 'alle' },
    { value: 'Kids', label: 'Kinder' },
    { value: 'Women', label: 'Frauen' },
    { value: 'Men', label: 'Männer' }
  ];

  const optionsD = [
    { value: '', label: '' },
    { value: 'architecture', label: 'Architektur' },
    { value: 'animals', label: 'Tiere' },
    { value: 'beauty', label: 'Schönheit' },
    { value: 'care', label: 'Pflege' },
    { value: 'clothing', label: 'Kleidung' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'creative', label: 'Kreativ' },
    { value: 'design', label: 'Design' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'it', label: 'IT' },
    { value: 'sales and marketing', label: 'Sales & Marketing' },
    { value: 'science', label: 'Wissenschaft' },
    { value: 'security', label: 'Sicherheit' },
    { value: 'shops and stores', label: 'Ladengeschäfte' },
    { value: 'software', label: 'Software' },
    { value: 'sport', label: 'Sport' },
    { value: 'travel', label: 'Reisen' }
  ];

  const getMessages = async () => {
    console.log('Q:', { question });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: question
      })
    };

    try {
      const response = await fetch(HOST, options);
      const data = await response.json();
      //console.log("DATA: ", data);
      setMessage(data.choices[0].message.content);
      console.log('messages::', data.choices[0].message.content);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <div>
      <h1>Hey AI generiere mir einen Namen mit folgenden Parametern:</h1>
      <SelectBox
        selectLabel="Anzahl Namen:"
        options={optionsA}
        onSelectChange={handleSelectChangeOne}
      />
      <br />
      <SelectBox
        selectLabel="Namen Typ:"
        options={optionsB}
        onSelectChange={handleSelectChangeTwo}
      />
      <br />
      <SelectBox
        selectLabel="Zielgruppe:"
        options={optionsC}
        onSelectChange={handleSelectChangeThree}
      />
      <br />
      <SelectBox
        selectLabel="Branche:"
        options={optionsD}
        onSelectChange={handleSelectChangeFour}
      />
      <hr></hr>
      {message.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
      <hr></hr>
      <div id="submit" onClick={getMessages}>
        Generiere Namen
      </div>
    </div>
  );
};

export default App;
