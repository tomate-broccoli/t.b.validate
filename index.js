// index.js
const validate = f=>{
    const m = {}
    f({
        add: (id, key, fn, skip=true)=>{
            m[id] ? m[id].push({key, fn, skip}) : m[id] = [{key, fn, skip}]
	}
    })
    return o=>Object.entries(m).reduce(
        (p0, [id, arr])=>{
            p0[id] = arr.reduce(
                (p1, {key, fn, skip})=>{
                    Object.values(p1).includes(false) && skip ?
                        p1[key] = null : p1[key] = fn(o[id]) 
                    return p1
		}, {}
	    )
            return p0
	}, {}
    )
}

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
const res = require('./index.js')(({add})=>{
    add('id', 'type', v=>toStr.call(v)==='[object Number]') 
    add('id', 'min', v=>v>=0)
    add('id', 'max', v=>v<20000)
    add('name', 'type', v=>toStr.call(v)==='[object String]')
    add('name', 'range', v=>v.length>=1 && v.length<=10)
    add('name', 'fmt', v=>v.match(/\S+\s+\S+/) ? true : false)
    add('birthday', 'type', v=>toStr.call(v)==='[object Date]')
    add('birthday', 'min', v=>v>=new Date(1900, 1-1, 1))
    add('birthday', 'max', v=>v<new Date(3000, 1-1, 1))
})(o)

console.log(res)
