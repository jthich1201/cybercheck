import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Button,
  List,
  ListItemText,
  TextField,
  Typography,
  Container,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  styled,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ExpandMore, Delete, Edit, Add } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";

type PrePrompt = {
  id: string;
  question: string;
  options: PrePromptOptions[];
};

type PrePromptOptions = {
  id: string;
  option_text: string;
  pre_prompt_id: string;
  severity_level: string;
};

type SeverityLevel = {
  id: string;
  name: string;
  min_score: string;
  max_score: string;
};

type IncidentResponse = {
  id: string;
  incident_type: string;
  incident_details: string;
  prompts: Prompt[];
};

type Prompt = {
  id: string;
  severity: string;
  title: string;
  description: string;
  incident_response_id: string;
};

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  "& .MuiAccordionSummary-content": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: theme.spacing(2),
  },
  "& .MuiIconButton-root": {
    marginLeft: theme.spacing(1),
  },
  "& .MuiBox-root": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
}));

export default function Home() {
  const [prePromptQuestion, setPrePromptQuestion] = useState("");
  const [prePrompts, setPrePrompts] = useState<PrePrompt[]>([]);
  const [open, setOpen] = useState(false);
  const [openSeverityDialog, setOpenSeverityDialog] = useState(false);
  const [optionText, setOptionText] = useState("");
  const [severityLevels, setSeverityLevels] = useState<SeverityLevel[]>([]);
  const [severityLevel, setSeverityLevel] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [currentSeverityLevel, setCurrentSeverityLevel] =
    useState<SeverityLevel | null>();
  const [incidentResponses, setIncidentResponses] = useState<
    IncidentResponse[]
  >([]);
  const [prePromptDialog, setPrePromptDialog] = useState(false);
  const [prePromptId, setPrePromptId] = useState("");
  const [openPrePromptEditDialog, setOpenPrePromptEditDialog] = useState(false);
  const [incidentType, setIncidentType] = useState("");
  const [incidentDetails, setIncidentDetails] = useState("");
  const [newIncidentDialog, setNewIncidentDialog] = useState(false);
  const [updateIncidentDialog, setUpdateIncidentDialog] = useState(false);
  const [promptDialog, setPromptDialog] = useState(false);
  const [promptTitle, setPromptTitle] = useState("");
  const [promptDescription, setPromptDescription] = useState("");
  const [promptSeverity, setPromptSeverity] = useState("");
  const [updatePromptDialog, setUpdatePromptDialog] = useState(false);
  const [promptIncidentId, setPromptIncidentId] = useState("");

  const url = "http://localhost:3001/Prompts";

  axios.defaults.headers.post["Content-Type"] =
    "application/json; charset=utf-8";

  const createPrePrompt = async () => {
    try {
      const res = await axios.post(`${url}/createPrePrompt`, {
        question: prePromptQuestion,
      });
      setPrePrompts([
        ...prePrompts,
        { id: res.data.id, question: prePromptQuestion, options: [] },
      ]);
      getPrePrompts();
      setPrePromptQuestion("");
      setPrePromptDialog(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSeverityLevels();
  }, [openSeverityDialog]);

  useEffect(() => {
    getPrePrompts();
  }, [open, openPrePromptEditDialog]);

  const handlePrePromptChange = (event: { target: { value: any } }) => {
    setPrePromptQuestion(event.target.value);
  };

  useEffect(() => {
    getIncidentResponses();
  }, []);

  const getPrePrompts = async () => {
    const res = await axios.get(`${url}/getPrePrompt`);
    const prompts = res.data.rows;
    for (const prompt of prompts) {
      const options = await getPrePromptOptions(prompt.id);
      options.sort(
        (a: PrePromptOptions, b: PrePromptOptions) =>
          parseInt(a.severity_level) - parseInt(b.severity_level)
      );
      prompt.options = options;
    }
    setPrePrompts(prompts);
  };

  const handlePrePromptEdit = () => {
    setOpenPrePromptEditDialog(true);
  };

  const handleDeletePrePrompt = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePrePrompt(id).then(() => {
          Swal.fire("Deleted!", "", "success");
        });
      }
    });
  };

  const updatePrePrompt = async (id: string) => {
    try {
      const res = await axios.put(`${url}/updatePrePrompt/${id}`, {
        question: prePromptQuestion,
      });
      setPrePromptQuestion("");
      setOpenPrePromptEditDialog(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePrePrompt = async (id: string) => {
    const res = await axios.delete(`${url}/deletePrePrompt/${id}`);
    setPrePrompts(prePrompts.filter((prePrompt) => prePrompt.id !== id));
  };

  const createPrePromptOptions = async (
    option: string,
    prePromptId: string,
    severity: string
  ) => {
    const res = await axios.post(`${url}/createPrePromptOptions`, {
      prePromptId: prePromptId,
      option_text: option,
      severity: severity,
    });
    return res.data.rows[0];
  };

  const getPrePromptOptions = async (prePromptId: string) => {
    try {
      const res = await axios.get(`${url}/getPrePromptOptions/${prePromptId}`);
      return res.data.rows;
      // return res.data.rows.map((row: any) => row.option_text);
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const createIncidentResponse = async () => {
    try {
      const res = await axios.post(`${url}/createIncidentResponse`, {
        incidentType: incidentType,
        incidentDetails: incidentDetails,
      });
      setNewIncidentDialog(false);
      getIncidentResponses();
    } catch (err) {
      console.log(err);
    }
  };

  const getIncidentResponses = async () => {
    const res = await axios.get(`${url}/getIncidentResponses`);
    const responses = res.data;
    for (let response of responses) {
      const prompts = await getPrompts(response.id);
      response.prompts = prompts;
    }
    setIncidentResponses(responses);
    console.log(responses);
  };

  const updateIncidentResponse = async (id: string) => {
    try {
      const res = await axios.put(`${url}/updateIncidentResponse/${id}`, {
        incidentType: incidentType,
        incidentDetails: incidentDetails,
      });
      setIncidentType("");
      setIncidentDetails("");
      setUpdateIncidentDialog(false);
      getIncidentResponses();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteIncidentResponse = async (id: string) => {
    try {
      const res = await axios.delete(`${url}/deleteIncidentResponse/${id}`);
      setIncidentResponses(
        incidentResponses.filter((response) => response.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const createPrompt = async () => {
    const res = await axios.post(`${url}/createPrompt`, {
      severity: promptSeverity,
      title: promptTitle,
      description: promptDescription,
      id: promptIncidentId,
    });
    getIncidentResponses();
    setPromptTitle("");
    setPromptDescription("");
    setPromptSeverity("");
    setPromptDialog(false);
  };

  const getPrompts = async (incidentResponseId: string) => {
    const res = await axios.get(`${url}/getPrompts/${incidentResponseId}`);
    return res.data.rows;
  };

  const updatePrompt = async (id: string) => {
    try {
      const res = await axios.put(`${url}/updatePrompt/${id}`, {
        severity: promptSeverity,
        title: promptTitle,
        description: promptDescription,
      });
      setPromptTitle("");
      setPromptDescription("");
      setPromptSeverity("");
      setUpdatePromptDialog(false);
      getIncidentResponses();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePrompt = async (promptId: string) => {
    const res = await axios.delete(`${url}/deletePrompt/${promptId}`);
    getIncidentResponses();
  };

  const handleClickOpen = (optionId?: string) => {
    if (optionId) {
      setSelectedOptionId(optionId);
      const selectedOption = prePrompts
        .flatMap((prePrompt) => prePrompt.options)
        .find((option) => option.id === optionId);
      if (!selectedOption) return;
      setOptionText(selectedOption.option_text);
      setSeverityLevel(selectedOption.severity_level);
    } else {
      setSelectedOptionId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOptionId(null);
    setOptionText("");
    setSeverityLevel("");
  };

  const handleCreateOption = async () => {
    var option: PrePromptOptions;
    if (selectedOptionId) {
      option = await updatePromptOptions(selectedOptionId);
    } else {
      option = await createPrePromptOptions(
        optionText,
        prePromptId,
        severityLevel
      );
    }
    setPrePrompts((prePrompts) =>
      prePrompts.map((prePrompt) =>
        prePrompt.id === prePromptId
          ? {
              ...prePrompt,
              options: [...prePrompt.options, option].sort(
                (a, b) =>
                  parseInt(a.severity_level) - parseInt(b.severity_level)
              ),
            }
          : prePrompt
      )
    );
    handleClose();
  };

  const deletePromptOptions = async (prePromptId: string, optionId: string) => {
    try {
      await axios.delete(`${url}/deletePrePromptOptions/${optionId}`);
      setPrePrompts((prePrompts) =>
        prePrompts.map((prePrompt) =>
          prePrompt.id === prePromptId
            ? {
                ...prePrompt,
                options: prePrompt.options.filter(
                  (option) => option.id !== optionId
                ),
              }
            : prePrompt
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePrePromptOption = (
    prePromptId: string,
    optionId: string
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePromptOptions(prePromptId, optionId);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const updatePromptOptions = async (optionId: string) => {
    try {
      const res = await axios.put(`${url}/updatePrePromptOptions/${optionId}`, {
        option_text: optionText,
        severity: severityLevel,
      });
      return res.data.rows[0];
    } catch (err) {
      console.log(err);
    }
  };

  const getSeverityLevels = async () => {
    const res = await axios.get(`${url}/getSeverityLevel`);
    res.data.sort((a: SeverityLevel, b: SeverityLevel) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    setSeverityLevels(res.data);
  };

  const handleEditClick = (severityLevel: SeverityLevel) => {
    setCurrentSeverityLevel(severityLevel);
    setMinScore(severityLevel.min_score);
    setMaxScore(severityLevel.max_score);
    setOpenSeverityDialog(true);
  };

  const handleSeverityUpdate = async () => {
    const updatedSeverityLevel = await updateSeverityLevel();
    // You can save the updated severity level here.
    setOpenSeverityDialog(false);
    setCurrentSeverityLevel(null);
  };

  const updateSeverityLevel = async () => {
    if (!currentSeverityLevel) return;
    try {
      const res = await axios.put(
        `${url}/updateSeverityLevel/${currentSeverityLevel.id}`,
        {
          min: minScore,
          max: maxScore,
        }
      );
      return res.data.rows[0];
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrePromptDialog = () => {
    setPrePromptQuestion("");
    setPrePromptDialog(true);
  };

  const handleNewIncident = () => {
    setIncidentType("");
    setIncidentDetails("");
    setNewIncidentDialog(true);
  };

  const handleDeleteIncidentResponse = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteIncidentResponse(id).then(() => {
          Swal.fire("Deleted!", "", "success");
        });
      }
    });
  };

  const handleDeletePrompt = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePrompt(id).then(() => {
          Swal.fire("Deleted!", "", "success");
        });
      }
    });
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "#b3b1b1",
          color: "#000",
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4">
          Cyber-Check Incident Response Prompt & Task Manager
        </Typography>
      </AppBar>

      <Container className={styles.container}>
        <Box
          sx={{
            background: "#f5f5f5",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "5px",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h4">PrePrompts</Typography>
              <IconButton aria-label="Add" onClick={handlePrePromptDialog}>
                <Add />
              </IconButton>
              <Dialog
                open={prePromptDialog}
                onClose={() => setPrePromptDialog(false)}
                fullWidth={true}
              >
                <DialogTitle>Create PrePrompt</DialogTitle>
                <DialogContent>
                  <Box sx={{ margin: "10px" }}>
                    <TextField
                      id="preprompt"
                      label="PrePrompt"
                      variant="outlined"
                      fullWidth
                      multiline
                      value={prePromptQuestion}
                      onChange={handlePrePromptChange}
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setPrePromptDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => createPrePrompt()}>Save</Button>
                </DialogActions>
              </Dialog>
            </Box>
            <Typography variant="h5" sx={{ marginTop: "10px" }}>
              Severity Levels
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Min Score</TableCell>
                    <TableCell>Max Score</TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {severityLevels.map((severityLevel) => (
                    <TableRow
                      key={severityLevel.id}
                      sx={{
                        backgroundColor:
                          severityLevel.name === "low"
                            ? "#00b300"
                            : severityLevel.name === "medium"
                            ? "#ff9933"
                            : "#ff3333",
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: "#fff" }}
                      >
                        {severityLevel.name}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {severityLevel.min_score}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {severityLevel.max_score}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEditClick(severityLevel)}
                        >
                          <Edit sx={{ color: "#000" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Dialog
              open={openSeverityDialog}
              onClose={() => setOpenSeverityDialog(false)}
              fullWidth={true}
            >
              <DialogTitle>Edit Severity Level</DialogTitle>
              <DialogContent>
                <Box sx={{ margin: "10px" }}>
                  <TextField
                    label="Min Score"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    fullWidth
                  />
                </Box>
                <Box sx={{ margin: "10px" }}>
                  <TextField
                    label="Max Score"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    fullWidth
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenSeverityDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSeverityUpdate()}>Save</Button>
              </DialogActions>
            </Dialog>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Typography variant="h5">
                PrePrompt Option Severity Levels:
              </Typography>
              <Box sx={{ display: "flex" }}>
                {[...Array(11)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      padding: "5px",
                      margin: "0 5px",
                      backgroundColor:
                        i > 7 ? "#ff3333" : i > 3 ? "#ff9933" : "#00b300",
                      borderRadius: "5px",
                      color: "#fff",
                      fontFamily: "Roboto",
                    }}
                  >
                    {i}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <List>
            {prePrompts.map((prePrompt: any, index: number) => (
              <Accordion key={prePrompt.id}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <ListItemText
                    primary={`${index + 1}. ${prePrompt.question}`}
                  />
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setPrePromptQuestion(prePrompt.question);
                      handlePrePromptEdit();
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeletePrePrompt(prePrompt.id)}
                  >
                    <Delete />
                  </IconButton>
                  <Dialog
                    open={openPrePromptEditDialog}
                    onClose={() => setOpenPrePromptEditDialog(false)}
                    fullWidth={true}
                  >
                    <DialogTitle>Edit PrePrompt</DialogTitle>
                    <DialogContent>
                      <Box sx={{ margin: "10px" }}>
                        <TextField
                          id="preprompt"
                          label="PrePrompt"
                          variant="outlined"
                          fullWidth
                          multiline
                          value={prePromptQuestion}
                          onChange={(e) => setPrePromptQuestion(e.target.value)}
                        />
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenPrePromptEditDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => updatePrePrompt(prePrompt.id)}>
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={2}>
                      <Typography variant="subtitle1">
                        Severity Level
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">Option</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="subtitle1">Edit</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="subtitle1">Delete</Typography>
                    </Grid>
                    {prePrompt.options.map(
                      (option: PrePromptOptions, index: number) => (
                        <Fragment key={option.id}>
                          <Grid item xs={2}>
                            <Typography variant="body1">
                              {option.severity_level}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body1">
                              {option.option_text}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleClickOpen(option.id)}
                            >
                              <Edit />
                            </IconButton>
                          </Grid>
                          <Grid item xs={2}>
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                handleDeletePrePromptOption(
                                  prePrompt.id,
                                  option.id
                                )
                              }
                            >
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Fragment>
                      )
                    )}
                    {prePrompt.options.length < 4 && (
                      <Grid item xs={12}>
                        <IconButton
                          aria-label="add"
                          onClick={() => {
                            setPrePromptId(prePrompt.id);
                            handleClickOpen();
                          }}
                        >
                          <Add />
                          <Typography variant="body1">Add Option</Typography>
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                  <Container>
                    <Dialog open={open} onClose={handleClose} fullWidth={true}>
                      <DialogTitle>Create PrePrompt Option</DialogTitle>
                      <DialogContent>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                        >
                          <Box mb={2}>
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Option Text"
                              fullWidth
                              value={optionText}
                              onChange={(e) => setOptionText(e.target.value)}
                            />
                          </Box>
                          <Box>
                            <FormControl fullWidth>
                              <InputLabel id="severity-level-select-label">
                                Severity Level
                              </InputLabel>
                              <Select
                                labelId="severity-level-select-label"
                                id="severity-level-select"
                                label="Severity Level"
                                value={severityLevel}
                                onChange={(e) =>
                                  setSeverityLevel(e.target.value)
                                }
                              >
                                {[...Array(11)].map((_, i) => (
                                  <MenuItem key={i} value={i}>
                                    {i}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                          onClick={() => handleCreateOption()}
                          disabled={!optionText}
                        >
                          {selectedOptionId ? "Update Option" : "Create Option"}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Container>
                </AccordionDetails>
              </Accordion>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            marginTop: "20px",
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Incidents</Typography>
            <IconButton aria-label="Add" onClick={handleNewIncident}>
              <Add />
            </IconButton>
            <Dialog
              open={newIncidentDialog}
              onClose={() => setNewIncidentDialog(false)}
              fullWidth={true}
            >
              <DialogTitle>Create Incident</DialogTitle>
              <DialogContent>
                <Box sx={{ margin: "10px" }}>
                  <TextField
                    id="incidentType"
                    label="Incident Type"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                  />
                </Box>
                <Box sx={{ margin: "10px" }}>
                  <TextField
                    id="incidentDetails"
                    label="Incident Details"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={incidentDetails}
                    onChange={(e) => setIncidentDetails(e.target.value)}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setNewIncidentDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => createIncidentResponse()}>Save</Button>
              </DialogActions>
            </Dialog>
          </Box>
          <List>
            {incidentResponses.map(
              (incidentResponse: IncidentResponse, index: number) => (
                <Accordion key={incidentResponse.id}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <ListItemText
                      primary={`${index + 1}. ${
                        incidentResponse.incident_type
                      }`}
                      secondary={incidentResponse.incident_details}
                    />
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setIncidentType(incidentResponse.incident_type);
                        setIncidentDetails(incidentResponse.incident_details);
                        setUpdateIncidentDialog(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        handleDeleteIncidentResponse(incidentResponse.id)
                      }
                    >
                      <Delete />
                    </IconButton>
                    <Dialog
                      open={updateIncidentDialog}
                      onClose={() => setUpdateIncidentDialog(false)}
                      fullWidth={true}
                    >
                      <DialogTitle>Edit Incident</DialogTitle>
                      <DialogContent>
                        <Box sx={{ margin: "10px" }}>
                          <TextField
                            id="incidentType"
                            label="Incident Type"
                            variant="outlined"
                            fullWidth
                            multiline
                            value={incidentType}
                            onChange={(e) => setIncidentType(e.target.value)}
                          />
                        </Box>
                        <Box sx={{ margin: "10px" }}>
                          <TextField
                            id="incidentDetails"
                            label="Incident Details"
                            variant="outlined"
                            fullWidth
                            multiline
                            value={incidentDetails}
                            onChange={(e) => setIncidentDetails(e.target.value)}
                          />
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setUpdateIncidentDialog(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() =>
                            updateIncidentResponse(incidentResponse.id)
                          }
                        >
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1}>
                      {["low", "medium", "high"].map((severity) => (
                        <Accordion
                          key={severity}
                          style={{ margin: "10px 0", width: "100%" }}
                        >
                          <CustomAccordionSummary
                            id="accordionSummary"
                            expandIcon={<ExpandMore />}
                            style={{
                              backgroundColor:
                                severity === "low"
                                  ? "#00b300"
                                  : severity === "medium"
                                  ? "#ff9933"
                                  : "#ff3333",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>{severity}</Typography>
                              <IconButton
                                aria-label="add"
                                onClick={() => {
                                  setPromptTitle("");
                                  setPromptDescription("");
                                  setPromptSeverity(severity);
                                  setPromptIncidentId(incidentResponse.id);
                                  setPromptDialog(true);
                                }}
                              >
                                <Add />
                              </IconButton>
                              <Dialog
                                open={promptDialog}
                                onClose={() => setPromptDialog(false)}
                                fullWidth={true}
                              >
                                <DialogTitle>Create Task</DialogTitle>
                                <DialogContent>
                                  <Box sx={{ margin: "10px" }}>
                                    <TextField
                                      id="promptTitle"
                                      label="Task Title"
                                      variant="outlined"
                                      fullWidth
                                      multiline
                                      value={promptTitle}
                                      onChange={(e) =>
                                        setPromptTitle(e.target.value)
                                      }
                                    />
                                  </Box>
                                  <Box sx={{ margin: "10px" }}>
                                    <TextField
                                      id="promptDescription"
                                      label="Task Description"
                                      variant="outlined"
                                      fullWidth
                                      multiline
                                      value={promptDescription}
                                      onChange={(e) =>
                                        setPromptDescription(e.target.value)
                                      }
                                    />
                                  </Box>
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    onClick={() => setPromptDialog(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      createPrompt();
                                    }}
                                  >
                                    Save
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </Box>
                          </CustomAccordionSummary>
                          <AccordionDetails
                            style={{
                              display: "block",
                              width: "100%",
                              margin: "0",
                            }}
                          >
                            {incidentResponse.prompts
                              .filter((prompt) => prompt.severity === severity)
                              .map((prompt) => (
                                <Box
                                  key={prompt.id}
                                  style={{
                                    margin: "10px 0",
                                    display: "flex",
                                  }}
                                >
                                  <Box
                                    style={{
                                      flexGrow: 1,
                                      paddingRight: "10px",
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <Typography
                                      variant="h6"
                                      style={{ marginBottom: "5px" }}
                                    >
                                      {prompt.title}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      style={{ flexGrow: 1 }}
                                    >
                                      {prompt.description}
                                    </Typography>
                                  </Box>
                                  <Box
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <IconButton
                                      aria-label="edit prompt"
                                      onClick={() => {
                                        setPromptSeverity(prompt.severity);
                                        setPromptTitle(prompt.title);
                                        setPromptDescription(
                                          prompt.description
                                        );
                                        setUpdatePromptDialog(true);
                                      }}
                                    >
                                      <Edit />
                                    </IconButton>
                                    <IconButton
                                      aria-label="delete prompt"
                                      onClick={() =>
                                        handleDeletePrompt(prompt.id)
                                      }
                                    >
                                      <Delete />
                                    </IconButton>
                                    <Dialog
                                      open={updatePromptDialog}
                                      onClose={() =>
                                        setUpdatePromptDialog(false)
                                      }
                                      fullWidth={true}
                                    >
                                      <DialogTitle>Edit Task</DialogTitle>
                                      <DialogContent>
                                        <Box sx={{ margin: "10px" }}>
                                          <TextField
                                            id="promptTitle"
                                            label="Prompt Title"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            value={promptTitle}
                                            onChange={(e) =>
                                              setPromptTitle(e.target.value)
                                            }
                                          />
                                        </Box>
                                        <Box sx={{ margin: "10px" }}>
                                          <TextField
                                            id="promptDescription"
                                            label="Prompt Description"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            value={promptDescription}
                                            onChange={(e) =>
                                              setPromptDescription(
                                                e.target.value
                                              )
                                            }
                                          />
                                        </Box>
                                      </DialogContent>
                                      <DialogActions>
                                        <Button
                                          onClick={() =>
                                            setUpdatePromptDialog(false)
                                          }
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            updatePrompt(prompt.id)
                                          }
                                        >
                                          Save
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                  </Box>
                                </Box>
                              ))}
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )
            )}
          </List>
        </Box>
      </Container>
    </>
  );
}
