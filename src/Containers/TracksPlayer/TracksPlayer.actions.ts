import ACTION_TYPES from './TracksPlayer.actionTypes';
import { TrackState } from './TracksPlayer.state';
import { ProductData } from '../../Models/Models';

export interface SetTracksAction {
    payload: ProductData[];
    type: ACTION_TYPES.SET_TRACKS;
}
export const setTracks = (payload: ProductData[]): SetTracksAction => ({
    payload,
    type: ACTION_TYPES.SET_TRACKS
});

export interface SelectTrackAction {
    payload: number | null;
    type: ACTION_TYPES.SELECT_TRACK;
}
export const selectTrack = (payload: number | null): SelectTrackAction => ({
    payload,
    type: ACTION_TYPES.SELECT_TRACK
});

export interface UpdateSelectedTrackAction {
    payload: TrackState;
    type: ACTION_TYPES.UPDATE_SELECTED_TRACK;
}
export const updateSelectedTrack = (payload: TrackState): UpdateSelectedTrackAction => ({
    payload,
    type: ACTION_TYPES.UPDATE_SELECTED_TRACK
});

export interface PlayPauseSelectedTrackAction {
    payload: boolean;
    type: ACTION_TYPES.PLAY_PAUSE_SELECTED_TRACK;
}
export const playPauseSelectedTrack = (payload: boolean): PlayPauseSelectedTrackAction => ({
    payload,
    type: ACTION_TYPES.PLAY_PAUSE_SELECTED_TRACK
});

export type TracksPlayerActions =
    | SetTracksAction
    | SelectTrackAction
    | UpdateSelectedTrackAction;
