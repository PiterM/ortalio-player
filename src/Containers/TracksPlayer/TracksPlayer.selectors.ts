import { StoreState } from "../../Store/StoreState";
import { TrackState, TracksPlayerState } from './TracksPlayer.state';

export const getSelectedTrack = ({ selectedTrack }: StoreState): TrackState | null => selectedTrack;
export const getAllTracks = ({ tracks }: StoreState): TracksPlayerState => tracks;

