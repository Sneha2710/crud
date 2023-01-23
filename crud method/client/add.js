import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'

export function Add() {

        const handle = async (event) => {
        console.log("event", event.target.value)
        event.preventDefault();

        var datastring = new FormData(event.target);
        var config = { headers: { "enctype": "application/x-www-form-urlencoded" } };

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let date = document.getElementById("date").value;

        // console.log("name",name)
        console.log("date", date)
        const newVal = {
            name: name,
            email: email,
            date: date
        }


        if (name === '' || name === null) {
            alert("Enter The Name");
        }
        else if (email === '' || email === null) {
            alert('Enter The Email');
        }
        else if (date === '' || date === null) {
            alert('Enter The Date')
        }
        else {
            console.log("data", datastring);
            await axios.post('http://localhost:3002/api/post', newVal, datastring, config)
                .then(function (res) {
                    if (res.data.status === 'error') {
                        alert('Error');
                        window.location.reload();
                    }
                    else if (res.data.status === 'inserted') {
                        alert('Profile Created');
                        window.location.href = "./";
                    }
                })
                .catch(function (err) {
                    alert(err);
                    console.log(err);
                    window.location.reload();
                })
        }
    }

         return (
        <body className='background'>

                 <div className='container'>
                 <h1>Add Student Details</h1>


                <div className='col-lg-12 d-flex flex-row justify-content-center'>

                    <div className='col-lg-4'>&nbsp;</div>

                    <div className='col-lg-4 pt-5'>
                        <form className='form ' onSubmit={handle}>
                            <label>Enter your Name </label><br></br>
                            <input type='text' name='name' id='name' placeholder='Enter your name..' className='form-control' /><br></br>

                            <label>Enter your Email </label><br></br>
                            <input type='email' name='email' id='email' placeholder='Enter your email..' className='form-control' /><br></br>

                            <label>Date_of_Birth </label><br></br>
                            <input type='date' name='date' id='date' placeholder='Enter your email..' className='form-control' />

                            <input type='submit' value='save' className='btn btn-success mt-5' />

                            <Link to='/' >
                                <input type='button' value='GoBack' className='btn btn-dark btn-group ml-3 mt-5' />
                            </Link>

                        </form>
                    </div>
                    <div className='col-lg-4'>&nbsp;</div>
                </div>
            </div>

        </body>
    );
}

export default Add;