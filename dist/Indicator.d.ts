import { default as React } from 'react';
import type { PropEx } from '@cssfn/css-types';
import { StyleCollection } from '@cssfn/cssfn';
import { AccessibilityProps } from '@nodestrap/accessibilities';
import type { SemanticProps } from '@nodestrap/element';
import { ThemeName, BasicProps } from '@nodestrap/basic';
export interface EnableDisableVars {
    filter: any;
    anim: any;
}
export declare const isEnabled: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isEnabling: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isDisabling: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isDisabled: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isEnable: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isDisable: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isEnablingDisable: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Uses enable & disable states.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents enable & disable state definitions.
 */
export declare const usesEnableDisableState: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<EnableDisableVars>, import("@cssfn/css-var").ReadonlyDecls<EnableDisableVars>];
export declare const useEnableDisableState: (props: IndicationProps & SemanticProps) => {
    enabled: boolean;
    disabled: boolean;
    class: string | null;
    props: {
        disabled: boolean;
        'aria-disabled'?: undefined;
    } | {
        'aria-disabled': boolean | undefined;
        disabled?: undefined;
    };
    handleAnimationEnd: (e: React.AnimationEvent<HTMLElement>) => void;
};
export interface ActivePassiveVars {
    filter: any;
    anim: any;
}
export declare const isActived: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isActivating: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isPassivating: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isPassived: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isActive: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isPassive: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isActivePassivating: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Uses active & passive states.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents active & passive state definitions.
 */
export declare const usesActivePassiveState: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<ActivePassiveVars>, import("@cssfn/css-var").ReadonlyDecls<ActivePassiveVars>];
export declare const markActive: () => import("@cssfn/cssfn").Rule;
/**
 * Creates a conditional color definitions at active state.
 * @param themeName The name of active theme.
 * @returns A `Rule` represents the conditional color definitions at active state.
 */
export declare const usesThemeActive: (themeName?: ThemeName | null) => import("@cssfn/cssfn").Rule;
export declare const useActivePassiveState: (props: IndicationProps & SemanticProps) => {
    /**
     * partially/fully active
    */
    active: boolean;
    class: string | null;
    props: {
        checked: boolean;
    } | {
        checked?: undefined;
    };
    handleAnimationEnd: (e: React.AnimationEvent<HTMLElement>) => void;
};
export interface TogglerActiveProps<TActiveChangeArg = unknown> extends IndicationProps {
    defaultActive?: boolean;
    onActiveChange?: (newActive: boolean, arg?: TActiveChangeArg) => void;
}
export declare const useTogglerActive: <TActiveChangeArg extends unknown = unknown>(props: TogglerActiveProps<TActiveChangeArg>, changeEventTarget?: React.RefObject<HTMLInputElement> | null | undefined) => [boolean, React.Dispatch<React.SetStateAction<boolean>>];
export declare const usesIndicatorLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesIndicatorVariants: () => import("@cssfn/cssfn").Rule;
export declare const usesIndicatorStates: () => import("@cssfn/cssfn").Rule;
export declare const useIndicatorSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    filterDisable: string[][];
    filterActive: string;
    '@keyframes enable': PropEx.Keyframes;
    '@keyframes disable': PropEx.Keyframes;
    '@keyframes active': PropEx.Keyframes;
    '@keyframes passive': PropEx.Keyframes;
    animEnable: (string | PropEx.Keyframes)[][];
    animDisable: (string | PropEx.Keyframes)[][];
    animActive: (string | PropEx.Keyframes)[][];
    animPassive: (string | PropEx.Keyframes)[][];
}>, cssDecls: import("@cssfn/css-config").Decls<{
    filterDisable: string[][];
    filterActive: string;
    '@keyframes enable': PropEx.Keyframes;
    '@keyframes disable': PropEx.Keyframes;
    '@keyframes active': PropEx.Keyframes;
    '@keyframes passive': PropEx.Keyframes;
    animEnable: (string | PropEx.Keyframes)[][];
    animDisable: (string | PropEx.Keyframes)[][];
    animActive: (string | PropEx.Keyframes)[][];
    animPassive: (string | PropEx.Keyframes)[][];
}>, cssVals: import("@cssfn/css-config").Vals<{
    filterDisable: string[][];
    filterActive: string;
    '@keyframes enable': PropEx.Keyframes;
    '@keyframes disable': PropEx.Keyframes;
    '@keyframes active': PropEx.Keyframes;
    '@keyframes passive': PropEx.Keyframes;
    animEnable: (string | PropEx.Keyframes)[][];
    animDisable: (string | PropEx.Keyframes)[][];
    animActive: (string | PropEx.Keyframes)[][];
    animPassive: (string | PropEx.Keyframes)[][];
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface IndicationProps extends AccessibilityProps {
}
export interface IndicatorProps<TElement extends HTMLElement = HTMLElement> extends BasicProps<TElement>, IndicationProps {
}
export declare function Indicator<TElement extends HTMLElement = HTMLElement>(props: IndicatorProps<TElement>): JSX.Element;
export { Indicator as default };
