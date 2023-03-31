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
  ListItem,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ExpandMore, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";

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
};

export default function Home() {
  const [prePrompt, setPrePrompt] = useState("");
  const [prePrompts, setPrePrompts] = useState<PrePrompt[]>([]);
  const [open, setOpen] = useState(false);
  const [optionText, setOptionText] = useState("");
  const url = "http://localhost:3001/Prompts";

  axios.defaults.headers.post["Content-Type"] =
    "application/json; charset=utf-8";

  const createPrePrompt = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/Prompts/createPrePrompt",
        {
          question: prePrompt,
        }
      );
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
    getPrePrompts();
  }, [open]);

  useEffect(() => {
    console.log(prePrompt);
  }, [prePrompt]);
  const handlePrePromptChange = (event: { target: { value: any } }) => {
    setPrePrompt(event.target.value);
  };

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
    prePromptId: string
  ) => {
    const res = await axios.post(`${url}/createPrePromptOptions`, {
      prePromptId: prePromptId,
      option_text: option,
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
    const res = await axios.post("/api/createIncidentResponse", {
      incidentType: incidentType,
      incidentDetails: incidentDetails,
    });
    console.log(res);
  };

  const getIncidentResponses = async () => {
    const res = await axios.get("/api/getIncidentResponses");
    console.log(res);
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
    const res = await axios.get(`/api/getPrompts/${incidentResponseId}`);
    console.log(res);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateOption = async (prePromptId: string) => {
    const option = await createPrePromptOptions(optionText, prePromptId);
    setPrePrompts((prePrompts) =>
      prePrompts.map((prePrompt) =>
        prePrompt.id === prePromptId
          ? { ...prePrompt, options: [...prePrompt.options, option] }
          : prePrompt
      )
    );
    setOpen(false);
  };

  const deletePromptOptions = async (prePromptId: string, optionId: string) => {
    try {
      await axios.delete(`${url}/deletePromptOptions/${optionId}`);
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

  return (
    <>
      <AppBar position="static">
        <Typography variant="h4">
          Cyber-Check Incident Response Prompt & Task Manager
        </Typography>
      </AppBar>

      <Container className={styles.container}>
        <Typography variant="h4">Create Preprompt</Typography>
        <TextField
          id="preprompt"
          label="PrePrompt"
          variant="outlined"
          fullWidth
          value={prePrompt}
          onChange={handlePrePromptChange}
        />
        <Button variant="contained" onClick={createPrePrompt}>
          Create PrePrompt
        </Button>

        <Typography variant="h4">PrePrompts</Typography>
        <List>
          {prePrompts.map((prePrompt: any, index: number) => (
            <Accordion key={prePrompt.id}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <ListItemText primary={`${index + 1}. ${prePrompt.question}`} />
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {prePrompt.options.map((option: PrePromptOptions) => (
                    <ListItem key={option.id}>
                      <ListItemIcon>
                        {String.fromCharCode(97 + index)}
                      </ListItemIcon>
                      <ListItemText primary={option.option_text} />
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          deletePromptOptions(prePrompt.id, option.id)
                        }
                      >
                        <Delete />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
                {prePrompt.options.length < 4 && (
                  <Button variant="contained" onClick={handleClickOpen}>
                    Create PrePromptOptions
                  </Button>
                )}
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Create PrePrompt Option</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Option Text"
                      fullWidth
                      value={optionText}
                      onChange={(e) => setOptionText(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      onClick={() => handleCreateOption(prePrompt.id)}
                      disabled={!optionText}
                    >
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </Container>
    </>
  );
}
