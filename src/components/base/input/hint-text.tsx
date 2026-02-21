import type { Ref } from "react";
import type { TextProps as AriaTextProps } from "react-aria-components";
import { Text as AriaText } from "react-aria-components";
import { cx } from "../../../utils/cx";
import { getErrorId } from "../../../week4/SimpleErrorMessage";

interface HintTextProps extends AriaTextProps {
  /** Indicates that the hint text is an error message. */
  isInvalid?: boolean;
  name: string;
  ref?: Ref<HTMLElement>;
  children: string;
}

export const HintText = ({ name, isInvalid, className, ...props }: HintTextProps) => {
  return (
    <AriaText
      {...props}
      id={getErrorId(name)}
      slot={isInvalid ? "errorMessage" : "description"}
      role={isInvalid ? "alert" : "description"}
      aria-label={props.children}
      className={cx(
        "text-sm text-tertiary",

        // Invalid state
        isInvalid && "text-error-primary",
        "group-invalid:text-error-primary",

        className,
      )}
    />
  );
};

HintText.displayName = "HintText";
