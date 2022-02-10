//gittest2가 수정
//수정
const cors = require('cors')
const express = require("express")
const app = express()
const fs = require('fs'); //fs는 파일 시스템에 접근하는 모듈
const https = require('https');
const server = https.createServer(
  {
    key: fs.readFileSync('./private.pem'), //개인키를 가져온다.
    cert: fs.readFileSync('./public.pem'), //공개키를 가져온다.
    requestCert: false,
    rejectUnauthorized: false,
  },
  app
);

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));

let corsOption = {
    origin: 'https://192.168.0.28:8000', // 허락하는 요청 주소
    credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
} 

const io = require('socket.io')(server,{
    cors : {
        origin: "https://10.200.148.182:3000",
        methods: ["GET","POST"]
    }
})

//app.use(cors());

   app.use(cors({
     origin: 'https://10.200.148.182:3000',
     credentials: true,
   }));

//app.get('/test',(req,res)=>{
   // console.log('a');
//})

app.post('/test',(req,res)=>{
    console.log(req.body); 
    res.json({ data: "login success" });
})

/* 로그인 */
app.post('/api/users/login', (req,res)=>{
    console.log('/api/users/login'); 
    console.log('받아온 데이터:' , req.body); //undefined
    var obj = req.body; //이거 null이어서 -> 프론트쪽에서 아무것도 전달해주지 못했다는 뜻
    //var first_key = Object.keys(obj)[0]; //여기서 null 에러나는듯
    //var value = JSON.parse(first_key);
    //console.log('id: '+value.id+' password: '+value.password);
    
    //에러 : 받아온 데이터: { id: 'id123', password: 'pw123' }
     //SyntaxError: Unexpected token i in JSON at position 0

    if(obj.id==="id123" & obj.password === "pw123"){
        res.json({ data: "login success" });
    }
    else{
        res.json({ data: "login fail" });
    }
     
})

const users = {}; //피어 정보 저장 "roomID1" : {"1", "2", "3"} , "roomID2": {"4", "5", "6"} 이런 형식인듯 
//그럼 모든 정보가 로컬 스터리지에 저장되는 거..? 

const socketToRoom = {}; //peer별로 소속된 roomID 저장

io.on('connection', socket => { //커넥팅 중에는 계속 실행 
    socket.on("join room", roomID => { //새로운 peer 들어와서 join room 이벤트 emit하면 실행
        if (users[roomID]) { //기존 피어 있는 경우
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
            console.log("users2: ", JSON.stringify(users))
        } else { //내가 처음일 경우
            users[roomID] = [socket.id];
            console.log("users1: ", JSON.stringify(users))
        }
        
        const myPeerID = socket.id; //본인 아이디 정보 전달
        console.log("my peer id", JSON.stringify(myPeerID)); 
        //socket.emit("my peer id", myPeerID); 
        //io.sockets.socket(socket.id).emit("my peer id", myPeerID); -> 버전별로 형식 다름
        io.to(socket.id).emit("my peer id", myPeerID);

        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id); //나 제외한 다른 유저들 정보
        console.log("usersInThisRoom", JSON.stringify(usersInThisRoom)); 
        socket.emit("all users", usersInThisRoom); //새로 들어온 애한테 기존 유저 정보 전달

    });

    socket.on("sending signal", payload => {
        console.log("payload.userToSignal: ", payload.userToSignal)
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        console.log("payload.callerID: ", payload.callerID)
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('false-event', data => {
        var roomID = data.dst_room;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id); //나 제외한 다른 유저들 정보
        console.log("usersInThisRoom: " , usersInThisRoom, " roomID: ", roomID); 
        for( let i=0; i < usersInThisRoom.length ; i++){
            socket.to(usersInThisRoom[i]).emit('video-state', {peer_tf: data.peer_tf, tf_state: data.tf_state});
        }
        //io.to(roomId).emit('video-state', {peer_tf: data.peer_tf, tf_state: data.tf_state});
       // socket.to(data.dst_room).emit('video state', {peer_tf: data.peer_tf, tf_state: data.tf_state});
       // socket.emit("video state",{peer_tf: data.peer_tf, tf_state: data.tf_state}); //새로 들어온 애한테 기존 유저 정보 전달
       // io.to(data.dst_room).emit('video-state', {peer_tf: data.peer_tf, tf_state: data.tf_state}); //사실 앞에서 true - false, false-true 일때만 이벤트 발생시키는게 잘 되면 그냥 반대로 바꿔주기만 하면 됨
        console.log('false event 발생: ' , data.dst_room, '&&', data.peer_tf, '&&', data.tf_state); 
    })

    //6
    socket.on('disconnect', () => {
        //
        var roomID = socketToRoom[socket.id];
        console.log("6. roomID: ", roomID); 
        var usersInThisRoom = users[roomID].filter(id => id !== socket.id); //나 제외한 다른 유저들 정보
        for( let i=0; i < usersInThisRoom.length ; i++){
            console.log("6. socket.to(", usersInThisRoom[i], ").emit(", socket.id , ")"); 
            socket.to(usersInThisRoom[i]).emit('user-disconnected', socket.id );
        }
        //리팩토링 필요
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
            console.log('6. disconnect 발생, users 목록: ' , users); //test
        }

    });

});

server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));