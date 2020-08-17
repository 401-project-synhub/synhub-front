import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router"
import { SignInContext } from '../../../context/auth.js';

const ENDPOINT = "https://synhub.herokuapp.com";
let socket;

class RoomForm extends Component {
    static contextType = SignInContext;

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
        });
    }

    changeRoomHandler = (e) => {
        this.setState({ room: e.target.value });
    }

    render() {

        return (
            <>
            <div className='bgBlack'>
                <div className='sign-popup'>
                <span id='close' onClick={this.context.changeOpen}>X</span>
                <div className='stuffContainer'>
                <div className='join'>
                    {
                        Object.keys(this.state.rooms).map((room, index) => {
                            return (
                                <> 
                                <div className='join-div'>
                                    <p key={index}>{room}</p>
                                    <Link key={index + '1'} to={`/coding/${room}`}>
                                        <button id='join-btn' key={index + '11'}>Join</button>
                                    </Link>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                    <form onSubmit={this.createRoom}>
                        <input onChange={this.changeRoomHandler} name='createRoom' placeholder='room name'></input>
                        <Link to={`/coding/${this.state.room}`}>
                            <button>create</button>
                        </Link>
                    </form>
                </div>
                <div className='stuffImg'>
                    <h2>
                        Create<span>/</span>join
                    </h2>
                    <h3>
                        Room
                    </h3>
                </div>
                </div>
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