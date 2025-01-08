import './App.css';
import { useEffect, useState } from 'react';
import { Button } from './components/Button/Button';
import { Content } from './components/Content/Content';
import { DataItem } from './components/DataItem/DataItem';
import { Toast } from './components/Toast/Toast';

import LineChart from './components/LineChart/LineChart';
import { formatNumberToString } from './utils/formatNumberToString';
import { SaveAndExitModal } from './components/SaveAndExitModal/SaveAndExitModal';
import { useData } from './hooks/useData';
import { SetupRecordingModal } from './components/SetupRecordingModal/SetupRecordingModal';
import { ControlPanelWrapper } from './components/ControlPanelWrapper/ControlPanelWrapper';
import { RecordHeader } from './components/RecordHeader/RecordHeader';
import { CountdownControlPanel } from './components/ControlPanels/CountdownControlPanel/CountdownControlPanel';
import { getLineTypeByState } from './utils/getLineTypeByState';
import { usePostData } from './hooks/usePostData';
import { ABORT_URL, LAUNCH_ENGINE_URL } from './constants/urls';
import { FETCH_INTERVAL } from './constants/times';
import { LoadingModal } from './components/LoadingModal/LoadingModal';

const FRAMES = 50;

function App() {
  // console.log('render???');
  const [showSetupRecordingModal, setShowSetupRecordingModal] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showSaveAndExitModal, setShowSaveAndExitModal] = useState(false);
  const [buffer, setBuffer] = useState([]);
  const [toast, setToast] = useState(null);

  const { data } = useData();
  const { isLoading: isSendDataLoading, isError, errorText, postData } = usePostData();

  const handleCloseToast = () => {
    setToast(null);
  };

  const handleSetErrorToast = (description) => {
    setToast({ type: 'error', description });
  };

  useEffect(() => {
    setBuffer((chart) => {
      const lastRecord = chart.length && chart.slice(-1)[0];
      const newTime = lastRecord ? lastRecord.time + 1 : 0;
      return [
        ...chart,
        { value: data.thrust, time: newTime, lineType: getLineTypeByState(data.state) }
      ].slice(-FRAMES);
    });
  }, [data]);

  useEffect(() => {
    if (data.state !== 'S') {
      setShowSetupRecordingModal(false);
    }
  }, [data.state]);

  useEffect(() => {
    if (data.firstLoad) {
      setInitialLoading(false);
    }
  }, [data.firstLoad]);

  const handleSetupRecording = () => {
    console.log('handleSetupRecording');
    setShowSetupRecordingModal(true);
  };

  const handleEngineLaunch = async () => {
    const body = { state: '10' };
    await postData(LAUNCH_ENGINE_URL, body);

    if (isError) {
      console.log('123_handleEngineLaunch_errorText', errorText);
      // onError(errorText || 'Cannot reach server. Check connection and try again.');
    }
  };

  const handleAbortLaunch = async () => {
    const body = { state: 'S' };
    await postData(ABORT_URL, body);

    if (isError) {
      console.log('123_handleAbortLaunch_errorText', errorText);
      // onError(errorText || 'Cannot reach server. Check connection and try again.');
    }
  };

  const handleOnSaveRecord = () => {
    console.log('handleOnSaveRecord');
    setShowSaveAndExitModal(true);
  };

  const handleCloseSetupRecordingModal = () => {
    setShowSetupRecordingModal(false);
  };

  const handleCloseSaveAndExitModal = () => {
    setShowSaveAndExitModal(false);
  };

  const handleSetSuccessSaving = (fileName) => {
    const successMessage = `New “${fileName}” saved to SD card.`;
    setToast({ type: 'success', description: successMessage });
  };

  const standbyMode = data.state === 'S';
  const recordMode = data.state === 'R';
  const engineMode = data.state === '0';
  const countDownMode = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(data.state);

  const webRefreshRate = Number(1000 / FETCH_INTERVAL).toFixed(1);

  return (
    <>
      <LoadingModal show={initialLoading} />
      {(recordMode || countDownMode || engineMode) && (
        <RecordHeader
          timeText={data.time}
          onSave={handleOnSaveRecord}
          countDownMode={countDownMode}
          engineMode={engineMode}
        />
      )}
      <div style={{ padding: '16px' }}>
        <DataItem description="Thrust" value={formatNumberToString(data.thrust, 2)} units="kg" />
      </div>
      <LineChart data={buffer} />
      {/*<LineChart data={chartData}/>*/}
      <div className="App">
        {!!toast && (
          <Toast description={toast.description} type={toast.type} onClose={handleCloseToast} />
        )}

        <Content>
          <div>
            <DataItem description="Measuring Rate" value={data.rate} units="Hz" />
            <DataItem description="Measurments" value={data.samples} units="samples" />
            <DataItem description="Web refresh Rate" value={webRefreshRate} units="Hz" />
          </div>
        </Content>
        <ControlPanelWrapper>
          {standbyMode && (
            <Button
              text="Setup recording"
              onClick={handleSetupRecording}
              iconName="setupRecord"
              width="100%"
            />
          )}
          {recordMode && (
            <Button
              text="Initiate engine launch"
              onClick={handleEngineLaunch}
              width="100%"
              iconName={isSendDataLoading ? 'loading' : 'rocket'}
              disabled={!!isSendDataLoading}
            />
          )}
        </ControlPanelWrapper>
        {countDownMode && (
          <CountdownControlPanel
            onClick={handleAbortLaunch}
            count={data.state}
            loading={isSendDataLoading}
          />
        )}
        <SetupRecordingModal
          onError={handleSetErrorToast}
          show={showSetupRecordingModal}
          onClose={handleCloseSetupRecordingModal}
        />
        <SaveAndExitModal
          show={showSaveAndExitModal}
          samplesCount={data.samples}
          timeCount={data.time}
          onClose={handleCloseSaveAndExitModal}
          onSuccess={handleSetSuccessSaving}
        />
      </div>
    </>
  );
}

export default App;
