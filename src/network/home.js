import {request} from "./reques"

export function getHomeMultidata() {
    return request({
        url:'/home/multidata'
    })
}