module.exports.objSortAndUrlStr = (obj) => {
    if (typeof obj !== 'object') return '';
    const keys = Object.keys(obj); //获取key
    keys.sort(); 
    let str = '';
    for (let k of keys) {
        if(str){
            str += `&`;
        }
        str += `${k}=${obj[k]}`;
    }
    return str
}