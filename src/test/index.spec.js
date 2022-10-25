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

// users
describe("Get confirm_account",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).get('/confirm_account').send()
        expect(response.statusCode).toBe(200)
    })
})

describe("Get logout",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).get('/logout').send()
        expect(response.statusCode).toBe(200)
    })
    
})


describe("Get error_login",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).get('/error_login').send()
        expect(response.statusCode).toBe(200)
    })
    
})

describe("Post verify_code",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).post('/verify_code').send()
        expect(response.statusCode).toBe(200)
    })

})

describe("Post login",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).post('/login').send()
        expect(response.statusCode).toBe(200)
    })

})

// cart

describe("Get add_cart/:id",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).get('/add_cart/:id').send()
        expect(response.statusCode).toBe(200)
    })
    
})

describe("Get cart",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).get('/cart').send()
        expect(response.statusCode).toBe(200)
    })
    
})


describe("Get remove_item/:id",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).get('/remove_item/:id').send()
        expect(response.statusCode).toBe(200)
    })
    
})


describe("Get delete_product/:id",()=>{
    test('Tiene que retornar un estado 200',async ()=>{
        const response=await request(app).get('/delete_product/:id').send()
        expect(response.statusCode).toBe(200)
    })
    
})



// NODE_OPTIONS=--experimental-vm-modules npx jest