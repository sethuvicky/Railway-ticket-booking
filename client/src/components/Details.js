import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useHistory } from 'react-router-dom';


const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    const history = useHistory();


    const getdata = async () => {
        const url =`http://localhost:8003/getuser/${id}`

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {
        const url =`http://localhost:8003/deleteuser/${id}`


        const res2 = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            history.push("/");
        }

    }

    return (
        <div className="container mt-3" style={{padding:"5%"}}>

            <Card sx={{ maxWidth: 1000,marginTop:"5%" }}>
            <h1 style={{ fontWeight: 400,marginTop:"2%",marginLeft:"1%"}}>Booked Ticket Details</h1>

                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <h3 className="mt-3">Name: <span >{getuserdata.name}</span></h3>
                            <p className="mt-3"><LocationOnIcon />From: <span>{getuserdata.From}</span></p>
                            <p className="mt-3"><LocationOnIcon />To: <span>{getuserdata.To}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">

                            <p className="mt-5"></p>
                            <p className="mt-5"></p>
                            <p className="mt-3"><MailOutlineIcon /> Email: <span>{getuserdata.email}</span></p>
                            <p className="mt-3"><LocationOnIcon />Location: <span>{getuserdata.add}</span></p>
                            <p className="mt-3">Description: <span>{getuserdata.desc}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details
