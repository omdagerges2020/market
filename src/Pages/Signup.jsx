import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DiAsterisk } from "react-icons/di";
import Swal from 'sweetalert2'


const Signup = () => {
  // State for inputs
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    gender: "Male",
    avatar: "",
  });
  // state for labels
  const [nameLabel, setNameLabel] = useState(true);
  const [emailLabel, setEmailLabel] = useState(true);
  const [passLabel, setPassLabel] = useState(true);

  const [status, setStatus] = useState("");


  // checkLabels
  const checkLabels = () => {
    setNameLabel(true);
    setEmailLabel(true);
    setPassLabel(true);
  };

  const navigate = useNavigate();

  // regular expression  for email validate
  const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // regular expression for pass validate
  const regPass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  // HandleForm Function
  const handleForm = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "https://dataapi-tygq.onrender.com/api/v1/users/register",
        H: "accept: application/json",
        d: "Content-Type: application/x-www-form-urlencoded",
        data: user,
      });
      console.log("ok regester", res);
      setStatus(true);
      Swal.fire({
        title: "Verifying your email",
        input: "number",
        inputAttributes: {
          autocapitalize: "off"
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
              // window.confirm("Email verification done!");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Email verification done!",
                showConfirmButton: false,
                timer: 1500
              });
              navigate("/login");
            } else {
              window.confirm("OTP verification failed.");
            }
          } catch (er) {
            console.log(er);
            // alert(er.response.data.message + " please enter valid otp");
            Swal.showValidationMessage(
              `Verification code wrong. Please enter a valid OTP.`
            );
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isDismissed) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "You have to verify your email!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });

    } catch (er) {
      console.log(er);
      setStatus(false);
    }
  };

    // validation form
    const validateForm = (e) => {
      e.preventDefault();
      if (user.fullName === "") {
        setNameLabel(false);
      } else if (user.email === "" || !regEmail.test(user.email)) {
        checkLabels();
        setEmailLabel(false);
      } else if (user.password === "" || !regPass.test(user.password)) {
        checkLabels();
        setPassLabel(false);
      } else {
        checkLabels();
        handleForm();
      }
    };
  

  return (
    <div className="flex justify-center items-center">
      <Card
        color="white"
        className="xl:w-fit lg:w-fit md:w-fit w-[100%] p-5 shadow-2xl mt-4 mb-2 flex lg:justify-start lg:items-start md:justify-start md:items-start justify-center items-center"
        shadow={true}
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={(e) => validateForm(e)} className="mt-8 mb-2 ">
          <div className="mb-1 flex flex-col gap-6">
            {/* full name input && email input */}
            <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col gap-4 ">
              <div className="flex flex-col gap-3 lg:w-[50%] md:w-[50%] w-[100%]">
                <div className="relative group">
                  {nameLabel ? (
                    <Input
                      onChange={(e) =>
                        setUser({ ...user, fullName: e.target.value })
                      }
                      label="full name"
                      icon={
                        <DiAsterisk className="text-red-700 hover:cursor-pointer" />
                      }
                    />
                  ) : (
                    <Input
                      onChange={(e) =>
                        setUser({ ...user, fullName: e.target.value })
                      }
                      label="must enter your name"
                      icon={
                        <DiAsterisk className="text-red-700 hover:cursor-pointer" />
                      }
                      error
                    />
                  )}
                  <span className="absolute left-[40%] top-7 mt-1 px-2 py-1 bg-gray-700 text-white text-xs rounded hidden group-hover:block transform -translate-x-1/2">
                    This field is required
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:w-[50%] md:w-[50%] w-[100%]">
                <div className="relative group">
                  {emailLabel ? (
                    <Input
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      label="email"
                      icon={
                        <DiAsterisk className="text-red-700 hover:cursor-pointer" />
                      }
                    />
                  ) : (
                    <Input
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      label="enter your email"
                      icon={
                        <DiAsterisk className="text-red-700 hover:cursor-pointer" />
                      }
                      error
                    />
                  )}
                  <span className="absolute left-[40%] top-7 mt-1 px-2 py-1 bg-gray-700 text-white text-xs rounded hidden group-hover:block transform -translate-x-1/2">
                    This field is required
                  </span>
                </div>
              </div>
            </div>

            {/* phone number input && dateOfBirth input */}
            <div className="flex gap-4 xl:flex-row lg:flex-row md:flex-row flex-col">
              <div className="flex flex-col gap-3 lg:w-[50%] md:w-[50%] w-[100%]">
                <Input
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  label="phone number"
                />
              </div>
              <div className="flex flex-col gap-3 lg:w-[50%] md:w-[50%] w-[100%]">
                <Input
                  type="date"
                  value={user.dateOfBirth}
                  label="dataOfBirth"
                  onChange={(e) =>
                    setUser({ ...user, dateOfBirth: e.target.value })
                  }
                />
              </div>
            </div>

            {/* password input && avatar */}
            <div className="flex gap-4 xl:flex-row lg:flex-row md:flex-row flex-col">
              <div className="flex flex-col gap-3 lg:w-[50%] md:w-[50%] w-[100%]">
                <div className="relative group">
                  {passLabel ? (
                    <Input
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      label="password"
                      icon={
                        <DiAsterisk className="text-red-700 hover:cursor-pointer" />
                      }
                    />
                  ) : (
                    <Input
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      label="must enter your password"
                      icon={
                        <DiAsterisk className="text-red-700 hover:cursor-pointer" />
                      }
                      error
                    />
                  )}
                  <div className="flex flex-col text-xs">
                    <span>-At least 8 characters long</span>
                    <span>-Contains at least one lowercase letter</span>
                    <span>-Contains at least one uppercase letter</span>
                    <span>-Contains at least one number</span>
                    <span>-Contains at least one special character (@$!%*?&)</span>
                  </div>

                  <span className="absolute left-[40%] top-full mt-1 px-2 py-1 bg-gray-700 text-white text-xs rounded hidden group-hover:block transform -translate-x-1/2">
                    This field is required
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:w-[50%] md:w-[50%] w-[100%]">
                <Input
                  type="text"
                  placeholder="https://"
                  label="avatar"
                  value={user.avatar}
                  onChange={(e) => setUser({ ...user, avatar: e.target.value })}
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex gap-4 xl:flex-row lg:flex-row md:flex-row flex-col">
              <div className="flex flex-col gap-3 lg:w-[50%] md:w-[50%] w-[100%]">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className={"mb-3 w-[35%]"}
                >
                  Gender:
                </Typography>
                <select
                  value={user.gender}
                  onChange={(e) => setUser(e.target.value)}
                  className="h-[30px] w-[100%] rounded border-2	"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          {!status && <div className="text-red-700">User Already exists</div>}
          <Button type="submit" className="mt-6 bg-[#1B5E20]" fullWidth>
            sign up
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to={"/login"} className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
