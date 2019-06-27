
const url = require('url');

// 得到query
export function getQuery(search){
    return url.parse(search,true).query;
}