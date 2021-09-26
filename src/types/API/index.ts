import {UserInformation} from "../domain";

export type Status = {
    code: string;
    message: string;
}

export type SearchResponse = {
    status: Status
    searchedUserList: UserInformation
}