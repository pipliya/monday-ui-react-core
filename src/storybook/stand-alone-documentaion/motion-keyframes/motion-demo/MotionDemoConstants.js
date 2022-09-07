import classes from "./motionDemo.module.scss";

export const STATE = Object.freeze({
    STATIC: classes.motionStatic,
    STATIC_START: classes.motionStaticStart
})

export const ORIGIN = Object.freeze({
    TOP_CENTER:classes.originTopCenter,
    TOP_LEFT: classes.originTopLeft,
    TOP_RIGHT: classes.originTopRight,
    CENTER: classes.originCenter,
    BOTTOM_LEFT: classes.originBottomLeft,
    BOTTOM_RIGHT: classes.originBottomRight,
})

export const KEYFRAME = Object.freeze({
    POP_ELASTIC: classes.motionPopElastic,
    POP_IN: classes.motionPopIn,
    POP_IN_FROM_TRIGGER: classes.motionPopInFromTrigger,
    POP_IN_ELASTIC: classes.motionPopInElastic,
    POP_IN_ELASTIC_BOLD: classes.motionPopInElasticBold,
    POP_OUT_FROM_TRIGGER: classes.motionPopOutFromTrigger,
    SPIN_IN_EMPHASIZED: classes.motionSpinInEmphasized,
    POP_IN_EMPHASIZED: classes.motionPopInEmphasized,
    SLIDE_IN: classes.motionSlideIn,
    SLIDE_IN_ELASTIC: classes.motionSlideInElastic,
    SLIDE_OUT:  classes.motionSlideOut,
})

export const DURATION = Object.freeze({
    PRODUCTIVE_SHORT: classes.motionProductiveShort,
    PRODUCTIVE_MEDIUM: classes.motionProductiveMedium,
    PRODUCTIVE_LONG: classes.motionProductiveLong,
    EXPRESSIVE_SHORT: classes.motionExpressiveShort,
    EXPRESSIVE_LONG: classes.motionExpressiveLong,
    SLOW_MOTION:classes.motionSlowMotion,
})

export const TIMING = Object.freeze({
    EASE_IN_OUT: classes.motionTimingEaseInOut,
    ENTER: classes.motionIimingEnter,
    EXIT: classes.motionIimingExit,
    TRANSITION: classes.motionTimingTransition,
    EMPHASIZE: classes.motionTimingEmphasize,
})
