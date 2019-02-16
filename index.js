// index.js

const validate = v=>o=>Object.entries(v).reduce(
    (prev, [k, fs])=>prev.concat([
        {[k]: fs.reduce((p, f)=>p.concat(f(o[k])), [])}
    ]), []
)

module.exports = validate


if(module.parent) return

// sample
const toStr = Object.prototype.toString
const o = {
    id: 12345
   ,name: 'foo bar'
   ,birthday : new Date()
   ,sex: false
}
const v = {
    id: [
        v=>toStr.call(v)==='[object Number]'
       ,v=>v>=0
       ,v=>v<=20000
    ]
   ,name: [
        v=>toStr.call(v)==='[object String]'
       ,v=>v.length>=1 && v.length<=10
       ,v=>v.match("\\w+\\s+\\w+") ? true : false
    ]
   ,birthday : [
        v=>toStr.call(v)==='[object Date]'
    ]
   ,sex: [
        v=>toStr.call(v)==='[object Boolean]'
    ]
}
console.log(validate(v)(o))
