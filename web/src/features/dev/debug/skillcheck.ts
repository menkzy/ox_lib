import { debugData } from '../../../utils/debugData';
import { GameDifficulty } from '../../../typings';

export const debugSkillCheck = () => {
  debugData<{ difficulty: GameDifficulty | GameDifficulty[]; inputs?: string[] }>([
    {
      action: 'startSkillCheck',
      data: {
        difficulty: [{areaSize: 50, speedMultiplier: 0.01 }],
        inputs: ['W', 'A', 'S', 'D'],

      },
    },
  ]);
};
