
import React, {Fragment} from 'react'; 
import { Link } from 'react-router-dom'
import { v1 as uuid } from "uuid";
import { withRouter } from 'react-router-dom'; //이거 써야 하나..
import './Enter.css';

function Enter(props){ //인자 전달 이렇게가 맞나.. 원래는 const CreateRoom = (props) => {

	function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

	return(
	    <>
		<div className="container" >
			<div className="item_5">
				<div>
					<button type='button' className="button_style" onClick={create}>방 새로 만들기</button>	
				</div>
				<div>
					<button type='button' className="button_style">
						<Link to="enterRoom/1">1번 방</Link>				
					</button>
				</div>
				<div>
					<button type='button' className="button_style">
						<Link to="enterRoom/2">2번 방</Link>				
					</button>
				</div>
				<div>
					<button type='button' className="button_style">
						<Link to="enterRoom/3">3번 방</Link>				
					</button>
				</div>
				<div>
					<button type='button' className="button_style">
						<Link to="/cal/study">총 공부시간</Link>				
					</button>
				</div>	         
			</div>			
		</div>
	    </>
	)
}

//export default withRouter(Enter);
export default Enter; 