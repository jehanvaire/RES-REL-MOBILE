import { useRef } from "react";
import { State, TapGestureHandler } from "react-native-gesture-handler";

export const DoubleTap = ({ children }: any) => {
  const doubleTapRef = useRef(null);

  const onSingleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("single tap 1");
    }
  };

  const onDoubleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("double tap 1");
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
