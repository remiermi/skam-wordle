import React from 'react'

// ovaj search result treba bit klikabilan kasnije
export const SearchResult = ({result, onClick}) => {
    return (<div onClick = {() => onClick(result)} className="w-full p-4 hover:bg-gray-200 cursor-pointer text-center">
        {result.name}</div>)
};