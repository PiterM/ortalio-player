import { takeLatest, put, select } from 'redux-saga/effects';
import { TrackPlayingState } from '../../Common/Constants';
import { SelectTrackAction, updateSelectedTrack, PlayPauseSelectedTrackAction } from './TracksPlayer.actions';
import ACTION_TYPES from './TracksPlayer.actionTypes';
import { getAllTracks, getSelectedTrack } from './TracksPlayer.selectors';
import { TrackState } from './TracksPlayer.state';
// import {
//     SetCurrentSegmentRequestUidAction,
//     getPickingItemsDataSuccess,
//     getPickingItemsDataError,
//     setSelectedItems,
//     getPickingItemsDataInit, GetPickingItemsDataInitAction, confirmSelectedItemsError
// } from './PickingConfirmationList.actions';
// import { PickingItemForProductionOperatorDto, PickingItemStatusDto } from '../PickingListConfirmation/PickingListConfirmation.models';

// import Service from './PickingConfirmationList.service';
// import { PickingItemsConfirmationListState } from './PickingConfirmationList.state';
// import {
//     getSelectedPickingItems,
//     getSegmentRequestUid, getPickingData
// } from './PickingConfirmationList.selectors';
// import {
//     isWarehouseEnabled
// } from '../ConfigurationProvider/ConfigurationProvider.selectors';

// export enum PICKING_TABLE_ERRORS {
//     noPickingData = 'error.noPickingData',
// }

// export function* toggleSelection() {
//     const {selectedPickingItems,pickingItems}: PickingItemsConfirmationListState = yield select(getPickingData);
    
//     const warehouseEnabled: boolean | undefined = yield select(isWarehouseEnabled);
//     if(warehouseEnabled !== undefined && pickingItems && pickingItems.data && pickingItems.data.length > 0){
//         const rows = pickingItems.data;
//         const canBeSelected: string[] = rows.filter(row => {
//             if (warehouseEnabled) {
//                 return row.PickingItemStatus === PickingItemStatusDto.Picked && row.PickedQuantity >= row.TargetQuantity
//             } else {
//                 return row.PickingItemStatus === PickingItemStatusDto.Created;
//             }
//         }).map(row => row.PickingItemUid);

//         const newSelected = selectedPickingItems.length === canBeSelected.length ? [] : canBeSelected;

//         yield put(setSelectedItems(newSelected));
//     }
// }

// export function* getPickingItemsData(action: SetCurrentSegmentRequestUidAction | GetPickingItemsDataInitAction) {
//     try {
//         const segmentRequestUid = action.payload ? action.payload : yield select(getSegmentRequestUid);
//         if (!segmentRequestUid) {
//             yield put(getPickingItemsDataError(new Error()));
//             return;
//         }

//         const data: PickingItemForProductionOperatorDto[] = yield call(Service.getPickingItemsData, segmentRequestUid);
        
//         if (!data) {
//             throw new Error(PICKING_TABLE_ERRORS.noPickingData);
//         }

//         yield put(getPickingItemsDataSuccess(data));

//     } catch (error) {
//         yield put(getPickingItemsDataError(error));
//     }
// }

export function* dispatchUpdateSelectedTrack(action: SelectTrackAction) {
    const allTracks = yield select(getAllTracks);
    const selectedTrack: TrackState = yield select(getSelectedTrack);

    if (allTracks && action.payload !== null) {
        let newSelectedTrack: TrackState = allTracks[action.payload];
        if (newSelectedTrack) {
            if (!selectedTrack || newSelectedTrack.id !== selectedTrack.id) {
                newSelectedTrack = {
                    ...newSelectedTrack,
                    playingState: TrackPlayingState.Loading
                }
            } else {
               newSelectedTrack.playingState = newSelectedTrack.playingState === TrackPlayingState.Play 
                ? TrackPlayingState.Pause
                : TrackPlayingState.Play;
            }

            yield put(updateSelectedTrack(newSelectedTrack));
        }
    }
}

export function* dispatchPlayPauseSelectedTrack(action: PlayPauseSelectedTrackAction) {
    const selectedTrack: TrackState = yield select(getSelectedTrack);
    if (selectedTrack) {
        const playingState = action.payload ? TrackPlayingState.Play : TrackPlayingState.Pause;
        const updatedSelectedTrack = {
            ...selectedTrack,
            playingState
        };

        yield put(updateSelectedTrack(updatedSelectedTrack));
    }
}

export function* watchTracksPlayerSagas() {
    yield takeLatest(ACTION_TYPES.SELECT_TRACK, dispatchUpdateSelectedTrack);
    yield takeLatest(ACTION_TYPES.PLAY_PAUSE_SELECTED_TRACK, dispatchPlayPauseSelectedTrack);
}
