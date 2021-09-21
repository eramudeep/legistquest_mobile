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
export const fontSizes=[
    {label:"4",value:4},
    {label:"8",value:8},
    {label:"12",value:12},
    {label:"14",value:14},
    {label:"16",value:16},
    {label:"20",value:20},
    {label:"24",value:24},
    {label:"28",value:28},
    {label:"32",value:32},
    {label:"36",value:36},
    {label:"40",value:40},
    {label:"44",value:44},
    {label:"48",value:48},
    {label:"52",value:52},
    {label:"56",value:56},
    {label:"58",value:58},
]