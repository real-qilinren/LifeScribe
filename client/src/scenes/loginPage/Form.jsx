import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useDispatch} from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    location: Yup.string().required("Location is required"),
    occupation: Yup.string().required("Occupation is required"),
    picture: Yup.string().required("Picture is required"),

});

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        // this allows to send form info with a picture to the server
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('picturePath', values.picture.name);

        console.log("Registering user, front end");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        const savedUserResponse = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            body: formData,
        });

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    }

    const login = async (values, onSubmitProps) => {
        const loginResponse = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const loggedIn = await loginResponse.json();
        onSubmitProps.resetForm();

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                }
            ));
            navigate("/home");
        } else {
            onSubmitProps.setErrors({ email: "Invalid email or password" });
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) {
            await login(values, onSubmitProps);
        }

        if (isRegister) {
            await register(values, onSubmitProps);
        }
    };

    return (
        <Formik
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            onSubmit={handleFormSubmit}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {
                                gridColumn: isNonMobile ? undefined : "span 4",
                            },
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    name="firstName"
                                    label="First Name"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{gridColumn: "span 2"}}
                                />
                                <TextField
                                    name="lastName"
                                    label="Last Name"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{gridColumn: "span 2"}}
                                />
                                <TextField
                                    name="location"
                                    label="Location"
                                    value={values.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <TextField
                                    name="occupation"
                                    label="Occupation"
                                    value={values.occupation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptFiles=".jpg, .jpeg, .png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{
                                                    "&:hover": {
                                                        cursor: "pointer"
                                                    }
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon/>
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        <TextField
                            name="email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* Buttons */}
                    <Box>
                        <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m:"2rem 0",
                            p:"1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": {
                                backgroundColor: palette.primary.main,
                            }
                        }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>

                        <Button>
                            <Typography
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login");
                                    resetForm();
                            }}
                                sx={{
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                }
                            }}
                            >
                                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                            </Typography>
                        </Button>

                    </Box>
                </form>
            )}
        </Formik>
    );
}

export default Form;