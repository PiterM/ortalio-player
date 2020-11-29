import { combineReducers } from 'redux';
import { selectedTrack, tracks } from '../Containers/TracksPlayer/TracksPlayer.reducer';
import { StoreState } from './StoreState';

const rootReducer = combineReducers<StoreState>(
    {
        tracks,
        selectedTrack
    }
);

export default rootReducer;