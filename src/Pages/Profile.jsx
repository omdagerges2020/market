import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../ReduxSystem/Slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./../Loading";
import { Button } from "@material-tailwind/react";

const Profile = () => {
  const { userInfo, loadingUser } = useSelector((state) => state.showUser);
  // console.log(userInfo);

  const { userId } = useParams();
  // console.log(userId);

  const dispatch = useDispatch();

  // navigation
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserData(userId));
  }, []);

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen bg-[#ECFFE6] flex justify-center items-center">
      <div className="shadow-lg lg:w-[60%] md:w-[60%] w-[100%] px-6 py-6 flex flex-col gap-[4em] items-center">
        <div className="flex flex-row gap-3 justify-around items-center">
          <h1 className="font-bold">Full Name:</h1>
          <span className="text-lg">{userInfo.fullName}</span>
        </div>
        <div className="flex flex-row gap-3 justify-around items-center">
          <h1 className="font-bold">Email:</h1>
          <span className="text-lg">{userInfo.email}</span>
        </div>
        <div className="flex flex-row gap-3 justify-around items-center">
          <h1 className="font-bold">dateOfBirth:</h1>
          <span className="text-lg">{userInfo.dateOfBirth}</span>
        </div>
        <div>
          <Button onClick={()=>navigate(`/editprofile/${userInfo._id}`)}>Edit Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
