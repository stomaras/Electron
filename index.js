const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { BrowserWindow, ipcMain } = require('electron');

const { app } = electron;

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    mainWindow.loadURL(`file:\\${__dirname}\\index.html`);
});

// second argument is going to execute whenever the message is received from the MainWindow.
ipcMain.on('video:submit', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        console.log('Video duration is:', metadata.format.duration);
    });
});