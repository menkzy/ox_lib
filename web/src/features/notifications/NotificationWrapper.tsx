import { useNuiEvent } from '../../hooks/useNuiEvent';
import { toast, Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { Avatar, Box, createStyles, Group, keyframes, Stack, Text } from '@mantine/core';
import React from 'react';
import type { NotificationProps } from '../../typings';
import MarkdownComponents from '../../config/MarkdownComponents';
import LibIcon from '../../components/LibIcon';

const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: 'calc(0.092592592vh * 320);',
    height: 'fit-content',
    backgroundColor: 'rgba(36, 36, 36, 0.8)',
    color: '#fff',
    padding: 'calc(0.092592592vh * 5) calc(0.092592592vh * 10);',
    borderRadius: '5px',
    //border: '2px solid rgba(14, 14, 14, 0.2)',
    //boxShadow: 'inset 0px 0px 72px rgba(62, 62, 62, 0.8);',
    filter: 'drop-shadow(rgba(200, 200, 200, 0.3) 0.3px 0.3px 5px)',
    strokeWidth: '3px'
    
    // border: '2px solid rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Core Mellow W01 47 Cn Regular',
    textShadow: '1px 1px 2px rgb(0, 0, 0, .5',
    filter: 'drop-shadow(rgb(255, 0, 0) 0px 0px 3px)',
    fontSize: '12px !important',
  },
  description: {
    fontSize: 12,
    color: theme.colors.dark[0],
    fontFamily: 'Core Mellow W01 47 Cn Regular',
    textShadow: '1px 1px 2px rgb(0, 0, 0, .5',
    lineHeight: 'normal',
    filter: 'drop-shadow(rgb(255, 0, 0) 0px 0px 3px)',
  },
  descriptionOnly: {
    fontSize: 13,
    color: theme.colors.dark[0],
    fontFamily: 'Core Mellow W01 47 Cn Regular',
    textShadow: '1px 1px 2px rgb(0, 0, 0, .5',
    lineHeight: 'normal',
    filter: 'drop-shadow(rgb(255, 0, 0) 0px 0px 3px)',
  },
}));

// I hate this
const enterAnimationTop = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-30px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
});

const enterAnimationBottom = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(30px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
});

const exitAnimationTop = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
});

const exitAnimationRight = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(100%)',
  },
});

const exitAnimationLeft = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
});

const exitAnimationBottom = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(100%)',
  },
});

const Notifications: React.FC = () => {
  const { classes } = useStyles();

  useNuiEvent<NotificationProps>('notify', (data) => {
    if (!data.title && !data.description) return;
    // Backwards compat with old notifications
    let position = data.position;
    switch (position) {
      case 'top':
        position = 'top-center';
        break;
      case 'bottom':
        position = 'bottom-center';
        break;
    }
    if (!data.icon) {
      switch (data.type) {
        case 'error':
          data.icon = 'circle-xmark';
          break;
        case 'success':
          data.icon = 'circle-check';
          break;
        case 'warning':
          data.icon = 'circle-exclamation';
          break;
        default:
          data.icon = 'circle-info';
          break;
      }
    }
    toast.custom(
      (t) => (
        <Box
          sx={{
            animation: t.visible
              ? `${position?.includes('bottom') ? enterAnimationBottom : enterAnimationTop} 0.2s ease-out forwards`
              : `${
                  position?.includes('right')
                    ? exitAnimationRight
                    : position?.includes('left')
                    ? exitAnimationLeft
                    : position === 'top-center'
                    ? exitAnimationTop
                    : position
                    ? [exitAnimationBottom]
                    : exitAnimationRight
                } 0.4s ease-in forwards`,
            ...data.style,
          }}
          className={`${classes.container}` }
        >
          <Group noWrap spacing={12}>
            {data.icon && (
              <>
                {!data.iconColor ? (
                  <Avatar
                    color={
                      data.type === 'error'
                        ? 'red'
                        : data.type === 'success'
                        ? 'teal'
                        : data.type === 'warning'
                        ? 'yellow'
                        : 'blue'
                    }
                    style={{ alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start' }}
                    radius="xl"
                    size={27}
                  >
                    <LibIcon icon={data.icon} fixedWidth size="lg" animation={data.iconAnimation} />
                  </Avatar>
                ) : (
                  <LibIcon
                    icon={data.icon}
                    animation={data.iconAnimation}
                    style={{
                      color: data.iconColor,
                      alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start',
                    }}
                    fixedWidth
                    size="lg"
                  />
                )}
              </>
            )}
            <Stack spacing={0}>
              {data.title && <Text className={classes.title}>{data.title}</Text>}
              {data.description && (
                <ReactMarkdown
                  components={MarkdownComponents}
                  className={`${!data.title ? classes.descriptionOnly : classes.description} description`}
                >
                  {data.description}
                </ReactMarkdown>
              )}
            </Stack>
          </Group>
        </Box>
      ),
      {
        id: data.id?.toString(),
        duration: data.duration || 3000,
        position: position || 'top-right',
      }
    );
  });

  return <Toaster />;
};

export default Notifications;
