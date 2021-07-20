import { SEARCH_BY_KEY_WORDS, SEARCH_QUERY } from "./ApiList";

export const getRequest = async (type,search) => {
    let api=SEARCH_QUERY
    return await fetch(`${api}type=${type}&searchString=${search}`)
        .then((response) => response.text())
        .catch((error) => {
            console.error(error);
        });
};