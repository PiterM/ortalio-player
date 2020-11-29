import { all, ForkEffect, CallEffect, TakeEffect, fork } from 'redux-saga/effects';
import { watchTracksPlayerSagas } from '../Containers/TracksPlayer/TracksPlayer.sagas';

type SagaType = () => IterableIterator<ForkEffect | CallEffect | TakeEffect>; 

const sagas: Array<SagaType> = [
    watchTracksPlayerSagas,
];

function* globalSagas() {
    const globalSagasForks = sagas.map((saga: SagaType) => fork(saga));

    yield all([...globalSagasForks]);
}

export default globalSagas;
