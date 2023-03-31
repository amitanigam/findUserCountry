import React from 'react';
import { useState } from "react";
import axios from 'axios';
import countryListAlpha2 from '../data/country.array'

const PersonData = () => {

  const [data, setData] = useState([]);
  const [inputData, setInputdata] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://api.nationalize.io/?name=${inputData}`;

  const getPersonData = async () => {
    //e.preventDefault();
    setIsLoading(true);
    await axios.get(url)
      .then((res) => {
        setData(res.data.country);
        setIsLoading(false);
        console.log(res.data.country);
      })
      .catch((error) => console.log(error))

  }

  function handleInput(e) {
    e.preventDefault();
    setInputdata(e.target.value);
  }

  function handleUseInfo(e) {
    e.preventDefault();
    getPersonData();
  }

  const reverseUseInfo = (e) => {
    e.preventDefault();
    setData([...data.reverse()])
  }

  return (
    <>

      <div className="container">
        <div className="row">

          <div className="col m-0">
            <h2 className='text-center p-3'> Get User Info</h2>
          </div>

        </div>

        <div className="row d-flex justify-content-center">


          <form style={{ width: '18rem', textAlign: 'center' }}>
            <div className="mb-3 ">
              <label className="form-label col-auto">Put User Name</label>
              <input type="email" className="form-control " onChange={handleInput} value={inputData} />

            </div>
            <button type="submit" className="btn btn-primary mb-2" onClick={handleUseInfo}>Submit</button>
            &nbsp; &nbsp;
            <button type="submit" className="btn btn-primary mb-2" onClick={reverseUseInfo}>Reverse Data</button>
          </form>
        </div>



        {!isLoading ? <div>
          <div className="container">
            <div className="row justify-content-center">
              {data && data.map((item, i) => {
                return (
                  <>
                    <div className="card w-25 col-4 mb-3 m-2 " key={i}>
                      <div className="card-body " >
                        <p className="card-title font-weight-normal"> <strong>Country Id</strong> : &nbsp;
                        {countryListAlpha2[item.country_id]} ({item.country_id})
                         </p>
                        <p className="card-text"> <strong>Probability</strong> :&nbsp; 
                          {( (item.probability) * 100 ).toFixed(2)} %  </p>
                      </div>
                    </div>

                  </>
                )
              })}
            </div>
          </div>
        </div> :
          <div className='row  justify-content-center'>
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>

        }





      </div>

    </>
  )
}

export default PersonData;