import React from 'react';
import { connect } from 'react-redux';

const Profile = (props) => {
    //fetch -> express -> 참여중인 스터디 
    return (
        <div>
            내 아이디 : {props.state[0].id_redux}
        </div>
    );
};

function profile_test(state){
    return {
        state : state
    }
}

export default connect(profile_test)(Profile)
// profile_test 방식으로 store 값 넘겨받아서, Profile 객체에서 props로 써먹음 