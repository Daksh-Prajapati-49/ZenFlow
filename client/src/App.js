import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';
import Book from './components/Book';

function App() {
  const [data, setData] = useState({ name: "", email: "", phone: "", batchId: "", month: "", year: "" });
  const [batch, setBatch] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name === "") {
      setError("Name is required");
      return;
    }
    if (data.email === "") {
      setError("Email is required");
      return;
    }
    if (data.phone.length !== 10) {
      setError("Phone number is required");
      return;
    }

    axios.get('https://zenflowv4.onrender.com/api/batch/')
      .then((res) => {
        setError("");
        console.log(res.data.batch);
        setBatch(res.data.batch);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
  };

  const handleChange = (e) => {
    // console.log("hii");
    const { name, value } = e.target;
    // console.log(e.target);
    setData({ ...data, [name]: value });
  }


  return (
    <div className="App">
      <Navbar />
      <div className="inpform">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" id="exampleInputPassword1" value={data.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={data.email} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="number" name="phone" className="form-control" id="exampleInputPhoneNumber" value={data.phone} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Get Available Batches</button>
        </form>
        <div className='d-inline-flex p-2 flex-wrap justify-content-evenly'>
          {error ? (<p>{error}</p>) : (<></>)}
          {
            batch.map((item, idx) => {
              return (
                <div key={item._id}>
                  <Book item={item} data={data} setData={setData} idx={idx} />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
