import { useMemo, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { 
  PauseCircleOutline,
  PlayCircleOutline,
} from '@material-ui/icons';
import { setTracks, selectTrack, playPauseSelectedTrack } from '../TracksPlayer/TracksPlayer.actions';
import { getSelectedTrack } from '../TracksPlayer/TracksPlayer.selectors';
import { TrackState } from '../TracksPlayer/TracksPlayer.state';
import { ProductData } from '../../Models/Models';
import { TrackPlayingState, PlayerState } from '../../Common/Constants';
import ContentHelper from '../../Common/ContentHelper';

import './Gallery.scss';

export const Gallery: FC = () => {
  const dispatch = useDispatch();
  const productsData: ProductData[] = useMemo(() => { 
    const data = ContentHelper();
    dispatch(setTracks(data));
    return data;
  }, [dispatch]);

  const selectedTrack: TrackState | null = useSelector(getSelectedTrack);

  const [playState, setPlayState] = useState(PlayerState.Stop);

  if (productsData.length > 0) {

    const setPlay = (e: any, key: number) => {
      e.preventDefault();
      dispatch(selectTrack(key));
      selectedTrack?.playingState === TrackPlayingState.Pause && dispatch(playPauseSelectedTrack(true));
      setPlayState(PlayerState.Play);
    };

    const setPause = (e: any, key: number) => {
      e.preventDefault();
      dispatch(selectTrack(key));
      dispatch(playPauseSelectedTrack(false));
      setPlayState(PlayerState.Pause);
    };

    const renderProduct = (productData: ProductData, key: number) => {

      let visibleControl = <PlayCircleOutline onClick={(e) => setPlay(e, key)} />;
      if (selectedTrack?.id === key) {
        switch (selectedTrack.playingState) {
          case TrackPlayingState.Loading:
            visibleControl = <CircularProgress size={80} onClick={(e) => setPlay(e, key)} />;
            break;
          case TrackPlayingState.Play: 
            visibleControl = <PauseCircleOutline onClick={(e) => setPause(e, key)} />;
            break;
          case TrackPlayingState.Pause:
          default:
            visibleControl = <PlayCircleOutline onClick={(e) => setPlay(e, key)} />;
        }
      }

      return (
        <div className="ortalio-product" key={key}>
          <div className="thumbnail">
            <a href={productData.url ? productData.url : undefined}>
              <img 
                src={productData.imgSrc ? productData.imgSrc : undefined}
                alt={productData.title ? productData.title : undefined} 
                title={productData.title ? productData.title : undefined} 
              />
              <div className="controls">
                {visibleControl}
              </div>
            </a>
          </div>
          <p className="title">{ productData.title ? productData.title : 'A beat' }</p>
        </div>
      );
    };

    return (
      <>
        { 
          productsData.map((productData, key) => renderProduct(productData, key)) 
        }
      </>
    );
  }
  return null;
}

export default Gallery;
