const { app, BrowserWindow } = require('electron');

function createWindow() {
  // 브라우저 창 생성
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 생성한 브라우저 창에 `index.html` 로드
  win.loadFile('index.html');

  // 개발자 도구 열기
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// 모든 윈도우가 닫혀도 앱 실행 상태 유지(macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// macOS에서, 앱 윈도우가 열려 있지 않다면 새로운 윈도우 열기
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
