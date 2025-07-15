import express from 'express';
import { Log } from './logger';

const app = express();
app.use(express.json());

app.get('/success', async (req, res) => {
  await Log('backend', 'info', 'handler', 'GET /success called');
  res.send('Success');
});

app.get('/fail', async (req, res) => {
  try {
    throw new Error('Simulated failure');
  } catch (err: any) {
    await Log('backend', 'error', 'handler', 'Failure in /fail', {
      error: err.message,
    });
    res.status(500).send('Error occurred');
  }
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});

