import React, { useState, useRef } from "react";
import sha256 from "crypto-js/sha256";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../assets/css/NewEnrollment.module.css";
import {
  faculties,
  studies,
  courses,
  ucmAssociations,
  externalAssociations,
} from "../../utils/enrollmentconfig";
import EnrollmentAssociations from "./EnrollmentAssociations";
import {
  checkTextField,
  checkUCMEmailField,
  checkListField,
  checkNumberField,
} from "../../utils/EnrollmentFieldValidation";
import ConfirmDialog from "../shared/ConfirmDialog";
import { getCurrentAccount } from "../../utils/web3";
import enrollment from "../../contracts/enrollment";
import axios from "axios";

function NewEnrollment(props) {
  const [successNewEnrollment, setSuccessNewEnrollment] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [activityCode, setActivityCode] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("FE");
  const [homeZip, setHomeZip] = useState("");
  const [courseZip, setCourseZip] = useState("");
  const [currentFaculty, setCurrentFaculty] = useState("faculty00");
  const [currentStudy, setCurrentStudy] = useState("study00");
  const [currentCourse, setCurrentCourse] = useState("course00");
  const [memberUCMAssociation, setMemberUCMAssociation] = useState(false);
  const [currentUCMAssocFaculty, setCurrentUCMAssocFaculty] =
    useState("ucmAssocFaculty00");
  const [currentUCMAssociation, setCurrentUCMAssociation] =
    useState("ucmAssoc00");
  const [selectedUCMAssocs, setSelectedUCMAssocs] = useState([]);
  const [memberOtherAssociation, setMemberOtherAssociation] = useState(false);
  const [currentOtherAssociation, setCurrentOtherAssociation] =
    useState("otherAssoc00");
  const [selectedOtherAssocs, setSelectedOtherAssocs] = useState([]);
  const [similarActivities, setSimilarActivities] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveBlockchain, setSaveBlockchain] = useState(false);

  const inputActivityCodeRef = useRef();
  const inputEmailRef = useRef();
  const inputAgeRef = useRef();
  const inputHomeZipRef = useRef();
  const inputCourseZipRef = useRef();
  const inputFacultyRef = useRef();
  const inputStudyRef = useRef();
  const inputCourseRef = useRef();
  const inputUCMAssocFacultyRef = useRef();
  const inputUCMAssociationRef = useRef();
  const inputOtherAssociationRef = useRef();
  const generalDivRef = useRef();

  const addEnrollmentButtonHandler = () => {
    setSuccessNewEnrollment(false);
    resetNewEnrollmentFormFields();
    inputActivityCodeRef.current.focus();
    console.log("Clicked add button.");
  };

  const activityCodeHandler = (e) => {
    setErrorMessages({});
    const value = e.target.value;
    setActivityCode(value);
  };

  const emailHandler = (e) => {
    setErrorMessages({});
    const value = e.target.value;
    setEmail(value);
  };

  const ageHandler = (e) => {
    setErrorMessages({});
    const value = e.target.value;
    setAge(value);
  };

  const genderHandler = (e) => {
    setErrorMessages({});
    const value = e.target.value;
    setGender(value);
  };

  const homeZipHandler = (e) => {
    setErrorMessages({});
    const value = e.target.value;
    setHomeZip(value);
  };

  const courseZipHandler = (e) => {
    setErrorMessages({});
    const value = e.target.value;
    setCourseZip(value);
  };

  const facultySelectHandler = (e) => {
    setErrorMessages({});
    if (e.target.value !== "faculty00") {
      setCurrentFaculty(e.target.value);
      setCurrentStudy("study00");
    }
  };

  const studySelectHandler = (e) => {
    setErrorMessages({});
    if (e.target.value !== "study00") {
      setCurrentStudy(e.target.value);
      setCurrentCourse("course00");
    }
  };

  const courseSelectHandler = (e) => {
    setErrorMessages({});
    if (e.target.value !== "course00") {
      setCurrentCourse(e.target.value);
    }
  };

  const handleCheckBoxUCMAssocChange = (e) => {
    const isChecked = e.target.checked;
    setMemberUCMAssociation(isChecked);
    if (isChecked) {
      setCurrentUCMAssocFaculty("ucmAssocFaculty00");
    }
  };

  const ucmAssocFacultySelectHandler = (e) => {
    setErrorMessages({});
    if (e.target.value !== "ucmAssocFaculty00") {
      setCurrentUCMAssocFaculty(e.target.value);
      setCurrentUCMAssociation("ucmAssoc00");
    }
  };

  const ucmAssociationSelectHandler = (e) => {
    setErrorMessages({});
    let newUCMAssocId = e.target.value;
    //This instruction is not working with this version of Material UI.
    //let newUCMAssocName = e.currentTarget.getAttribute("data-name");
    let newUCMAssocItem = ucmAssociations.find(
      (item) => item.id === newUCMAssocId
    );
    let newUCMAssocName = newUCMAssocItem.name;
    if (newUCMAssocId !== "ucmAssoc00") {
      let ucmAssociationsList = [...selectedUCMAssocs];
      setCurrentUCMAssociation("ucmAssoc00");
      //Check if the occupation is in the list yet.
      var ucmAssociationIndex = ucmAssociationsList
        .map((item) => {
          return item.id;
        })
        .indexOf(newUCMAssocId);
      console.log("UCM Association index: ", ucmAssociationIndex);
      if (ucmAssociationIndex === -1) {
        // Not found.
        const newUCMAssociation = {
          id: newUCMAssocId,
          name: newUCMAssocName,
        };
        ucmAssociationsList.push(newUCMAssociation);
        setSelectedUCMAssocs(ucmAssociationsList);
      }
    }
  };

  const deleteUCMAssociationHandler = (associationIndex) => {
    setErrorMessages({});
    let ucmAssociationsList = [...selectedUCMAssocs];
    ucmAssociationsList.splice(associationIndex, 1);
    setSelectedUCMAssocs(ucmAssociationsList);
  };

  const handleCheckBoxOtherAssocChange = (e) => {
    setErrorMessages({});
    const isChecked = e.target.checked;
    setMemberOtherAssociation(isChecked);
  };

  const otherAssociationSelectHandler = (e) => {
    setErrorMessages({});
    let newOtherAssocId = e.target.value;
    let newOtherAssocItem = externalAssociations.find(
      (item) => item.id === newOtherAssocId
    );
    let newOtherAssocName = newOtherAssocItem.name;
    if (newOtherAssocId !== "ucmAssoc00") {
      let otherAssociationsList = [...selectedOtherAssocs];
      setCurrentOtherAssociation("otherAssoc00");
      //Check if the occupation is in the list yet.
      var otherAssociationIndex = otherAssociationsList
        .map((item) => {
          return item.id;
        })
        .indexOf(newOtherAssocId);
      console.log("Other Association index: ", otherAssociationIndex);
      if (otherAssociationIndex === -1) {
        // Not found.
        const newOtherAssociation = {
          id: newOtherAssocId,
          name: newOtherAssocName,
        };
        otherAssociationsList.push(newOtherAssociation);
        setSelectedOtherAssocs(otherAssociationsList);
      }
    }
  };

  const deleteOtherAssociationHandler = (associationIndex) => {
    setErrorMessages({});
    let otherAssociationsList = [...selectedOtherAssocs];
    otherAssociationsList.splice(associationIndex, 1);
    setSelectedOtherAssocs(otherAssociationsList);
  };

  const handleCheckBoxSimilarActivitiesChange = (e) => {
    setErrorMessages({});
    const isChecked = e.target.checked;
    setSimilarActivities(isChecked);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMessages({});
    let validEnrollment = true;
    let errors = {};
    let previousError = false;

    try {
      setLoading(true);
      //FIELD VALIDATION
      //Check Activity ID
      //console.log("Activity ID:", activityCode);
      validEnrollment = checkTextField(activityCode);
      if (!validEnrollment) {
        errors.activityCode =
          "Por favor, introducir el código de la actividad.";
        previousError = true;
        inputActivityCodeRef.current.focus();
      }

      //Check email
      //console.log("email:", email);
      validEnrollment = checkTextField(email);
      if (!validEnrollment) {
        errors.email = "Por favor, introducir el email del estudiante.";
      } else {
        validEnrollment = checkUCMEmailField(email);
        if (!validEnrollment) {
          errors.email =
            "Por favor, introducir un email UCM con formato válido (ej. user@ucm.es).";
        }
      }
      if (!validEnrollment && !previousError) {
        previousError = true;
        inputEmailRef.current.focus();
      }

      //Check Age
      //console.log("Age: ", age);
      validEnrollment = checkNumberField(age);
      if (!validEnrollment) {
        errors.age = "Por favor, introducir la edad del estudiante.";
        if (!previousError) {
          previousError = true;
          inputAgeRef.current.focus();
        }
      }

      //Check Gender
      //console.log("Gender: ", gender);

      // Check Faculty
      //console.log("Faculty: ", currentFaculty);
      validEnrollment = checkTextField(currentFaculty);
      if (!validEnrollment || currentFaculty === "faculty00") {
        errors.faculty = "Por favor, indicar Facultad de estudios";
        if (!previousError) {
          previousError = true;
          inputFacultyRef.current.focus();
        }
      }

      //Check study
      //console.log("Study: ", currentStudy);
      validEnrollment = checkTextField(currentStudy);
      if (
        !validEnrollment ||
        (currentStudy === "study00" && currentFaculty !== "faculty00")
      ) {
        errors.study = "Por favor, indicar titulación que se están realizando.";
        setErrorMessages(errors);
        if (!previousError) {
          previousError = true;
          inputStudyRef.current.focus();
        }
      }

      //Check Course
      //console.log("Course: ", currentCourse);
      validEnrollment = checkTextField(currentCourse);
      if (
        !validEnrollment ||
        (currentCourse === "course00" && currentStudy !== "study00")
      ) {
        errors.course = "Por favor, indicar el curso que se está realizando.";
        if (!previousError) {
          previousError = true;
          inputCourseRef.current.focus();
        }
      }

      //Check family zip
      //console.log("Family address: ", homeZip);
      validEnrollment = checkNumberField(homeZip);
      if (!validEnrollment) {
        errors.homeZip =
          "Por favor, introducir código postal del domicilio familiar.";
        if (!previousError) {
          previousError = true;
          inputHomeZipRef.current.focus();
        }
      }

      //Check course zip
      //console.log("Course address: ", courseZip);
      validEnrollment = checkNumberField(courseZip);
      if (!validEnrollment) {
        errors.courseZip =
          "Por favor, introducir código postal del domicilio durante el curso académico.";
        if (!previousError) {
          previousError = true;
          inputCourseZipRef.current.focus();
        }
      }

      //Check similar activities
      //console.log("Similar activities: ", similarActivities);

      //Check UCM Association checkbox
      //console.log("UCM Association: ", memberUCMAssociation);
      if (memberUCMAssociation) {
        //Check UCM associations
        //console.log("UCM Associations: ", selectedUCMAssocs);
        validEnrollment = checkListField(selectedUCMAssocs);
        if (!validEnrollment) {
          if (currentUCMAssocFaculty === "ucmAssocFaculty00") {
            errors.ucmAssocFaculty =
              "Por favor, indicar la facultad vinculada a la asociación";
            if (!previousError) {
              previousError = true;
              inputUCMAssocFacultyRef.current.focus();
            }
          } else {
            errors.ucmAssociation =
              "Por favor, indicar la asociación vinculada a la facultad.";
            if (!previousError) {
              previousError = true;
              inputUCMAssociationRef.current.focus();
            }
          }
        }
      }

      //Check External Association checkbox
      //console.log("External Association: ", memberOtherAssociation);
      if (memberOtherAssociation) {
        //Check external associations
        //console.log("External Associations: ", selectedOtherAssocs);
        validEnrollment = checkListField(selectedOtherAssocs);
        if (!validEnrollment) {
          errors.otherAssociation =
            "Por favor, indicar una asociación externa a la UCM.";
          if (!previousError) {
            previousError = true;
            inputOtherAssociationRef.current.focus();
          }
        }
      }

      setErrorMessages(errors);

      //Check for errors.
      if (Object.keys(errors).length === 0) {
        setSaveBlockchain(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        "EXCEPTION ERROR - New enrollment (onSubmit): " + error.message
      );
      setErrorMessages({});
      errors.general = "Se ha producido una excepción: " + error.message;
      generalDivRef.current.focus();
      setErrorMessages(errors);
    }
  };

  const saveEnrollmentOKDialogHandler = async () => {
    //The new enrollment can be stored in the Blockchain.
    setSaveBlockchain(false);
    setErrorMessages({});
    setSuccessNewEnrollment(false);
    setLoading(true);
    let errors = {};
    try {
      //Total fields of the form
      console.log(">>> FORM FIELDS");
      console.log("Activity code:", activityCode);
      console.log("email:", email);
      console.log("Age: ", age);
      console.log("Gender: ", gender);
      console.log("Faculty: ", currentFaculty);
      console.log("Study: ", currentStudy);
      console.log("Course: ", currentCourse);
      console.log("Family address: ", homeZip);
      console.log("Course address: ", courseZip);
      console.log("Similar activities: ", similarActivities);
      console.log("UCM Association: ", memberUCMAssociation);
      var ucmAssociationIds = [];
      if (memberUCMAssociation) {
        //Adapt fields in order to store them in the blockchain or in the database
        //Save only the ids of the association(s) associated with the enrollment.
        ucmAssociationIds = selectedUCMAssocs.map((ucmAssoc) => {
          return ucmAssoc.id;
        });
        console.log("UCM Association Ids: ", ucmAssociationIds);
      }

      var otherAssociationsIds = [];
      console.log("External Association: ", memberOtherAssociation);
      if (memberOtherAssociation) {
        otherAssociationsIds = selectedOtherAssocs.map((otherAssoc) => {
          return otherAssoc.id;
        });
        console.log("External UCM Association Ids: ", otherAssociationsIds);
      }

      //Fields to store in the blockchain
      const activityHash = sha256(activityCode.toUpperCase()).toString();
      const studentHash = sha256(email.toLowerCase()).toString();
      console.log(">>> FIELDS TO STORE IN THE BLOCKCHAIN");
      console.log("Activity hash:", activityHash);
      console.log("Student hash: ", studentHash);
      const currentAccount = getCurrentAccount();
      console.log("Current account: ", currentAccount);
      const appName = process.env.REACT_APP_APPLICATION_NAME;
      console.log("App name: ", appName);
      const activityConfig = {
        headers: {
          //"Content-Type": "application/json",
          Application: appName,
          User: currentAccount,
        },
        params: { activityCode: activityCode.toUpperCase() },
      };

      //First, check if the activity is included in the database
      axios
        .get(
          process.env.REACT_APP_API_BASE_URL + "activities/activity",
          activityConfig
        )
        .then((activityRes) => {
          console.log("Results from axios (activity): ", activityRes);
          const activityData = activityRes.data;
          console.log("Activity data: ", activityData);
          if (activityData.error !== null) {
            setLoading(false);
            setErrorMessages({});
            if (activityData.error.message === "DB_ERROR_MESSAGE_400") {
              //Activity not found.
              errors.activityCode =
                "Código de actividad no registrado. Por favor, introduzca un código válido.";
              inputActivityCodeRef.current.focus();
            } else {
              errors.general =
                "Se ha producido una excepción al comprobar el código de actividad en la Base de datos: " +
                activityData.error.message;
              generalDivRef.current.focus();
            }
            setErrorMessages(errors);
          } else {
            //The activity is stored in the database.
            //Next, check if the student is included in the database.
            const studentConfig = {
              headers: {
                //"Content-Type": "application/json",
                Application: appName,
                User: currentAccount,
              },
              params: { studentEmail: email.toUpperCase() },
            };
            axios
              .get(
                process.env.REACT_APP_API_BASE_URL +
                  "students/student/checkemail",
                studentConfig
              )
              .then((studentRes) => {
                console.log("Results from axios (student): ", studentRes);
                const studentData = studentRes.data;
                console.log("Student data: ", studentData);
                if (studentData.error !== null) {
                  setLoading(false);
                  setErrorMessages({});
                  if (studentData.error.message === "DB_ERROR_MESSAGE_401") {
                    //Student not found.
                    errors.email =
                      "Estudiante no registrado. Por favor, introduzca un email válido.";
                    inputEmailRef.current.focus();
                  } else {
                    errors.general =
                      "Se ha producido una excepción al comprobar el email del estudiante en la Base de datos: " +
                      studentData.error.message;
                    generalDivRef.current.focus();
                  }
                  setErrorMessages(errors);
                } else {
                  //The student is stored in the database.
                  //Store the enrollment.
                  axios
                    .post(
                      process.env.REACT_APP_API_BASE_URL +
                        "activities/activity/student/new",
                      {
                        ActivityCode: activityCode,
                        StudentEmail: email,
                        ActivityHash: activityHash,
                        StudentHash: studentHash,
                        StudentAge: age,
                        StudentGender: gender,
                        StudentCurrentZip: courseZip,
                        StudentFamilyZip: homeZip,
                        StudentStudy: currentStudy,
                        StudentCourse: currentCourse,
                        StudentSimilarActivities: similarActivities,
                        StudentUCMAssociations: ucmAssociationIds,
                        StudentOtherAssociations: otherAssociationsIds,
                      },
                      {
                        headers: { "content-type": "text/json" },
                      }
                    )
                    .then(async (enrollmentRes) => {
                      console.log(
                        "Results from axios (enrollment): ",
                        enrollmentRes
                      );
                      const enrollmentData = enrollmentRes.data;
                      console.log("Enrollment data: ", enrollmentData);
                      if (enrollmentData.error !== null) {
                        //The student is enrolled yet in this activity.
                        setLoading(false);
                        setErrorMessages({});
                        if (
                          enrollmentData.error.message ===
                          "DB_ERROR_MESSAGE_402"
                        ) {
                          errors.general =
                            "El estudiante ya se encuentra registrado en esta actividad.";
                        } else {
                          errors.general =
                            "Se ha producido una excepción al comprobar el email del estudiante en la Base de datos: " +
                            enrollmentData.error.message;
                        }
                        generalDivRef.current.focus();
                        setErrorMessages(errors);
                      } else {
                        try {
                          //Todo va bien
                          await enrollment.methods
                            .createEnrollment(activityHash, studentHash)
                            .send({
                              from: currentAccount,
                              gas: "2000000",
                            });

                          //Checking the blockchain
                          const totalEnrollments = await enrollment.methods
                            .getEnrollmentCount()
                            .call();
                          console.log("Total enrollment: ", totalEnrollments);
                          setLoading(false);
                          setSuccessNewEnrollment(true);
                          generalDivRef.current.focus();
                        } catch (error) {
                          //It executes when user rejects the transaction, for example.
                          //The student is stored in the database.
                          //Store the enrollment.
                          axios
                            .post(
                              process.env.REACT_APP_API_BASE_URL +
                                "activities/activity/student/delete",
                              {
                                ActivityCode: activityCode,
                                StudentEmail: email,
                              },
                              {
                                headers: { "content-type": "text/json" },
                              }
                            )
                            .then((enrollmentDeletionRes) => {
                              console.log(
                                "Results from axios (enrollment): ",
                                enrollmentDeletionRes
                              );
                              const enrollmentDeletionData =
                                enrollmentDeletionRes.data;
                              console.log(
                                "Enrollment data: ",
                                enrollmentDeletionData
                              );
                              if (enrollmentDeletionData.error !== null) {
                                //The student is enrolled yet in this activity.
                                setLoading(false);
                                errors.general =
                                  "Se ha producido una excepción al itentar eliminar la partipación en la Base de datos por fallo en la Blockchain: " +
                                  enrollmentDeletionData.error.message;
                                generalDivRef.current.focus();
                                setErrorMessages(errors);
                              } else {
                                //The enrollment has been deleted
                                setLoading(false);
                                console.error(
                                  "EXCEPTION ERROR - New enrollment MetaMask Error (saveEnrollmentOKDialogHandler): " +
                                    error.message
                                );
                                setErrorMessages({});
                                errors.general =
                                  "Se ha producido una excepción al intentar grabar la participación en la Blockchain: " +
                                  error.message;
                                generalDivRef.current.focus();
                                setErrorMessages(errors);
                              }
                            });
                        }
                      }
                    });
                }
              });
          }
        });
    } catch (error) {
      setLoading(false);
      console.error(
        "EXCEPTION ERROR - New enrollment MetaMask Error (saveEnrollmentOKDialogHandler): " +
          error.message
      );
      setErrorMessages({});
      errors.general =
        "Se ha producido una excepción: " +
        error.message +
        " :: Para poder utilizar esta aplicación se requiere un conexión a la red de pruebas Rinkeby desde MetaMask.";
      generalDivRef.current.focus();
      setErrorMessages(errors);
    }
  };

  const saveEnrollmentCancelDialogHandler = () => {
    console.log("The enrollment will not be stored in the blockchain.");
    setSaveBlockchain(false);
    setErrorMessages({});
    setSuccessNewEnrollment(false);
  };

  const resetNewEnrollmentFormFields = () => {
    setActivityCode("");
    setEmail("");
    setAge("");
    setGender("female");
    setHomeZip("");
    setCourseZip("");
    setCurrentFaculty("faculty00");
    setCurrentStudy("study00");
    setCurrentCourse("course00");
    setMemberUCMAssociation(false);
    setCurrentUCMAssocFaculty("ucmAssocFaculty00");
    setCurrentUCMAssociation("ucmAssoc00");
    setSelectedUCMAssocs([]);
    setMemberOtherAssociation(false);
    setCurrentOtherAssociation("otherAssoc00");
    setSelectedOtherAssocs([]);
    setSimilarActivities(false);
    setSuccessNewEnrollment(false);
  };

  return (
    <>
      <div style={{ marginTop: "30px", marginBottom: "30px", float: "right" }}>
        <Tooltip title="Registrar inscripción" arrow>
          <span>
            <Fab
              color="primary"
              aria-label="add"
              disabled={!successNewEnrollment}
              onClick={addEnrollmentButtonHandler}
            >
              <AddIcon />
            </Fab>
          </span>
        </Tooltip>
      </div>
      <Typography variant="h5" className={styles.title} noWrap>
        Registrar inscripción en actividad UCM
      </Typography>
      {!!errorMessages.metamask ? (
        <Alert variant="filled" severity="error" style={{ marginTop: "50px" }}>
          {errorMessages.metamask}
        </Alert>
      ) : (
        <form className={styles.NewEnrollment} onSubmit={onSubmit}>
          <Typography variant="h6" className={styles.title} noWrap>
            Datos de la actividad
          </Typography>
          <br />
          <div className={styles.divForm}>
            <TextField
              id="txtHomeZip"
              label="Cód. Actividad"
              placeholder="Código identificativo..."
              variant="outlined"
              style={{ marginRight: "15px" }}
              width="50ch"
              error={!!errorMessages.activityCode}
              helperText={errorMessages.activityCode}
              value={activityCode}
              onChange={activityCodeHandler}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              inputRef={inputActivityCodeRef}
            />
          </div>
          <br />
          <Divider />
          <Typography variant="h6" className={styles.title} noWrap>
            Datos del estudiante
          </Typography>
          <br />
          <div className={styles.divForm}>
            <TextField
              id="txtEmail"
              label="email"
              variant="outlined"
              style={{ marginRight: "15px" }}
              type="email"
              error={!!errorMessages.email}
              helperText={errorMessages.email}
              value={email}
              onChange={emailHandler}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              inputRef={inputEmailRef}
              placeholder="user@ucm.es"
            />
            <TextField
              id="inputAge"
              label="Edad"
              variant="outlined"
              style={{ marginRight: "20px" }}
              inputProps={{
                type: "number",
                min: 18,
                max: 99,
              }}
              error={!!errorMessages.age}
              helperText={errorMessages.age}
              value={age}
              onChange={ageHandler}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              inputRef={inputAgeRef}
            />
          </div>
          <div className={styles.divForm}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Género</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="studentGender"
                value={gender}
                onChange={genderHandler}
                row
              >
                <FormControlLabel
                  value="FE"
                  control={<Radio className={styles.radio} />}
                  label="Mujer"
                />
                <FormControlLabel
                  value="MA"
                  control={<Radio className={styles.radio} />}
                  label="Hombre"
                />
                <FormControlLabel
                  value="NB"
                  control={<Radio className={styles.radio} />}
                  label="No binario"
                />
                <FormControlLabel
                  value="NC"
                  control={<Radio className={styles.radio} />}
                  label="Otro"
                />
              </RadioGroup>
            </FormControl>{" "}
          </div>
          <div className={styles.divForm}>
            <TextField
              id="selectFaculty"
              select
              label="Facultad"
              variant="outlined"
              style={{ marginRight: "15px" }}
              value={currentFaculty}
              onChange={facultySelectHandler}
              error={!!errorMessages.faculty}
              helperText={errorMessages.faculty}
              inputRef={inputFacultyRef}
            >
              <MenuItem key="faculty00" value="faculty00">
                Seleccionar una Facultad...
              </MenuItem>
              {faculties.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="selectStudy"
              select
              label="Titulación"
              variant="outlined"
              value={currentStudy}
              onChange={studySelectHandler}
              disabled={currentFaculty === "faculty00"}
              style={{ marginRight: "15px" }}
              error={!!errorMessages.study}
              helperText={errorMessages.study}
              inputRef={inputStudyRef}
            >
              <MenuItem key="study00" value="study00">
                Seleccionar titulación...
              </MenuItem>
              {studies.map((option) =>
                option.faculty === currentFaculty ? (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ) : null
              )}
            </TextField>
            <TextField
              id="selectCourse"
              select
              label="Curso"
              variant="outlined"
              disabled={
                currentFaculty === "faculty00" || currentStudy === "study00"
              }
              value={currentCourse}
              onChange={courseSelectHandler}
              error={!!errorMessages.course}
              helperText={errorMessages.course}
              inputRef={inputCourseRef}
            >
              <MenuItem key="course00" value="course00">
                Seleccionar curso...
              </MenuItem>
              {courses.map((option) =>
                option.study === currentStudy ? (
                  <MenuItem key={option.id} value={option.course}>
                    {option.name}
                  </MenuItem>
                ) : null
              )}
            </TextField>
          </div>
          <div className={styles.divForm}>
            <TextField
              id="txtHomeZip"
              label="Domicilio familiar"
              placeholder="Código postal..."
              variant="outlined"
              /** Equivalent to className = {styles.textField} **/
              style={{ marginRight: "15px" }}
              width="50ch"
              error={!!errorMessages.homeZip}
              helperText={errorMessages.homeZip}
              value={homeZip}
              onChange={homeZipHandler}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              inputRef={inputHomeZipRef}
            />
            <TextField
              id="txtCourseZip"
              label="Domicilio durante curso académico"
              placeholder="Código postal..."
              variant="outlined"
              style={{ width: "300px" }}
              width="20ch"
              error={!!errorMessages.courseZip}
              helperText={errorMessages.courseZip}
              value={courseZip}
              onChange={courseZipHandler}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              inputRef={inputCourseZipRef}
            />
          </div>
          <div className={styles.divForm}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={similarActivities}
                  onChange={handleCheckBoxSimilarActivitiesChange}
                  inputProps={{ "aria-label": "controlled" }}
                  className={styles.checkbox}
                />
              }
              label="Ha participado en actividades de temática similar."
            />
          </div>
          <div className={styles.divForm}>
            <FormLabel component="legend">Pertenencia a asociaciones</FormLabel>{" "}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={memberUCMAssociation}
                    onChange={handleCheckBoxUCMAssocChange}
                    inputProps={{ "aria-label": "controlled" }}
                    className={styles.checkbox}
                  />
                }
                label="UCM"
                style={{ marginRight: "15px", marginBottom: "20px" }}
              />
              <div className={styles.divForm}>
                <TextField
                  id="selectUCMAssocFaculty"
                  select
                  label="Facultad"
                  variant="outlined"
                  style={{ marginRight: "15px" }}
                  value={currentUCMAssocFaculty}
                  onChange={ucmAssocFacultySelectHandler}
                  error={!!errorMessages.ucmAssocFaculty}
                  helperText={errorMessages.ucmAssocFaculty}
                  inputRef={inputUCMAssocFacultyRef}
                  disabled={!memberUCMAssociation}
                >
                  <MenuItem key="ucmAssocFaculty00" value="ucmAssocFaculty00">
                    Seleccionar una Facultad...
                  </MenuItem>
                  {faculties.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="selectUCMAssociation"
                  select
                  label="Asociación UCM"
                  variant="outlined"
                  value={currentUCMAssociation}
                  onChange={ucmAssociationSelectHandler}
                  disabled={currentUCMAssocFaculty === "ucmAssocFaculty00"}
                  style={{ marginRight: "15px" }}
                  error={!!errorMessages.ucmAssociation}
                  helperText={errorMessages.ucmAssociation}
                  inputRef={inputUCMAssociationRef}
                >
                  <MenuItem key="ucmAssoc00" value="ucmAssoc00">
                    Seleccionar asociación...
                  </MenuItem>
                  {ucmAssociations.map((ucmoption) =>
                    ucmoption.faculty === currentUCMAssocFaculty ? (
                      <MenuItem
                        key={ucmoption.id}
                        value={ucmoption.id}
                        data-name={ucmoption.name}
                      >
                        {ucmoption.name}
                      </MenuItem>
                    ) : null
                  )}
                </TextField>
              </div>
              <div>
                <EnrollmentAssociations
                  associations={selectedUCMAssocs}
                  clicked={deleteUCMAssociationHandler}
                  canDelete={true}
                />
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={memberOtherAssociation}
                    onChange={handleCheckBoxOtherAssocChange}
                    inputProps={{ "aria-label": "controlled" }}
                    className={styles.checkbox}
                  />
                }
                label="Externas a UCM"
              />
              <div className={styles.divForm}>
                <TextField
                  id="selectOtherAssociation"
                  select
                  label="Asociación externa a UCM"
                  variant="outlined"
                  value={currentOtherAssociation}
                  onChange={otherAssociationSelectHandler}
                  disabled={!memberOtherAssociation}
                  style={{ marginRight: "15px" }}
                  error={!!errorMessages.otherAssociation}
                  helperText={errorMessages.otherAssociation}
                  inputRef={inputOtherAssociationRef}
                >
                  <MenuItem key="otherAssoc00" value="otherAssoc00">
                    Seleccionar asociación...
                  </MenuItem>
                  {externalAssociations.map((externaloption) => (
                    <MenuItem
                      key={externaloption.id}
                      value={externaloption.id}
                      data-name={externaloption.name}
                    >
                      {externaloption.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div>
                <EnrollmentAssociations
                  associations={selectedOtherAssocs}
                  clicked={deleteOtherAssociationHandler}
                  canDelete={true}
                />
              </div>
            </FormGroup>{" "}
          </div>
          {!!errorMessages.general ? (
            <Alert variant="filled" severity="error">
              {errorMessages.general}
            </Alert>
          ) : null}
          {successNewEnrollment ? (
            <div style={{ marginTop: "20px" }}>
              <Alert
                severity="success"
                variant="filled"
                action={
                  <Tooltip
                    title="Cerrar si se desea registrar una nueva inscripción."
                    arrow
                  >
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setSuccessNewEnrollment(false);
                        resetNewEnrollmentFormFields();
                        inputActivityCodeRef.current.focus();
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                }
              >
                ¡La inscripción se ha registrado correctamente!
              </Alert>
            </div>
          ) : null}
          <div
            className={styles.divButtonForm}
            ref={generalDivRef}
            tabIndex={-1}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={loading ? null : <SaveIcon />}
              type="submit"
              disabled={loading || successNewEnrollment}
            >
              {loading ? (
                <CircularProgress style={{ color: "white" }} size="30px" />
              ) : (
                "Guardar"
              )}
            </Button>
          </div>
          <div className={styles.spacer}> </div>
        </form>
      )}
      {saveBlockchain ? (
        <ConfirmDialog
          confirmPrimaryDialogHandler={saveEnrollmentOKDialogHandler}
          confirmSecondaryDialogHandler={saveEnrollmentCancelDialogHandler}
          dialogTitle="¿Continuar?"
          dialogDescription="La inscripción se va almacenar en la red de pruebas Rinkeby de Ethereum."
          primaryButton="Guardar"
          secondaryButton="Cancelar"
        />
      ) : null}
    </>
  );
}

export default NewEnrollment;
