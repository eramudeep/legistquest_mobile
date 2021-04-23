import { CITATION, JUDGE_NAME, PARTY_NAME, TYPE_ACT, TYPE_FREE_TEXT } from "../services/ApiList";

export const homeData=[{
    label:"Free text search",
    value:"All",
    key:TYPE_FREE_TEXT
},
{
    label:"Name-Year-Vol-Page",
    value:"Citation",
    key:CITATION
},
{
    label:"Last name – first name",
    value:"Judge Name",
    key:JUDGE_NAME
},
{
    label:"Petitioner - respondent",
    value:"Party Name",
    key:PARTY_NAME
},
{
    label:"Act name- Section",
    value:"Act Name",
    key:TYPE_ACT
},
]