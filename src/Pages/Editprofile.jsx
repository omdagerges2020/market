import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../ReduxSystem/Slices/userSlice";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const Editprofile = () => {
  // useselector
  const { userInfo } = useSelector((state) => state.showUser);
  // console.log(userInfo);

  // user state
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: ""
  });

  // params
  const { userId } = useParams();

  // navigation
  const navigate = useNavigate()

  // dispatch
  const dispatch = useDispatch();

  // HandleEdit function
  const handleEdit = async(e)=>{
    e.preventDefault()
      try{
        await axios({
          method: "PATCH",
          url: `https://dataapi-tygq.onrender.com/api/v1/users/${userId}`,
          data: userData
        })
        // console.log(res);
        navigate(`/profile/${userId}`)
      }catch(er){
        // console.log(er);
      }
  }


  // useeffect
  useEffect(() => {
    if(userId){
      dispatch(getUserData(userId));
    }
  }, []);

  useEffect(()=>{
    if(userInfo){
      setUserData(userInfo)
    }
  },[userInfo])



  return (
    <div className="w-full h-screen bg-[#ECFFE6] flex justify-center items-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Editing Your Profile
        </Typography>
        <form onSubmit={(e)=>handleEdit(e)} className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={userData.fullName}
              onChange={(e)=>setUserData({...userData, fullName: e.target.value})}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={userData.email}
              onChange={(e)=>setUserData({...userData, email: e.target.value})}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              DateOfBirth
            </Typography>
            <Input
              type="date"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={userData.dateOfBirth}
              onChange={(e)=>setUserData({...userData, dateOfBirth: e.target.value})}
            />
          </div>
          <Button type="submit" className="mt-6 bg-[#1B5E20]" fullWidth>
            Edit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Editprofile;
