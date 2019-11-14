import {
    spawn
} from 'child_process';
import {
    remote
} from "electron";

class YgoproWin {
    joinGame(dir, path, ip, port, username, roomname, deckname) {
        let params = ['-h', ip, '-p', port, '-w', roomname, '-n', username, '-d', deckname, '-j'];
        const defaults = {
            cwd: dir,
        };
        let ygo_process = spawn(path, params, defaults);
        remote.getCurrentWindow().hide()
        ygo_process.on('close', function (code) {
            remote.getCurrentWindow().show()
            console.log('YGOPro子进程已退出，退出码 ' + code);
        });
    }
    updateDeck(dir, path, deckname) {
        const defaults = {
            cwd: dir,
        };
        let params = ['-d', deckname];
        let ygo_process = spawn(path, params, defaults);
        remote.getCurrentWindow().hide()
        ygo_process.on('close', function (code) {
            remote.getCurrentWindow().show()
            console.log('YGOPro子进程已退出，退出码 ' + code);
        });
    }
}

export default new YgoproWin();