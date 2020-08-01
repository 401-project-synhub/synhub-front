import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router"
const ENDPOINT = "http://127.0.0.1:4000";
let socket;
// const socket = socketIOClient(ENDPOINT);

// if(window.location.hash !== "#2") {
//     window.location.href += "#2";
//     window.location.reload(false);
//   }

// if (this.match.params.id !== prevProps.match.params.id) {
//     // call the fetch function again
//   }

// window.location.reload();


// socket.emit('get-rooms');
class RoomForm extends Component {

    constructor() {
        super();
        this.state = {
            rooms: {},
            room: '',
        };
    }


    componentDidMount() {
        socket = socketIOClient(ENDPOINT);    
        socket.on('send-rooms', data => {
            this.setState({ rooms: data });
            // socket.disconnect();
        });
    }

    changeRoomHandler = (e) => {
        // console.log(e.target.value);
        this.setState({ room: e.target.value });
    }

    render() {

        return (
            <>
                <div>
                    {
                        Object.keys(this.state.rooms).map((room, index) => {
                            return (
                                <>
                                    <p key={index}>{room}</p>
                                    <Link key={index + '1'} to={`/coding/${room}`}>
                                        <button key={index + '11'}>Join</button>
                                    </Link>
                                </>
                            )
                        })
                    }
                </div>
                <div>
                    <form onSubmit={this.createRoom}>
                        <input onChange={this.changeRoomHandler} name='createRoom' placeholder='room name'></input>
                        <Link to={`/coding/${this.state.room}`}>
                            <button>create</button>
                        </Link>
                    </form>
                </div>
            </>
        )
    }
}


// function RoomForm() {


//     const [ rooms, setRooms ]  = useState({});
//     const [ room, setRoom ] = useState('');



//     useEffect(() => {
//         // console.log('hello')
//         socket = socketIOClient(ENDPOINT);    
//         socket.on('send-rooms', data => {
//             setRooms(data)
//             // socket.disconnect();
//         });
//     },[]);

//     useEffect(() => {
//         // console.log('hello')
//         socket.on('send-rooms', data => {
//             setRooms(data)
//             // socket.disconnect();
//         });
//     });

//     const changeRoomHandler = (e) => {
//         // console.log(e.target.value);
//         setRoom(e.target.value);
//     }


//     return (
//         <>
//             <div>
//                 {
//                     rooms && Object.keys(rooms).map((room, index) => {
//                         return (
//                             <>
//                                 <p key={index}>{room}</p>
//                                 <Link key={index + '1'} to={`/coding/${room}`}>
//                                     <button key={index + '11'}>Join</button>
//                                 </Link>
//                             </>
//                         )
//                     })
//                 }
//             </div>
//             <div>
//                 <form>
//                     <input onChange={changeRoomHandler} name='createRoom' placeholder='room name'></input>
//                     <Link to={`/coding/${room}`}>
//                         <button>create</button>
//                     </Link>
//                 </form>
//             </div>
//         </>
//     )
// }

export default withRouter(RoomForm)