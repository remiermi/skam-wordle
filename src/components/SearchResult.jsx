import React from 'react'

// ovaj search result treba bit klikabilan kasnije
export const SearchResult = ({result, onClick}) => {
    return (<div onClick = {() => onClick(result)} className="w-full p-2 md:p-4 cursor-pointer text-center">
        {result.name}</div>)
};