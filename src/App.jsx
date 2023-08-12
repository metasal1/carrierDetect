import { useState } from 'react';
import './App.css';
import phoneLogo from './phone.png';


const CarrierDetect = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://cd.milysec.com?phoneNumber=${phoneNumber}`);
      const data = await response.json();
      const { Carrier, City, Country, County, PhoneType, Timezone, ZipCode } = data.message.NumberValidateResponse;
      const tableData = [
        { label: 'Carrier', value: Carrier },
        { label: 'City', value: City },
        { label: 'Country', value: Country },
        { label: 'County', value: County },
        { label: 'Phone Type', value: PhoneType },
        { label: 'Timezone', value: Timezone },
        { label: 'Zip Code', value: ZipCode },
      ];
      setOutput(tableData);
    } catch (error) {
      console.error(error);
      setOutput('Error occurred while fetching data.');
    }
    setLoading(false);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleLookupClick = () => {
    if (phoneNumber.trim() === '') {
      setOutput('Please enter a valid phone number.');
      return;
    }
    fetchData();
  };

  const handleClearClick = () => {
    setPhoneNumber('');
    setOutput('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLookupClick();
    }
  };

  return (
    <div className="container">
  <img src={phoneLogo} alt="Phone Logo" className="logo" />
   <div className="logo-container">
  <h1 className="title">Carrier Detect</h1>
</div>

      <div className="form-group">
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter phone number e.g. 61412345678"
        />
        <button onClick={handleLookupClick}>Lookup</button>
        <button onClick={handleClearClick}>Clear</button>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="output">
          {output.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <tbody>
                  {output.map((item, index) => (
                    <tr key={index}>
                      <td>{item.label}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarrierDetect;
