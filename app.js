// SOCKET

import {Server} from 'socket.io'
import { sock } from './src/socket/index.js'

import app from "./server.js"
const port = process.env.PORT || 3000
const myServer=app.listen(port)

const io=new Server(myServer)
sock(io)