import express from 'express';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the posts routes

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/tags', tagRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
