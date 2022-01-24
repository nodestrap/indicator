// react:
import { default as React, useState, useReducer, } from 'react'; // base technology of our nodestrap components
import { 
// compositions:
mainComposition, 
// styles:
style, vars, imports, 
// rules:
rule, states, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssVar, } from '@cssfn/css-var'; // Declares & retrieves *css variables* (css custom properties).
import { createCssConfig, 
// utilities:
usesGeneralProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { usePropAccessibility, usePropEnabled, usePropActive, AccessibilityProvider, } from '@nodestrap/accessibilities';
// others libs:
// @ts-ignore
import triggerChange from 'react-trigger-change';
import { 
// hooks:
usesSizeVariant, usesThemeCond, outlinedOf, mildOf, usesAnim, fallbackNoneFilter, 
// styles:
usesBasicLayout, usesBasicVariants, Basic, } from '@nodestrap/basic';
const [enableDisableRefs, enableDisableDecls] = createCssVar();
{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(enableDisableRefs.filter);
    propsManager.registerAnim(enableDisableRefs.anim);
}
// if all below are not set => enabled:
const selectorIsEnabled = ':not(.enable):not(.disabled):not(.disable):not(:disabled)';
// .enable will be added after loosing disable and will be removed after enabling-animation done:
const selectorIsEnabling = '.enable';
// .disable = styled disable, :disabled = real disable:
const selectorIsDisabling = ['.disable',
    ':disabled:not(.disabled)'];
// .disabled will be added after disabling-animation done:
const selectorIsDisabled = '.disabled';
export const isEnabled = (styles) => rule(selectorIsEnabled, styles);
export const isEnabling = (styles) => rule(selectorIsEnabling, styles);
export const isDisabling = (styles) => rule(selectorIsDisabling, styles);
export const isDisabled = (styles) => rule(selectorIsDisabled, styles);
export const isEnable = (styles) => rule([selectorIsEnabling, selectorIsEnabled], styles);
export const isDisable = (styles) => rule([selectorIsDisabling, selectorIsDisabled], styles);
export const isEnablingDisable = (styles) => rule([selectorIsEnabling, selectorIsDisabling, selectorIsDisabled], styles);
/**
 * Uses enable & disable states.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents enable & disable state definitions.
 */
export const usesEnableDisableState = () => {
    return [
        () => style({
            ...states([
                isEnabling({
                    ...vars({
                        [enableDisableDecls.filter]: cssProps.filterDisable,
                        [enableDisableDecls.anim]: cssProps.animEnable,
                    }),
                }),
                isDisabling({
                    ...vars({
                        [enableDisableDecls.filter]: cssProps.filterDisable,
                        [enableDisableDecls.anim]: cssProps.animDisable,
                    }),
                }),
                isDisabled({
                    ...vars({
                        [enableDisableDecls.filter]: cssProps.filterDisable,
                    }),
                }),
            ]),
        }),
        enableDisableRefs,
        enableDisableDecls,
    ];
};
export const useEnableDisableState = (props) => {
    // fn props:
    const propEnabled = usePropEnabled(props);
    const htmlCtrls = [
        'button',
        'fieldset',
        'input',
        'select',
        'optgroup',
        'option',
        'textarea',
    ];
    const isCtrlElm = props.tag && htmlCtrls.includes(props.tag);
    // states:
    const [enabled, setEnabled] = useState(propEnabled); // true => enabled, false => disabled
    const [animating, setAnimating] = useState(null); // null => no-animation, true => enabling-animation, false => disabling-animation
    /*
     * state is enabled/disabled based on [controllable enabled]
     * [uncontrollable enabled] is not supported
     */
    const enabledFn = propEnabled /*controllable*/;
    if (enabled !== enabledFn) { // change detected => apply the change & start animating
        setEnabled(enabledFn); // remember the last change
        setAnimating(enabledFn); // start enabling-animation/disabling-animation
    }
    const handleIdle = () => {
        // clean up finished animation
        setAnimating(null); // stop enabling-animation/disabling-animation
    };
    return {
        enabled: enabled,
        disabled: !enabled,
        class: (() => {
            // enabling:
            if (animating === true)
                return 'enable';
            // disabling:
            if (animating === false) {
                // if (isCtrlElm) {
                //     // a control_element uses pseudo :disabled for disabling
                //     // not needed using class .disable
                //     return null;
                // }
                // else {
                //     // a generic_element uses class .disable for disabling
                //     return 'disable';
                // } // if
                return 'disable';
            } // if
            // fully disabled:
            if (!enabled)
                return 'disabled';
            // fully enabled:
            return null;
        })(),
        props: (isCtrlElm ? {
            // a control_element uses pseudo :disabled for disabling
            disabled: !enabled,
        } : {}),
        handleAnimationEnd: (e) => {
            if (e.target !== e.currentTarget)
                return; // no bubbling
            if (/((?<![a-z])(enable|disable)|(?<=[a-z])(Enable|Disable))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};
const [activePassiveRefs, activePassiveDecls] = createCssVar();
{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(activePassiveRefs.filter);
    propsManager.registerAnim(activePassiveRefs.anim);
}
// .actived will be added after activating-animation done:
const selectorIsActived = '.actived';
// .active = programatically active, :checked = user active:
const selectorIsActivating = ['.active',
    ':checked:not(.actived)'];
// .passive will be added after loosing active and will be removed after deactivating-animation done:
const selectorIsPassivating = '.passive';
// if all above are not set => passived:
const selectorIsPassived = ':not(.actived):not(.active):not(:checked):not(.passive)';
export const isActived = (styles) => rule(selectorIsActived, styles);
export const isActivating = (styles) => rule(selectorIsActivating, styles);
export const isPassivating = (styles) => rule(selectorIsPassivating, styles);
export const isPassived = (styles) => rule(selectorIsPassived, styles);
export const isActive = (styles) => rule([selectorIsActivating, selectorIsActived], styles);
export const isPassive = (styles) => rule([selectorIsPassivating, selectorIsPassived], styles);
export const isActivePassivating = (styles) => rule([selectorIsActivating, selectorIsActived, selectorIsPassivating], styles);
/**
 * Uses active & passive states.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents active & passive state definitions.
 */
export const usesActivePassiveState = () => {
    return [
        () => style({
            ...states([
                isActived({
                    ...vars({
                        [activePassiveDecls.filter]: cssProps.filterActive,
                    }),
                }),
                isActivating({
                    ...vars({
                        [activePassiveDecls.filter]: cssProps.filterActive,
                        [activePassiveDecls.anim]: cssProps.animActive,
                    }),
                }),
                isPassivating({
                    ...vars({
                        [activePassiveDecls.filter]: cssProps.filterActive,
                        [activePassiveDecls.anim]: cssProps.animPassive,
                    }),
                }),
            ]),
        }),
        activePassiveRefs,
        activePassiveDecls,
    ];
};
export const markActive = () => style({
    ...imports([
        outlinedOf(false),
        mildOf(false),
        usesThemeActive(), // switch to active theme
    ]),
});
/**
 * Creates a conditional color definitions at active state.
 * @param themeName The name of active theme.
 * @returns A `Rule` represents the conditional color definitions at active state.
 */
export const usesThemeActive = (themeName = 'secondary') => usesThemeCond(themeName);
export const useActivePassiveState = (props) => {
    // fn props:
    const propActive = usePropActive(props, null);
    const isCheckbox = (props.tag === 'input') && (props.type === 'checkbox');
    // states:
    const [actived, setActived] = useState(propActive ?? false); // true => active, false => passive
    const [animating, setAnimating] = useState(null); // null => no-animation, true => activating-animation, false => deactivating-animation
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn = propActive /*controllable*/ ?? false;
    if (actived !== activeFn) { // change detected => apply the change & start animating
        setActived(activeFn); // remember the last change
        setAnimating(activeFn); // start activating-animation/deactivating-animation
    }
    const handleIdle = () => {
        // clean up finished animation
        setAnimating(null); // stop activating-animation/deactivating-animation
    };
    return {
        /**
         * partially/fully active
        */
        active: actived,
        class: (() => {
            // activating:
            if (animating === true) {
                // if (isCheckbox) {
                //     // a checkbox uses pseudo :checked for activating
                //     // not needed using class .active
                //     return null;
                // }
                // else {
                //     // a generic_element uses class .active for activating
                //     return 'active';
                // } // if
                return 'active';
            } // if
            // passivating:
            if (animating === false)
                return 'passive';
            // fully actived:
            if (actived)
                return 'actived';
            // fully passived:
            return null;
        })(),
        props: (isCheckbox ? {
            // a checkbox uses pseudo :checked for activating
            checked: actived,
        } : {}),
        handleAnimationEnd: (e) => {
            if (e.target !== e.currentTarget)
                return; // no bubbling
            if (/((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};
const togglerActiveReducer = (state, newActive) => {
    // fn props:
    const { enabled, readOnly, active } = state.propAccess;
    if (!enabled)
        return state; // control is disabled => no response required
    if (readOnly)
        return state; // control is readOnly => no response required
    const activeFn = active /*controllable*/ ?? state.activeTg /*uncontrollable*/;
    const newActiveValue = (typeof newActive === 'function') ? newActive(activeFn) : newActive;
    if (newActiveValue === activeFn)
        return state; // no change needed
    {
        const { onActiveChange, changeEventTarget } = state;
        // fire change event:
        onActiveChange?.(newActiveValue); // __notify_changed__ -or- __request_to_change__
        // fire change event:
        if (changeEventTarget?.current) {
            changeEventTarget.current.checked = newActiveValue;
            triggerChange(changeEventTarget.current);
        } // if
    }
    // save the changes:
    if (active !== null) { // controllable [active] is set => no set uncontrollable required
        return state; // discard changes
        // the actual changes relies on __request_to_change__
    }
    else {
        return { ...state, activeTg: newActiveValue }; // set dynamic (uncontrollable)
    } // if
};
export const useTogglerActive = (props, changeEventTarget) => {
    // fn props:
    const propAccess = usePropAccessibility(props, undefined, undefined, null);
    // states:
    const [state, setActive] = useReducer(togglerActiveReducer, /*initialState: */ {
        propAccess: propAccess,
        onActiveChange: props.onActiveChange,
        changeEventTarget: changeEventTarget,
        activeTg: props.defaultActive ?? false, // uncontrollable (dynamic) state: true => user activate, false => user deactivate
    });
    state.propAccess = propAccess;
    state.onActiveChange = props.onActiveChange;
    state.changeEventTarget = changeEventTarget;
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn = propAccess.active /*controllable*/ ?? state.activeTg /*uncontrollable*/;
    return [
        activeFn,
        setActive,
    ];
};
//#endregion activePassive
// styles:
export const usesIndicatorLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesIndicatorVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            // layouts:
            sizes(),
        ]),
    });
};
export const usesIndicatorStates = () => {
    // dependencies:
    // states:
    const [enableDisable] = usesEnableDisableState();
    const [activePassive] = usesActivePassiveState();
    return style({
        ...imports([
            // states:
            enableDisable(),
            activePassive(),
        ]),
        ...states([
            isActive({
                ...imports([
                    markActive(),
                ]),
            }),
        ]),
    });
};
export const useIndicatorSheet = createUseSheet(() => [
    mainComposition(imports([
        // layouts:
        usesIndicatorLayout(),
        // variants:
        usesIndicatorVariants(),
        // states:
        usesIndicatorStates(),
    ])),
], /*sheetId :*/ '9i8stbnt0e'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, , , propsManager] = usesAnim();
    const filters = propsManager.filters();
    const [, { filter: filterEnableDisable }] = usesEnableDisableState();
    const [, { filter: filterActivePassive }] = usesActivePassiveState();
    //#region keyframes
    const keyframesDisable = {
        from: {
            filter: [[
                    ...filters.filter((f) => (f !== filterEnableDisable)),
                    // filterEnableDisable, // missing the last => let's the browser interpolated it
                ].map(fallbackNoneFilter)],
        },
        to: {
            filter: [[
                    ...filters.filter((f) => (f !== filterEnableDisable)),
                    filterEnableDisable, // existing the last => let's the browser interpolated it
                ].map(fallbackNoneFilter)],
        },
    };
    const keyframesEnable = {
        from: keyframesDisable.to,
        to: keyframesDisable.from,
    };
    const keyframesActive = {
        from: {
            filter: [[
                    ...filters.filter((f) => (f !== filterActivePassive)),
                    // filterActivePassive, // missing the last => let's the browser interpolated it
                ].map(fallbackNoneFilter)],
        },
        to: {
            filter: [[
                    ...filters.filter((f) => (f !== filterActivePassive)),
                    filterActivePassive, // existing the last => let's the browser interpolated it
                ].map(fallbackNoneFilter)],
        },
    };
    const keyframesPassive = {
        from: keyframesActive.to,
        to: keyframesActive.from,
    };
    //#endregion keyframes
    return {
        //#region animations
        filterDisable: [['grayscale(50%)', 'contrast(50%)']],
        filterActive: 'initial',
        '@keyframes enable': keyframesEnable,
        '@keyframes disable': keyframesDisable,
        '@keyframes active': keyframesActive,
        '@keyframes passive': keyframesPassive,
        animEnable: [['300ms', 'ease-out', 'both', keyframesEnable]],
        animDisable: [['300ms', 'ease-out', 'both', keyframesDisable]],
        animActive: [['150ms', 'ease-out', 'both', keyframesActive]],
        animPassive: [['300ms', 'ease-out', 'both', keyframesPassive]],
        //#endregion animations
    };
}, { prefix: 'indi' });
export function Indicator(props) {
    // styles:
    const sheet = useIndicatorSheet();
    // states:
    const enableDisableState = useEnableDisableState(props);
    const activePassiveState = useActivePassiveState(props);
    // fn props:
    const propAccess = usePropAccessibility(props);
    // jsx:
    return (React.createElement(Basic, { ...props, 
        // variants:
        mild: props.mild ?? true, 
        // classes:
        mainClass: props.mainClass ?? sheet.main, stateClasses: [...(props.stateClasses ?? []),
            enableDisableState.class,
            activePassiveState.class,
        ], ...enableDisableState.props, ...activePassiveState.props, 
        // events:
        onAnimationEnd: (e) => {
            props.onAnimationEnd?.(e);
            // states:
            enableDisableState.handleAnimationEnd(e);
            activePassiveState.handleAnimationEnd(e);
        } }, props.children && React.createElement(AccessibilityProvider, { ...propAccess }, props.children)));
}
export { Indicator as default };
