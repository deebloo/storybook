import React from 'react';
import { Icons, IconsProps } from '@storybook/components';
import { styled } from '@storybook/theming';
import { TestState, TestingStates } from '../../Panel';
import { theme } from '../../theme';

export interface StatusIconProps extends IconsProps {
  status: TestState;
}

const {
  colors: {
    pure: { green, red, gray },
  },
} = theme;

const StyledStatusIcon = styled(Icons)(({ status }: StatusIconProps) => ({
  flexShrink: 0,
  width: 12,
  height: 12,
  padding: 1,
  marginRight: 5,
  color: status === TestingStates.PENDING ? gray[500] : status === TestingStates.DONE ? green : red,
}));

/**
 * StatusIcon
 * @param status: StatusIconProps
 * @returns styled icon based on status
 */
export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const icon =
    status === TestingStates.PENDING ? 'circle' : status === TestingStates.DONE ? 'check' : 'stop';
  return <StyledStatusIcon status={status} icon={icon} />;
};