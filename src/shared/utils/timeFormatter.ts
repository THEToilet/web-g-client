const timeFormatter = (nowTime: Date) => {
    let year = nowTime.getFullYear()
    let month = ('00' + (nowTime.getMonth() + 1).toString()).slice(-2)
    let date = ('00' + nowTime.getDate()).slice(-2)
    let hours = ('00' + nowTime.getHours()).slice(-2)
    let minutes = ('00' + nowTime.getMinutes()).slice(-2)
    let seconds = ('00' + nowTime.getSeconds()).slice(-2)
    let milliSeconds = ('000' + nowTime.getMilliseconds()).slice(-3)
    return year + '-' + month + '-' + date + '-' + hours + ':' + minutes + ':' + seconds + '.' + milliSeconds
}
export default timeFormatter