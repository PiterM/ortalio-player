import ACTION_TYPE from './TracksPlayer.actionTypes';
import { TracksPlayerActions } from './TracksPlayer.actions';
import { TracksPlayerState, TrackState } from './TracksPlayer.state';

const tracksPlayerInitState: TracksPlayerState = {};

export const tracks = (state: TracksPlayerState = tracksPlayerInitState, action: TracksPlayerActions): TracksPlayerState => {
    switch (action.type) {
        case ACTION_TYPE.SET_TRACKS:
            if (action.payload.length === 0) {
                return {};
            }

            const result: any = tracksPlayerInitState;
            for (const [id, product] of action.payload.entries()) {
                result[id] = product;
            };
            return result;
        default:
            return state;
    }
}

const selectedTrackInitState: TrackState | null = null;

export const selectedTrack = (state: TrackState | null = selectedTrackInitState, action: TracksPlayerActions): TrackState | null => {
    switch (action.type) {
        case ACTION_TYPE.UPDATE_SELECTED_TRACK:
            return action.payload;
        default:
            return state;
    }
}