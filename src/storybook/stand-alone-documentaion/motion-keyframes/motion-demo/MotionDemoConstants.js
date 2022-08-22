import classes from "./motionDemo.module.scss";

export const STATE = Object.freeze({
    STATIC: classes.motionStatic,
    STATIC_START: classes.motionStaticStart
})

export const KEYFRAME = Object.freeze({
    POP_ELASTIC: classes.motionPopElastic,
    SPIN_IN_EMPHASIZED: classes.motionSpinInEmphasized,
    POP_IN_EMPHASIZED: classes.motionPopInEmphasized,
    SLIDE_IN_ELASTIC: classes.motionSlideInElastic,
    SLIDE_OUT:  classes.motionSlideOut,
})

export const DURATION = Object.freeze({
    PRODUCTIVE_SHORT: classes.motionProductiveShort,
    PRODUCTIVE_MEDIUM: classes.motionProductiveMedium,
    PRODUCTIVE_LONG: classes.motionProductiveLong,
    EXPRESSIVE_SHORT: classes.motionExpressiveShort,
    EXPRESSIVE_LONG: classes.motionExpressiveLong,
})

export const TIMING = Object.freeze({
    EASE_IN_OUT: classes.motionTimingEaseInOut,
    ENTER: classes.motionIimingEnter,
    EXIT: classes.motionIimingExit,
    TRANSITION: classes.motionTimingTransition,
    EMPHASIZE: classes.motionTimingEmphasize,
})
