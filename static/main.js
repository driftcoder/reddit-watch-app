const path = require('path');
const url = require('url');

const electron = require('electron');

const config = require(path.resolve('./static/config.js'));
const constants = require(path.resolve('./static/constants.js'));

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let mainWindow;
let applicationMenu = [{
  label: config.appName,
  submenu: [
    {role: 'quit'},
  ],
}];

if (process.env.NODE_ENV === constants.DEVELOPMENT) {
  applicationMenu.push({
    label: 'Dev',
    submenu: [
      {role: 'reload'},
      {role: 'toggledevtools'},
    ],
  });
}

function createWindow () {
  mainWindow = new BrowserWindow({
    title: config.appName,
    width: config.width,
    height: config.height,
    backgroundColor: config.backgroundColor,
    show: false,
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(applicationMenu));

  mainWindow.loadURL(url.format({
    pathname: path.resolve('./static/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.on('ready-to-show', mainWindow.show);

  mainWindow.on('close', (e) => {
    if (mainWindow) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

app.on('ready', createWindow);

app.on('before-quit', () => {
  mainWindow = null;
});

app.on('activate', () => {
  mainWindow ? mainWindow.show() : createWindow();
});
