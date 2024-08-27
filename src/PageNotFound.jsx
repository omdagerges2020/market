import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";


const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-5">
      <h1 className="text-red-700 font-bold text-6xl">Page Not Found 404</h1>
      <Button variant="red" onClick={()=>navigate('/')}>Go Back Home</Button>
    </div>
  );
};

export default PageNotFound;
