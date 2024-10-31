import { DefaultIcon } from './DefaultIcon';
import { SetupRecordIcon } from './SetupRecordIcon';
import { RecordIcon } from './RecordIcon';
import { LoadingIcon } from './LoadingIcon';
import { RocketIcon } from './RocketIcon';
import { RecordingIcon } from './RecordingIcon';
import { AbortIcon } from './AbortIcon';
import { CloseIcon } from './CloseIcon';
import { CheckIcon } from './CheckIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { ChevronUpIcon } from './ChevronUpIcon';

export const getIconByName = (name) => {
  const icons = {
    default: DefaultIcon,
    setupRecord: SetupRecordIcon,
    record: RecordIcon,
    recording: RecordingIcon,
    loading: LoadingIcon,
    rocket: RocketIcon,
    abort: AbortIcon,
    close: CloseIcon,
    check: CheckIcon,
    chevronDownIcon: ChevronDownIcon,
    chevronUpIcon: ChevronUpIcon
  };
  return icons[name] || DefaultIcon;
};
