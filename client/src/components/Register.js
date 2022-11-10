import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const url ='http://localhost:8003/register'

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        From: "",
        To: "",
        add: "",
        desc: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();



        const { name, email, To, add, From, desc, age } = inpval;
console.log(name)
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, To, add, From, desc, age
            })
        });
        console.log(res)

        const data = await res.json();

        if (res.status === 422 || !data) {
            toast.error(data);

        } else {
            history.push("/")
            setUdata(data)
        toast.success("Ticket Booked");

        }
    }

    return (
        <div className="container" style={{backgroundColor:"rgba(255, 255, 255, 0.747)" ,marginTop:"5%",padding:"2%"}} >
            <ToastContainer />

            <form className="mt-4"  >
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                 
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">From</label>
                        <input type="text" value={inpval.From} onChange={setdata} name="From" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">To</label>
                        <input type="text" value={inpval.To} onChange={setdata} name="To" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Address</label>
                        <input type="text" value={inpval.add} onChange={setdata} name="add" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;
