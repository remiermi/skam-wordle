import React from 'react'
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({results, onSelect}) => {
    if (results.length === 0) return null;

    return (<div className="flex flex-col mt-5 overflow-y-auto max-h-32 space-y-4 border p-2 w-full max-w-[320px] md:max-w-[500px] mx-auto text-xs md:text-base">
        {
            results.map((result, id) => {
                return <SearchResult result = {result} key={id} onClick={onSelect}/>
            })
        }
    </div>);
};