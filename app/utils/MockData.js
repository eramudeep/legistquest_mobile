import { CITATION, JUDGE_NAME, PARTY_NAME, TYPE_ACT, TYPE_FREE_TEXT } from "../services/ApiList";

export const homeData=[{
    label:"Free text search",
    value:"All",
    key:TYPE_FREE_TEXT,
    pl:"Search By title, case number, issue,..."
},
{
    label:"Name-Year-Vol-Page",
    value:"Citation",
    key:CITATION,
    pl:"Search through Citation"
},
{
    label:"Last name – first name",
    value:"Judge Name",
    key:JUDGE_NAME,
    pl:"Judge Name"
},
{
    label:"Petitioner - respondent",
    value:"Party Name",
    key:PARTY_NAME,
    pl:"Petitionar/Respondent"
},
{
    label:"Act name- Section",
    value:"Act Name",
    key:TYPE_ACT,
    pl:"Act Name"
},
]
export const sortData=[
    {label:"Relevance",value:1},
    {label:"Newest",value:2},
    {label:"Oldest",value:3},
]