const path = require('path');
const { uploadFile } = require('../utils/upload');

async function upload (ctx) {
    if (ctx.method === 'POST') {
        let result = { success: false }
        let serverFilePath = path.join(__dirname, '../public')

        // 上传文件事件
        result = await uploadFile(ctx, {
            fileType: 'img',
            path: serverFilePath
        })

        ctx.body = result
    } else {
        ctx.status = 405;
        ctx.body = '方法错误，上传失败';
    }
}

module.exports = upload;
