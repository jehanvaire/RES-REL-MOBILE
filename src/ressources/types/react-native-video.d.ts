declare module 'react-native-video' {
    import * as React from 'react';
    import {VideoProperties} from 'react-native-video';
  
    type VideoControlsProps = {
      onEnterFullscreen?: () => void;
      onExitFullscreen?: () => void;
      onHideControls?: () => void;
      onShowControls?: () => void;
      onError?: () => void;
      onPause?: () => void;
      onPlay?: () => void;
      onBack?: () => void;
      onEnd?: () => void;
      toggleResizeModeOnFullscreen?: boolean;
      controlTimeout?: number;
      showOnStart?: boolean;
      showTimeRemaining?: boolean;
      tapAnywhereToPause?: boolean;
      disableFullscreen?: boolean;
      disablePlayPause?: boolean;
      disableSeekbar?: boolean;
      disableVolume?: boolean;
      disableTimer?: boolean;
      disableBack?: boolean;
    };
  
    export default class Video extends React.Component<
      VideoProperties & VideoControlsProps
    > {
      player: {
        ref: {
          presentFullscreenPlayer(): void;
          dismissFullscreenPlayer(): void;
          restoreUserInterfaceForPictureInPictureStopCompleted(
            restored: boolean,
          ): void;
          save(): Promise<void>;
          seek(time: number, tolerance?: number): void;
        };
      };
    }
  }
  