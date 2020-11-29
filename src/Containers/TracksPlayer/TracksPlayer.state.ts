import { TrackPlayingState } from '../../Common/Constants';

export interface TracksPlayerState {
    [id: number]: TrackState;
}

export interface TrackState {
    id: number;
    soundcloudUrl: string;
    title: string;
    imgSrc: string;
    playingState?: TrackPlayingState;
}