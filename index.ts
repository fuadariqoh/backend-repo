import app from "./core/app";

const PORT = process.env.PORT || 3000;

// allow cors

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
