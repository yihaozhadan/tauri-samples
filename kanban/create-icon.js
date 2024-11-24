import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a 1024x1024 canvas (large size for better scaling)
const canvas = createCanvas(1024, 1024);
const ctx = canvas.getContext('2d');

// Fill background
ctx.fillStyle = '#2196f3';
ctx.fillRect(0, 0, 1024, 1024);

// Draw a simple 'K' for Kanban
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 600px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('K', 512, 512);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, 'src-tauri', 'icons', 'app-icon.png'), buffer);
