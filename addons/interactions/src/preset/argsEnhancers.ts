import { Args, addons } from '@storybook/addons';
import { AnyFramework, ArgsEnhancer } from '@storybook/csf';
import { fn } from 'jest-mock';
import { EVENTS } from '../constants';
import { instrument } from '../instrument';

const { action } = instrument({ action: fn }, { retain: true });
const channel = addons.getChannel();
const spies: any[] = [];

channel.on(EVENTS.SET_CURRENT_STORY, () => spies.forEach((mock) => mock.mockReset()));

const addActionsFromArgTypes: ArgsEnhancer<AnyFramework> = ({ initialArgs }) => {
  return Object.entries(initialArgs).reduce((acc, [key, val]) => {
    if (typeof val === 'function' && val.name === 'actionHandler') {
      Object.defineProperty(val, 'name', { value: key, writable: false });
      acc[key] = action(val);
      spies.push(acc[key]);
      return acc;
    }
    acc[key] = val;
    return acc;
  }, {} as Args);
};

export const argsEnhancers = [addActionsFromArgTypes];