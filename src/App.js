import './App.css';
import {useEffect, useState} from "react";
import {Button} from "./components/Button/Button";
import {Content} from "./components/Content/Content";
import {DataItem} from "./components/DataItem/DataItem";
import {Toast} from "./components/Toast/Toast";

import LineChart from './components/LineChart/LineChart';
import {formatNumberToString} from "./utils/formatNumberToString";
import {SaveAndExitModal} from "./components/SaveAndExitModal/SaveAndExitModal";
import {useData} from "./hooks/useData";
import {SetupRecordingModal} from "./components/SetupRecordingModal/SetupRecordingModal";
import {ControlPanelWrapper} from "./components/ControlPanelWrapper/ControlPanelWrapper";
import {RecordHeader} from "./components/RecordHeader/RecordHeader";
import {CountdownControlPanel} from "./components/ControlPanels/CountdownControlPanel/CountdownControlPanel";
import {getLineTypeByState} from "./utils/getLineTypeByState";
import {usePostData} from "./hooks/usePostData";
import {ABORT_URL, LAUNCH_ENGINE_URL} from "./constants/urls";

const chartData = [
  { value: 0, time: 0, lineType: 'dottedGrey' },
  { value: 5.1, time: 1, lineType: 'dottedGrey' },
  { value: 22, time: 2.342423, lineType: 'dottedGrey' },
  { value: 12, time: 3, lineType: 'dottedGrey' },
  { value: 13, time: 4, lineType: 'black' },
  { value: 4.1, time: 5, lineType: 'black' },
  { value: 1, time: 6, lineType: 'black' },
  { value: 5, time: 7, lineType: 'red' },
  { value: 3, time: 8, lineType: 'red' },
  { value: 8, time: 9, lineType: 'red' },
  { value: 12, time: 10, lineType: 'red' },
  { value: 18, time: 11, lineType: 'red' },
  { value: 13, time: 12, lineType: 'red' },
  { value: 28, time: 13, lineType: 'red' },
  { value: 24, time: 14, lineType: 'red' },
  { value: 13, time: 15, lineType: 'black' },
  { value: 14.1, time: 16, lineType: 'black' },
  { value: 10, time: 17, lineType: 'black' },
  { value: 6, time: 18, lineType: 'dottedGrey' },
  { value: 5.1, time: 19, lineType: 'dottedGrey' },
  { value: 2, time: 20, lineType: 'dottedGrey' },
  { value: 0, time: 21, lineType: 'dottedGrey' },


];

const FRAMES = 50;

function App() {
  // console.log('render???');
  const [showSetupRecordingModal, setShowSetupRecordingModal] = useState(false);
  const [showSaveAndExitModal, setShowSaveAndExitModal] = useState(false);
  const [buffer, setBuffer] = useState([]);
  const [toast, setToast] = useState(null);

  const {data, error, isLoading} = useData();
  const { isLoading: isSendDataLoading, isError, result, errorText, postData } = usePostData();

  const handleCloseToast = () => {
    setToast(null);
  };

  const handleSetErrorToast = (description) => {
    setToast({type: 'error', description});
  };

  useEffect(() => {
    setBuffer((chart) => {
      const lastRecord = chart.length && chart.slice(-1)[0];
      const newTime = lastRecord ? lastRecord.time + 1 : 0
      return [...chart,  { value: data.thrust, time: newTime, lineType: getLineTypeByState(data.state)}].slice(-FRAMES);
    })
  }, [data]);

  const handleSetupRecording = () => {
    console.log('handleSetupRecording');
    setShowSetupRecordingModal(true)
  };

  const handleEngineLaunch = async () => {
    const body = {state: '10'}
    await postData(LAUNCH_ENGINE_URL, body);

    if (isError) {
      console.log('123_handleEngineLaunch_errorText', errorText);
      // onError(errorText || 'Cannot reach server. Check connection and try again.');
    }
  };


  const handleAbortLaunch = async () => {
    const body = {state: 'S'}
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

  const standbyMode = data.state === 'S';
  const recordMode = data.state === 'R';
  const engineMode = data.state === '0';
  const countDownMode = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(data.state);

  return (
      <>
        {
          (recordMode || countDownMode || engineMode) && (
                <RecordHeader
                    timeText={data.time}
                    onSave={handleOnSaveRecord}
                    countDownMode={countDownMode}
                    engineMode={engineMode}/>
            )
        }
        <div style={{padding: "16px"}}>
          <DataItem description="Pressue" value={formatNumberToString(data.thrust, 2)} units="Pa/ms"/>
        </div>
        <LineChart data={buffer}/>
        {/*<LineChart data={chartData}/>*/}
        <div className="App">
          {!!toast && (
              <Toast
                  description={toast.description}
                  type={toast.type}
                  onClose={handleCloseToast}
              />
          )}

          <Content>
            <div>
              <DataItem description="Measuring Rate" value={data.rate} units="Hz"/>
              { recordMode && <DataItem description="Measurments" value={data.samples} units="samples"/> }
              <DataItem description="Web refrash Rate" value="10" units="Hz"/>
            </div>
          </Content>
          <ControlPanelWrapper>
            {
                standbyMode && (
                    <Button
                        text="Setup recording"
                        onClick={handleSetupRecording}
                        iconName="setupRecord"
                        width="100%"
                    />
                )
            }
            {
                recordMode && (
                    <Button
                        text="Initiate engine launch"
                        onClick={handleEngineLaunch}
                        width="100%"
                        iconName={isSendDataLoading ? "loading" : "rocket"}
                        disabled={!!isSendDataLoading}
                    />
                )
            }

          </ControlPanelWrapper>
          {
              countDownMode && <CountdownControlPanel onClick={handleAbortLaunch} count={data.state} loading={isSendDataLoading}/>
          }
          <SetupRecordingModal
              onError={handleSetErrorToast}
              show={showSetupRecordingModal}
              onClose={() => setShowSetupRecordingModal(false)}/>
          <SaveAndExitModal
              show={showSaveAndExitModal}
              samplesCount={data.samples}
              timeCount={data.time}
              onClose={() => setShowSaveAndExitModal(false)}/>
        </div>
      </>
  );
}

export default App;
