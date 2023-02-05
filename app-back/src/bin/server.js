import app from "../app.js";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => process.stdout.write(`> Server on port: ${PORT}`));
