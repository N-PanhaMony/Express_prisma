import express from 'express';
import postsRouter from './routes/posts.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the posts routes
app.use('/posts', postsRouter);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
