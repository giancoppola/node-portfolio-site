import { SuccessResponse } from "../../types/word-guesser-types";

/////////////
// General //
/////////////

export const RemoveQuotes = (input: string) => {
    return input.replace(/"/gm, "");
}

/////////////////
// General End //
/////////////////

////////////////////
// Room API Calls //
////////////////////

export const Room_DoesRoomExist = async (room_name: string): Promise<boolean> => {
    let exists: string;
    exists = await fetch(`/api/word-guesser/rooms/find?name=${room_name}`)
    .then(res => res.text())
    .then(data => exists = RemoveQuotes(data))
    if (exists === 'true') {
        return true;
    }
    return false;
}

export const Room_CreateRoom = async (room_name: string, player_id: string) => {
    let created = await fetch(`/api/word-guesser/rooms/new?name=${room_name}&id=${player_id}`, {
        method: "POST"
    })
    .then(res => true)
    .catch(err => {console.log(err); return false})
    return created;
}

export const Room_JoinRoom = async (room_name: string, player_id: string): Promise<SuccessResponse> => {
    let joined: SuccessResponse = await fetch(`/api/word-guesser/rooms/join?name=${room_name}&id=${player_id}`, {
        method: "PATCH"
    })
    .then(res => res.json())
    .then((data: SuccessResponse) => data)
    .catch(err => {console.log(err); return { success: false, msg: err.message }})
    return joined;
}

export const Room_RejoinRoom = async (room_name: string, player_id: string): Promise<SuccessResponse> => {
    let rejoined: SuccessResponse = { success: false, msg: "Could not rejoin" }
    return rejoined;
}

////////////////////////
// Room API Calls End //
////////////////////////

//////////////////////
// Player API Calls //
//////////////////////

export const Player_CheckPlayerId = async (player_id: string): Promise<boolean> => {
    let valid = await fetch(`/api/word-guesser/players/find?id=${player_id}`)
    .then(res => res.text())
    .then(data => RemoveQuotes(data))
    .catch(err => console.log(err));
    if (valid === "true") {
        return true;
    }
    return false;
}

export const Player_CreateNewPlayer = async (): Promise<string> => {
    let newId = await fetch("/api/word-guesser/players/new", {
        method: "POST"
    })
    .then(res => res.text())
    .then(id => RemoveQuotes(id))
    return newId;
}

export const Player_LeaveRoom = async (player_id: string, room_name: string) => {
    let left: SuccessResponse = await fetch(`/api/word-guesser/rooms/leave?name=${room_name}&id=${player_id}`, {
        method: "PATCH"
    })
    .then(res => res.json())
    .then((data: SuccessResponse) => data)
    .catch(err => {console.log(err); return { success: false, msg: err.message }})
    return left;
}

//////////////////////////
// Player API Calls End //
//////////////////////////