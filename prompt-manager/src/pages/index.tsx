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
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ExpandMore, Delete, Edit, Add } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

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

export default function Home() {
  const [prePrompt, setPrePrompt] = useState("");
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

  const url = "http://localhost:3001/Prompts";

  axios.defaults.headers.post["Content-Type"] =
    "application/json; charset=utf-8";

  const createPrePrompt = async () => {
    try {
      const res = await axios.post(`${url}/createPrePrompt`, {
        question: prePrompt,
      });
      console.log(res);
      setPrePrompts([
        ...prePrompts,
        { id: res.data.id, question: prePrompt, options: [] },
      ]);
      setPrePrompt("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSeverityLevels();
  }, [openSeverityDialog]);

  useEffect(() => {
    getPrePrompts();
  }, [open]);

  useEffect(() => {
    console.log(prePrompt);
  }, [prePrompt]);
  const handlePrePromptChange = (event: { target: { value: any } }) => {
    setPrePrompt(event.target.value);
  };

  useEffect(() => {
    getIncidentResponses();
  }, []);

  const getPrePrompts = async () => {
    const res = await axios.get(`${url}/getPrePrompt`);
    const prompts = res.data.rows;
    for (const prompt of prompts) {
      const options = await getPrePromptOptions(prompt.id);
      prompt.options = options;
    }
    setPrePrompts(prompts);
    console.log("prompts: ", prompts);
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
    console.log(res.data.rows[0]);
    return res.data.rows[0];
  };

  const getPrePromptOptions = async (prePromptId: string) => {
    try {
      const res = await axios.get(`${url}/getPrePromptOptions/${prePromptId}`);
      console.log(res.data.rows.map((row: any) => row.option_text));
      return res.data.rows;
      // return res.data.rows.map((row: any) => row.option_text);
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const createIncidentResponse = async (
    incidentType: string,
    incidentDetails: string
  ) => {
    const res = await axios.post(`${url}/createIncidentResponse`, {
      incidentType: incidentType,
      incidentDetails: incidentDetails,
    });
    console.log(res);
  };

  const getIncidentResponses = async () => {
    const res = await axios.get(`${url}/getIncidentResponses`);
    const responses = res.data;
    console.log(responses);
    for (let response of responses) {
      const prompts = await getPrompts(response.id);
      response.prompts = prompts;
    }
    setIncidentResponses(responses);
    console.log(responses);
  };

  const createPrompt = async (
    severity: string,
    title: string,
    description: string,
    incidentResponseId: string
  ) => {
    const res = await axios.post("/api/createPrompt", {
      severity: severity,
      title: title,
      description: description,
      incidentResponseId: incidentResponseId,
    });
    console.log(res);
  };

  const getPrompts = async (incidentResponseId: string) => {
    const res = await axios.get(`${url}/getPrompts/${incidentResponseId}`);
    console.log(res.data.rows);
    return res.data.rows;
    console.log(res);
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

  const handleCreateOption = async (prePromptId: string) => {
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
          ? { ...prePrompt, options: [...prePrompt.options, option] }
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

  const updatePromptOptions = async (optionId: string) => {
    try {
      const res = await axios.put(`${url}/updatePrePromptOptions/${optionId}`, {
        option_text: optionText,
        severity: severityLevel,
      });
      console.log(res.data);
      return res.data.rows[0];
    } catch (err) {
      console.log(err);
    }
  };

  const getSeverityLevels = async () => {
    const res = await axios.get(`${url}/getSeverityLevel`);
    const levels = res.data.sort((a: SeverityLevel, b: SeverityLevel) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    setSeverityLevels(res.data);
  };

  const handleEditClick = (severityLevel: SeverityLevel) => {
    setCurrentSeverityLevel(severityLevel);
    setMinScore(severityLevel.min_score);
    setMaxScore(severityLevel.max_score);
    console.log(severityLevel);
    setOpenSeverityDialog(true);
  };

  const handleSeverityUpdate = async () => {
    const updatedSeverityLevel = await updateSeverityLevel();
    // You can save the updated severity level here.
    console.log(updatedSeverityLevel);
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
      console.log(res.data);
      return res.data.rows[0];
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Typography variant="h4">
          Cyber-Check Incident Response Prompt & Task Manager
        </Typography>
      </AppBar>

      <Container className={styles.container}>
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h4">Create PrePrompt</Typography>
          <TextField
            id="preprompt"
            label="PrePrompt"
            variant="outlined"
            fullWidth
            multiline
            value={prePrompt}
            onChange={handlePrePromptChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={createPrePrompt}>
                  <Add />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            background: "#f5f5f5",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "5px",
          }}
        >
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="h4">PrePrompts</Typography>
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
                                deletePromptOptions(prePrompt.id, option.id)
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
                          onClick={() => handleClickOpen()}
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
                          onClick={() => handleCreateOption(prePrompt.id)}
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
        <Box>
          
        </Box>
      </Container>
    </>
  );
}
