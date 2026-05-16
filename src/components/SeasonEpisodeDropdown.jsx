import React from 'react'
import episodes from '../data/episodes.json'

export const SeasonEpisodeDropdown = ({selectedSeason, setSelectedSeason, selectedEpisode, setSelectedEpisode, isGameOver, handleGuess}) => {
    const seasons = [1, 2, 3];
    const filteredEpisodes = episodes.filter(ep => ep.season === Number(selectedSeason));
    
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full">
            <div className="flex flex-col items-center">
                <label className="text-center">Pick a season: </label>
                <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}
                    className="text-white rounded-sm border border-white bg-black px-4 py-3 w-[110px]">
                    {seasons.map((season) => (
                        <option key={season} value={season}>Season {season}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col items-center">
                <label className="text-center">Pick an episode: </label>
                <select value={selectedEpisode} onChange={(e) => setSelectedEpisode(e.target.value)} disabled={!selectedSeason}
                    className="text-white rounded-sm border border-white bg-black px-4 py-3 w-[260px] md:w-[320px]">
                    {filteredEpisodes.map((ep) => (
                        <option key={ep.episode} value={ep.episode}>Episode {ep.episode} : {ep.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col items-center">
                <label className="invisible">Guess</label>
            <button style={{ backgroundColor: '#F0E400', fontFamily: 'Barlow, sans-serif', fontWeight: '800' }} 
                className="text-black px-6 py-3 rounded-lg w-32 text-center"
                disabled={isGameOver} onClick={handleGuess}>Guess</button>
            </div>
        </div>
    );
};