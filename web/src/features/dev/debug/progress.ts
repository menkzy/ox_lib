import { debugData } from '../../../utils/debugData';
import { ProgressbarProps } from '../../../typings';

export const debugProgressbar = () => {
  debugData<ProgressbarProps>([
    {
      action: 'progress',
      data: {
        label: 'Using Lockpick',
        duration: 80000,
      },
    },
  ]);
};

export const debugCircleProgressbar = () => {
  debugData([
    {
      action: 'circleProgress',
      data: {
        duration: 80000,
        label: 'Using Armour',
      },
    },
  ]);
};
