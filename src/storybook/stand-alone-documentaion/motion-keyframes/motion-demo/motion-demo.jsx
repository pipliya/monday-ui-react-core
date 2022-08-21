import React, { useRef, forwardRef, useState } from "react";
import useMergeRefs from "../../../../hooks/useMergeRefs";
import PropTypes from "prop-types";
import Flex from "../../../../components/Flex/Flex";
import Button from "../../../../components/Button/Button";
import cx from "classnames";

import { KEYFRAME, DURATION, TIMING } from "./MotionDemoConstants";

import classes from "./motionDemo.module.scss";

const MotionDemo = forwardRef(({ className, id, keyframe, duration, timing }, ref) => {
  const componentRef = useRef(null);
  const mergedRef = useMergeRefs({ refs: [ref, componentRef] });

  const [isActive, setIsActive] = useState(false);

  const handleClick = event => {
    setIsActive(current => !current);
  };

  return (
    <Flex className={cx(classes.demoSection)}>
      <div
        ref={mergedRef}
        className={cx(className, classes.demo, keyframe, duration, timing, { [classes.active]: isActive })}
        id={id}
      ></div>
      {isActive && (
        <Button className={cx(classes.demoButton)} onClick={handleClick}>
          Reset
        </Button>
      )}
      {!isActive && (
        <Button className={cx(classes.demoButton)} onClick={handleClick}>
          Play
        </Button>
      )}
    </Flex>
  );
});

export default MotionDemo;

MotionDemo.keyframes = KEYFRAME;
MotionDemo.durations = DURATION;
MotionDemo.timings = TIMING;

MotionDemo.propTypes = {
  /**
   * class name to be add to the wrapper
   */
  className: PropTypes.string,
  /**
   * id to be add to the wrapper
   */
  id: PropTypes.string,
  keyframe: PropTypes.oneOf([
    MotionDemo.keyframes.POP_ELASTIC,
    MotionDemo.keyframes.SPIN_IN_EMPHASIZED,
    MotionDemo.keyframes.SLIDE_OUT
  ]),
  duration: PropTypes.oneOf([
    MotionDemo.durations.PRODUCTIVE_SHORT,
    MotionDemo.durations.PRODUCTIVE_MEDIUM,
    MotionDemo.durations.PRODUCTIVE_LONG,
    MotionDemo.durations.EXPRESSIVE_SHORT,
    MotionDemo.durations.EXPRESSIVE_LONG
  ]),
  timing: PropTypes.oneOf([
    MotionDemo.timings.EASE_IN_OUT,
    MotionDemo.timings.ENTER,
    MotionDemo.timings.EXIT,
    MotionDemo.timings.TRANSITION,
    MotionDemo.timings.EMPHASIZE
  ])
};
