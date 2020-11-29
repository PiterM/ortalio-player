import { Provider } from 'react-redux';
import getStore from './Store/Store';
import Gallery from './Containers/Gallery/Gallery';
import TracksPlayer from './Containers/TracksPlayer/TracksPlayer';

function App() {
    return (
      <Provider store={getStore()}>
        <Gallery />
        <TracksPlayer />
      </Provider>
    );
}

export default App;
