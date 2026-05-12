import React from 'react'
import episodes from '../data/episodes.json'

export const SeasonEpisodeDropdown = ({selectedSeason, setSelectedSeason, selectedEpisode, setSelectedEpisode}) => {
    const seasons = [1, 2, 3];
    const filteredEpisodes = episodes.filter(ep => ep.season === Number(selectedSeason));
    
    return (
        <div className="flex md:flex-row flex-col justify-center gap-12">
            <div className="flex flex-col items-center">
                <label className="text-center">Pick a season: </label>
                <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}
                    className="text-white rounded-sm border border-white bg-black px-6 py-3">
                    {seasons.map((season) => (
                        <option key={season} value={season}>Season {season}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col items-center">
                <label className="text-center">Pick an episode: </label>
                <select value={selectedEpisode} onChange={(e) => setSelectedEpisode(e.target.value)} disabled={!selectedSeason}
                    className="text-white rounded-sm border border-white bg-black px-6 py-3">
                    {filteredEpisodes.map((ep) => (
                        <option key={ep.episode} value={ep.episode}>Episode {ep.episode} : {ep.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};