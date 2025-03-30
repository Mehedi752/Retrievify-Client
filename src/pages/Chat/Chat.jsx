import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useSocket } from "../../provider/SocketProvider";
import { useSearchParams } from "react-router-dom";

const Chat = () => {
  const socket = useSocket();
  const [searchParams] = useSearchParams();

  // Get the current user and target user from the URL search params
  const currentUser = searchParams.get("currentUser") || "Guest";
  const targetUser = searchParams.get("targetUser") || "";

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socketID, setSocketId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      socket.emit("register", currentUser);
      console.log("Connected with socket ID:", socket.id);
    });

    const handlePrivateMessage = (data) => {
      console.log("Received private message:", data);
      setMessages((prev) => [...prev, data]);
    };

    socket.on("private-message", handlePrivateMessage);

    return () => {
      socket.off("private-message", handlePrivateMessage);
    };
  }, [socket, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetUser) {
      alert("Select a user to chat with!");
      return;
    }
    socket.emit("private-message", {
      toUser: targetUser,
      message,
      fromUser: currentUser,
    });

    setMessages((prev) => [...prev, { fromUser: currentUser, message }]);
    setMessage("");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 500 }} />
      <Typography variant="h6">Socket ID: {socketID}</Typography>
      <Typography variant="h6">Chat with {targetUser || "No user selected"}</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack spacing={2} sx={{ mt: 2 }}>
        {messages.map((msg, i) => (
          <Typography key={i} variant="body1">
            {msg.fromUser === currentUser ? "Me: " : `${msg.fromUser}: `} {msg.message}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default Chat;
