import app from './src/app.js';
import { connectDB } from './src/db.js';

connectDB();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
