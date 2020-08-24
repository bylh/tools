interface DownLoadOptions {
    file?: any;
    name?: string;
    success?: Function;
    error?: Function;
}
const downloadBlob = (options: DownLoadOptions = {}) => {
    const {file, name, success, error} = options
    try {
        const blob = new Blob([file])
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob) // 创建下载的链接
        downloadElement.href = href
        downloadElement.download = decodeURI(name) // 下载后文件名
        downloadElement.style.display = 'none'
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href)
        if (success) {
            success()
        }
    } catch (e) {
        if (error) {
            error()
        }
    }
}
export default downloadBlob