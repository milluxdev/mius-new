import {
    spawn
} from 'child_process';

class YgoproWin {
    joinGame(dir, path, ip, port, username, roomname, deckname) {
        let params = ['-h', ip, '-p', port, '-w', roomname, '-n', username, '-d', deckname, '-j'];
        const defaults = {
            cwd: dir,
        };
        spawn(path, params, defaults);
    }
    updateDeck(dir, path, deckname) {
        const defaults = {
            cwd: dir,
        };
        let params = ['-d', deckname];
        spawn(path, params, defaults);
    }
}

export default new YgoproWin();