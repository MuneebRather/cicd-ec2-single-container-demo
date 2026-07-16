const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

let visitCount = 0;

app.get('/', (req, res) => {
  visitCount++;
  const now = new Date().toISOString();

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CI/CD EC2 Single Container Demo</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <main class="card">
        <h1>🐳 Running in a Docker container on EC2</h1>
        <p>Deployed via GitHub Actions → Docker Hub → EC2</p>
        <div class="stats">
          <p><strong>Server time:</strong> ${now}</p>
          <p><strong>Visits this session:</strong> ${visitCount}</p>
        </div>
        <p class="meta">cicd-ec2-single-container-demo</p>
        <p><strong>-Muneeb Rather</strong></p>
      </main>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});