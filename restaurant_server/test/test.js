const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
chai.should()
chai.use(chaiHttp)

const currentDate = new Date()
const date = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`

describe('Orders', () => {
    // Test GET
    describe("GET /orders", () => {
        it("It should get all the orders of that day", (done) => {
            chai.request(server)
            .get("/orders")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('status');
                res.body.should.have.property('status').eq('success')
            done()
            })
        })
    })

    // test POST
    describe("POST /orders", () => {
        it("It should POST an new order", (done) => {
            const order = {
                "data": {
                    "customerId": "12",
                    "orderDate": date,
                    "orderCity": "Ramat Gan",
                    "orderAddress": "HaEshel 1",
                    "products": [{"productId": "1", "quantity": "1"}]
                }
            }
            chai.request(server)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('status');
                res.body.should.have.property('status').eq('success')
            done()
            })
        })

        it("It should NOT POST an new order with incorrect values", (done) => {
            const order = {
                "data": {
                    "customerId": "12",
                    "orderDate": date,
                    "orderCity": "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm",
                    "orderAddress": "HaEshel 1 ",
                    "products": [{"productId": "1", "quantity": "1"}]
                }
            }
            chai.request(server)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('status');
                res.body.should.have.property('status').eq('fail')
            done()
            })
        })

        it("It should NOT POST an new order with not full data", (done) => {
            const order = {
                "data": {
                    "customerId": "12",
                    "orderDate": date,
                    "orderCity": "Ramat Gan",
                    "orderAddress": "HaEshel 1",
                    "products": []
                }
            }
            chai.request(server)
            .post("/orders")
            .send(order)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('status');
                res.body.should.have.property('status').eq('error')
            done()
            })
        })
    })
})