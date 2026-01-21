import express from 'express';
import postsRouter from './routes/posts.js';

const app = express();
app.use(express.json());

// Mount the posts routes
app.use('/posts', postsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
