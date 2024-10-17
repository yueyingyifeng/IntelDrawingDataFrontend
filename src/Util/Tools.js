export const Tool = {
    isValidWindowsFilename : function (filename) {
        // 1. 检查是否包含非法字符
        const invalidChars = /[<>:"\/\\|?*]/;
        if (invalidChars.test(filename)) {
            return false;
        }
    
        // 2. 检查是否以空格或句点结尾
        if (filename.endsWith(' ') || filename.endsWith('.')) {
            return false;
        }
    
        // 3. 检查长度是否超过 255 个字符
        if (filename.length > 255) {
            return false;
        }
    
        // 4. 检查是否是保留的文件名
        const reservedNames = [
            'CON', 'PRN', 'AUX', 'NUL',
            'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
            'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
        ];
        const nameWithoutExtension = filename.split('.')[0].toUpperCase();
        if (reservedNames.includes(nameWithoutExtension)) {
            return false;
        }
    
        if(filename === '')
            return false;
    
        // 符合命名规范
        return true;
    },
    isValidEmail : function(email) {
        // 定义用于检测邮箱格式的正则表达式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
}