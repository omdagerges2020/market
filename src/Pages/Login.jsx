import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../ReduxSystem/Slices/loginSlice";
import Swal from "sweetalert2";

const Login = () => {
  // console.log(jwtDecode(userToken));
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(true);
  const [varify, setVarify] = useState(true);

  // state for labels
  const [emailLabel, setEmailLabel] = useState(true);
  const [passLabel, setPassLabel] = useState(true);

  // checkLabels
  const checkLabels = () => {
    setEmailLabel(true);
    setPassLabel(true);
  };

  const handleOpen = () => {
    setStatus(true);
    Swal.fire({
      title: "Verifying your email",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Confirm",
      confirmButtonColor: "green",
      showLoaderOnConfirm: false,
      preConfirm: async (otp) => {
        try {
          const res = await axios({
            method: "post",
            url: "https://dataapi-tygq.onrender.com/api/v1/users/verify",
            data: {
              email: user.email,
              code: otp,
            },
          });
          if (res.data.message === "user has been verified!") {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Email verification done! you can login now",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/login");
          } else {
            window.confirm("OTP verification failed.");
          }
        } catch (er) {
          // console.log(er);
          Swal.showValidationMessage(
            `Verification code wrong. Please enter a valid OTP.`
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isDismissed) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "You have to verify your email first!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Dispatching
  const dispatch = useDispatch();

  // Navigation
  const navigate = useNavigate();

  // login function
  const handleLogin = async () => {
    try {
      const userDetails = await axios({
        method: "post",
        url: "https://dataapi-tygq.onrender.com/api/v1/users/login",
        headers: {
          accept: "application/json",
        },
        data: user,
      }).then((res) => res.data);
      // console.log(userDetails);
      dispatch(setLogin(userDetails.data.token));
      navigate("/");
      setStatus(true);
    } catch (er) {
      // console.log(er);
      // dispatch(setLoginError(er));
      if (er.response.data.message === "verify your email first") {
        setStatus(true);
        setVarify(false);
      } else if (er.response.data.message === "email or password is invalid") {
        setVarify(true);
        setStatus(false);
      }else {
        setStatus(false)

      }
    }
  };

  // validation
  const validateForm = (e) => {
    e.preventDefault();
    if (user.email === "") {
      checkLabels();
      setEmailLabel(false);
    } else if (user.password === "") {
      checkLabels();
      setPassLabel(false);
    } else {
      checkLabels();
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card
        color="white"
        className="w-fit p-3 shadow-2xl mt-4 mb-2"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) => validateForm(e)}
        >
          <div className="mb-1 flex flex-col gap-6">
            {emailLabel ? (
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
            ) : (
              <Typography variant="h6" color="red" className="-mb-3">
                Enter your email
              </Typography>
            )}

            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {passLabel ? (
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
            ) : (
              <Typography variant="h6" color="red" className="-mb-3">
                Password
              </Typography>
            )}

            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <Button type="submit" className="mt-6 bg-[#1B5E20]" fullWidth>
            login
          </Button>
          {!status && (
            <div className="text-red-700">
              <span>
                invalid email or password
              </span>
            </div>
          )}

          {!varify && (
            <div className="text-red-700">
              <button onClick={() => handleOpen()}>
                Please verify your email first
              </button>
            </div>
          )}

          <Typography color="gray" className="mt-4 text-center font-normal">
            Register for new account?{" "}
            <Link to={"/signup"} className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;
