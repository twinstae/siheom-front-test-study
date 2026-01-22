/* We cannot use type `unknown` instead of `any` here because it will break the type assertion `isReactComponent` function is providing. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";

type ReactComponent = React.FC<any> | React.ComponentClass<any, any>;

/**
 * Checks if a given value is a function component.
 */
export const isFunctionComponent = (component: any): component is React.FC<any> => {
  return typeof component === "function";
};

/**
 * Checks if a given value is a class component.
 */
export const isClassComponent = (component: any): component is React.ComponentClass<any, any> => {
  if (typeof component !== "function") {
    return false;
  }
  if (!component.prototype) {
    return false;
  }
  return !!(component.prototype.isReactComponent || component.prototype.render);
};

/**
 * Checks if a given value is a forward ref component.
 */
export const isForwardRefComponent = (
  component: any,
): component is React.ForwardRefExoticComponent<any> => {
  if (typeof component !== "object" || component === null) {
    return false;
  }
  if (!component.$$typeof) {
    return false;
  }
  return component.$$typeof.toString() === "Symbol(react.forward_ref)";
};

/**
 * Checks if a given value is a valid React component.
 */
export const isReactComponent = (component: any): component is ReactComponent => {
  return (
    isFunctionComponent(component) ||
    isForwardRefComponent(component) ||
    isClassComponent(component)
  );
};
