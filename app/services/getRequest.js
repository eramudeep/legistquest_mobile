import { SEARCH_BY_KEY_WORDS } from "./ApiList";

export const getRequest = async (type,search) => {
    let api=SEARCH_BY_KEY_WORDS
    return fetch(`${api}type=${type}&searchString=${search}`)
        .then((response) => response.json())
        .then((json) => {
            return json
        })
        .catch((error) => {
            console.error(error);
        });
};