const  { fahrenheitToCelsius, celsiusToFahrenheit, add} = require ('../src/math.js')
test('c2f',()=>{
    expect(celsiusToFahrenheit(0)).toBe(32)
})

test('f2c',()=>{
    expect(fahrenheitToCelsius(32)).toBe(0)
})

test('async',(done)=>{
    add(3,3).then((sum)=>{
        expect(sum).toBe(6)
    })
    done()
})
test('async', async()=>{
    const sum = await add(6,6)
    expect(sum).toBe(12)
})