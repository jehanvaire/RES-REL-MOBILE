import { useRef } from "react";
import { State, TapGestureHandler } from "react-native-gesture-handler";

export const DoubleTap = ({
  children,
  AfficherPublication,
  LikePublication,
}: any) => {
  const doubleTapRef = useRef(null);

  const onSingleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (AfficherPublication) {
        AfficherPublication();
      }
    }
  };

  const onDoubleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      LikePublication();
    }
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={onSingleTapEvent}
      waitFor={doubleTapRef}
    >
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTapEvent}
        numberOfTaps={2}
      >
        {children}
      </TapGestureHandler>
    </TapGestureHandler>
  );
};
