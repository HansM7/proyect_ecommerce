import app from '../../server.js'
import request from "supertest"


// PARA LOS PRODUCTOS
describe("Get Product",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).get('/store').send()
        expect(response.statusCode).toBe(200)
    })

    test('Tiene que retornar un Array',async ()=>{
        const response=await request(app).get('/store').send()
        expect(response.body).toBeInstanceOf(Array)
    })
    
})

describe("Get Product Id",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).get('/api/product/:id').send()
        expect(response.statusCode).toBe(200)
    })

    test('Tiene que retornar un Array',async ()=>{
        const response=await request(app).get('/api/product/:id').send()
        expect(response.body).toBeInstanceOf(Array)
    })
    
})

describe("Post Product",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).post('/product').send()
        expect(response.statusCode).toBe(200)
    })

})

describe("Put Product",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).put('/api/producto/:id').send()
        expect(response.statusCode).toBe(200)
    })

})


describe("Delete Product",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).delete('/api/producto/:id').send()
        expect(response.statusCode).toBe(200)
    })

})

// NODE_OPTIONS=--experimental-vm-modules npx jest