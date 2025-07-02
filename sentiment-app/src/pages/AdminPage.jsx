import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("access");

        // Check if user is staff
        const userCheck = await axios.get(
          "http://localhost:8000/api/user-info/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userCheck.data.is_staff) {
          navigate("/feedback");
          return;
        }

        // If staff, get feedback data
        const res = await axiosInstance.get("feedback/");
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedback or auth:", err);
        navigate("/");
      }
    };

    fetchFeedback();
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        User Feedbacks
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <List>
          {feedbacks.map((f, i) => (
            <React.Fragment key={f.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`Sentiment: ${f.sentiment}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {f.user}
                      </Typography>
                      {` — ${f.comment}`}
                    </>
                  }
                />
              </ListItem>
              {i < feedbacks.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default AdminPage;
