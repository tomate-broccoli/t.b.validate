// index.js
const validate = v=>o=>Object.entries(v).reduce(
    (p0, [k0, v0])=>{
        p0[k0] = Object.entries(v0).reduce(
            (p1, [k1, {fn, skip}])=>{
                Object.values(p1).includes(false) && skip ?
                    p1[k1] = null : p1[k1] = fn(o[k0])
                return p1
	    }, {}
	)
        return p0
    }, {}
)

module.exports = validate


if(module.parent) return

// sample
const o = {
    id: 12345
   ,name: 'foo bar'
   ,birthday : new Date(2019, 2-1, 16)
   ,sex: false
}

const toStr = Object.prototype.toString
const res = require('./index.js')({
    id: {
        type: {fn: v=>toStr.call(v)==='[object Number]', skip: false}
       ,min:  {fn: v=>v>=0, skip: true}
       ,max:  {fn: v=>v<20000, skip: true}
    }
   ,name : {
        type: {fn: v=>toStr.call(v)==='[object String]', skip: false}
       ,range:{fn: v=>v.length>=1 && v.length<=10, skip: true}
       ,fmt:  {fn: v=>v.match("\\S+\\s+\\S+") ? true : false, skip: true}
    }
   ,birthday: {
        type: {fn: v=>toStr.call(v)==='[object Date]', skip: false}
       ,min:  {fn: v=>v>=new Date(1900, 1-1, 1), skip: true}
       ,max:  {fn: v=>v<new Date(3000, 12-1, 31), skip: true}
    }
})(o)

console.log(res)
