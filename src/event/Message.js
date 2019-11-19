// class Message {
//     constructor({app, win, ipcMain, electron}){
//         this.app = app;
//         this.win = win;
//         this.ipcMain = ipcMain;
//         this.electron = electron;
//     }


//     listening(){
//         this.ipcMain.on('asynchronous-message', function(event, arg) {
//             console.log("getmessage:"+arg); // prints "ping"
//             win.webContents.send('asynchronous-message', '信息返回哈哈哈哈');
//         });
//     }
// }

// export default Message;
const message = {
    listening : function(app, win, ipcMain, electron){
        ipcMain.on('asynchronous-message', function(event, arg) {
            console.log("getmessage:"+arg); // prints "ping"
            win.webContents.send('asynchronous-message', '信息返回哈哈哈哈');
        });
    }
}

module.exports = message;