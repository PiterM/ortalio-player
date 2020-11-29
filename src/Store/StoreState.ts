import { TracksPlayerState, TrackState } from '../Containers/TracksPlayer/TracksPlayer.state';

export interface StoreState {
    tracks: TracksPlayerState;
    selectedTrack: TrackState | null;
}
