import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { TrackPlayingState } from '../../Common/Constants';
import { getSelectedTrack } from '../TracksPlayer/TracksPlayer.selectors';
import { playPauseSelectedTrack } from '../TracksPlayer/TracksPlayer.actions';

export const TracksPlayer: FC = () => {
    const dispatch = useDispatch();
    const selectedTrack = useSelector(getSelectedTrack);

    if (!selectedTrack) {
        return null;
    }

    const { soundcloudUrl, playingState } = selectedTrack;
    const playing = playingState === TrackPlayingState.Loading || playingState === TrackPlayingState.Play;
    
    return (
        <ReactPlayer
            url={`https://soundcloud.com/ortalio/${soundcloudUrl}`}
            playing={playing}
            onReady={() => dispatch(playPauseSelectedTrack(true))}
            style={{ display: 'none' }}
        />
    );
};

export default TracksPlayer;