import React, { useState } from "react";
import {
  Container, Typography, TextField, Button, Paper,
} from "@mui/material";
import axiosInstance from "../axiosInstance";

const FeedbackForm = () => {
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }

    try {
      // Optional: For debugging
      console.log("Sending comment:", comment);

      await axiosInstance.post("feedback/", { comment });
      setSubmitted(true);
    } catch (err) {
      if (err.response) {
        // Show backend error clearly
        console.error("Error data:", err.response.data);
        alert("Error: " + JSON.stringify(err.response.data));
      } else {
        console.error(err);
        alert("Submission failed.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, mt: 10 }}>
        <Typography variant="h5" gutterBottom>Submit Feedback</Typography>
        {submitted ? (
          <Typography color="success.main">Feedback submitted! Thank you.</Typography>
        ) : (
          <>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Feedback"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default FeedbackForm;
