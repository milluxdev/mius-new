
import aria2c from 'config/aria2c'
import { join } from 'path'
import { spawn } from 'child_process';

const isDevelopment = process.env.NODE_ENV !== 'production'
console.log(aria2c)
let aria2Url = ''
if (isDevelopment) {
    aria2Url = join(__static, "..", "extra", process.platform, 'engine')
}
let aria2 = aria2Url + aria2c[process.platform]
let params = ['--conf-path=./aria2.conf'];
const defaults = {
    cwd: aria2Url,
};
let aria2_process = spawn(aria2, params, defaults);
aria2_process.stdout.on('data', function(chunk) {
    console.log(chunk.toString());
});
aria2_process.on('close', function (code) {
    console.log('aria2子进程已退出，退出码 ' + code);
});