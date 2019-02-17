// index.js
const validate = v=>{
    const validates = {}
    v({
        add: (k, f, s=true)=>
            validates[k] ? validates[k].push({fn:f, skip:s}) 
	                 : validates[k] = [{fn:f, skip:s}]
    })
    return o=>Object.entries(validates).reduce(
        (prev, [k, fns])=>prev.concat([{
            [k]: fns.reduce(
                (p, {fn, skip})=>p.includes(false) && skip ? p.concat(null) : p.concat(fn(o[k]))
               ,[]
	    )
	}])
       ,[]
    )
}

module.exports = validate


if(module.parent) return

// sample
const samp = require('./index.js')
const toStr = Object.prototype.toString
const o = {
    id: 12345
   ,name: 'foo bar'
   ,birthday : new Date(2019, 2-1, 16)
   ,sex: false
}
const v = f=>{
    f.add('id', v=>toStr.call(v)==='[object Number]', false)
    f.add('id', v=>v>=0)
    f.add('id', v=>v<=20000)
    f.add('name', v=>toStr.call(v)==='[object String]', false)
    f.add('name', v=>v.length>=1 && v.length<=10)
    f.add('name', v=>v.match("\\S+\\s+\\S+") ? true : false)
    f.add('birthday', v=>toStr.call(v)==='[object Date]', false)
    f.add('birthday', v=>v>=new Date(1900, 1-1, 1))
    f.add('birthday', v=>v<new Date(3000, 12-1, 31))
    f.add('sex', v=>toStr.call(v)==='[object Boolean]', false)
}
console.log(samp(v)(o))
