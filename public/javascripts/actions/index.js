import fetch from 'isomorphic-fetch'

export const LOGGED_FAILED = 'LOGGED_FAILED'
export const LOGGED_SUCCESSFULLY = 'LOGGED_SUCCESSFULLY'
export const REQUEST_FRIENDLIST = 'REQUEST_FRIENDLIST'
export const RECEIVE_FRIENDLIST = 'RECEIVE_FRIENDLIST'
export const REQUEST_USERINFO = 'REQUEST_USERINFO'
export const RECEIVE_USERINFO = 'RECEIVE_USERINFO'
export const RECEIVE_CHATRECORD = 'RECEIVE_CHATRECORD'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
export const SWITCH_FRIEND = 'SWITCH_FRIEND'
export const SWITCH_FRIEND_DONE = 'SWITCH_FRIEND_DONE'
export const ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS'
export const ADD_FRIEND_FAILED = 'ADD_FRIEND_FAILED'
export const REFRESH_FRIEND_LIST = 'REFRESH_FRIEND_LIST'
export const SET_ATVIE_FRIEND = 'SET_ATVIE_FRIEND'
export const SHOW_UNREAD_MSG_ALERT = 'SHOW_UNREAD_MSG_ALERT'
export const SHOW_LATEST_MSG = 'SHOW_LATEST_MSG'


/*
 ********************************** User Authentication ************************************
 */
export function loginFailed() {
    return {
        type: LOGGED_FAILED
    }
}

export function loginSuccess(userInfo) {
    return {
        type: LOGGED_SUCCESSFULLY,

    }
}

export function authUserInfo(usrInfo, url) {
    return dispatch => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(usrInfo),
            credentials: 'include' //Should you want to make a fetch request with credentials such as cookies, you should set the credentials of the request to “include”.
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else { //login failed
                    dispatch(loginFailed())
                    var error = new Error()
                    throw error
                }
        })
            .then( json => {
                window.location = json.destPage //redirect page location
            })
            .catch( error => {
            console.log('POST user login authentication info failed: ' + error.message);
        });

    }
}
/*
 ************************************** User Info ************************************************
 */
export function fetchUserInfo() {
    return dispatch => {
        return fetch('/userInfo', {
            credentials: 'include' //for request with credential with cookie, so backend can use session id to distinguish diff user
        })
               .then(response => response.json())
               .then(json => dispatch(receiveUserInfo(json.userInfo)))
    }
}

export function receiveUserInfo(userInfo) {
    return {
        type: RECEIVE_USERINFO,
        userInfo: userInfo
    }
}

/*
 ************************************** Friend List ************************************************
 */

export function addFriend(email) {
     return dispatch => {
        return fetch('/addFriend', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(email),
            credentials: 'include' //Should you want to make a fetch request with credentials such as cookies, you should set the credentials of the request to “include”.
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {

                    return response.json();
                } else { //add friend failed
                    //dispatch(addFriendFailed())
                    var error = new Error()
                    throw error
                }
        })
            .then(

            )
            .catch( error => {
            console.log('add friend failed ' + error.message);
        });

    }
}

export function refreshFriendList() {
    return {
        type: REFRESH_FRIEND_LIST
    }
}

export function switchFriend(slot, fId) {
    return {
        type: SWITCH_FRIEND,
        slot,
        fId
    }
}

export function switchFriendDone(id) {
    return {
        type: SWITCH_FRIEND_DONE,
        id
    }
}

export function requestFriendList() {
    return {
        type: REQUEST_FRIENDLIST
    }
}

export function receiveFriendList(json) {
    return {
        type: RECEIVE_FRIENDLIST,
        fList: json
    }
}

export function fetchFriendList(userId) {
    return dispatch => {
        dispatch(requestFriendList())
        return fetch('/friendList' + '?userId=' + userId, {
            credentials: 'include' //for request with credential with cookie, so backend can use session id to distinguish diff user
        })
               .then(response => response.json())
               .then(json => dispatch(receiveFriendList(json)))
    }
}

export function fetchFriendListIfNeeded(userId) {
    return (dispatch, getState) => {
        if (shouldFetchFriendList(getState())) {
            return dispatch(fetchFriendList(userId))
        }
    }
}

function shouldFetchFriendList(state) {

    if (state.friendListReducer.isFetching || state.friendListReducer.refresh){
        return true
    }
    else{
        return false
    }

}

export function showUnreadMsgAlert(msgFrom) {
    return {
        type: SHOW_UNREAD_MSG_ALERT,
        msgFrom
    }
}

export function updateLatestMsgAtFriendList(targetFriend, text) {
    return {
        type: SHOW_LATEST_MSG,
        targetFriend,
        text
    }
}

/*
 ********************************** Chat Main Body Messages *****************************************
 */
export function sendMessage(msg, currentUser) {
    return {
        type: SEND_MESSAGE,
        msg,
        currentUser
    }
}

export function receiveMessage(msg, activeFriend) {
    return {
        type: RECEIVE_MESSAGE,
        msg,
        activeFriend
    }
}


export function receiveChatRecord(json) {
    return {
        type: RECEIVE_CHATRECORD,
        chatRecord: json
    }
}

export function fetchChatRecord(userId) {
    return dispatch => {
        return fetch('/chatRecord' + '?userId=' + userId, {
            credentials: 'include' //for request with credential with cookie, so backend can use session id to distinguish diff user
        })
               .then(response => response.json())
               .then(json => dispatch(receiveChatRecord(json)))
    }
}

export function setActiveFriend(activeFriend) {
    return {
        type: SET_ATVIE_FRIEND,
        activeFriend
    }
}

