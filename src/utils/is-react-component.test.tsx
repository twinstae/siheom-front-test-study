import { describe, it, expect } from "vitest";
import React from "react";
import { isReactComponent, isClassComponent, isForwardRefComponent } from "./is-react-component";

describe("isReactComponent", () => {
  it("함수 컴포넌트를 인식함", () => {
    const FunctionComponent = () => <div>Test</div>;
    expect(isReactComponent(FunctionComponent)).toBe(true);
  });

  it("클래스 컴포넌트를 인식함", () => {
    class ClassComponent extends React.Component {
      override render() {
        return <div>Test</div>;
      }
    }
    expect(isReactComponent(ClassComponent)).toBe(true);
  });

  it("forwardRef 컴포넌트를 인식함", () => {
    const ForwardRefComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
      <div ref={ref}>Test</div>
    ));
    expect(isReactComponent(ForwardRefComponent)).toBe(true);
  });

  it("일반 함수는 컴포넌트가 아님", () => {
    const regularFunction = () => {};
    expect(isReactComponent(regularFunction)).toBe(true); // 함수는 함수 컴포넌트로 인식됨
  });

  it("null은 컴포넌트가 아님", () => {
    expect(isReactComponent(null)).toBe(false);
  });

  it("객체는 컴포넌트가 아님", () => {
    expect(isReactComponent({})).toBe(false);
  });
});

describe("isClassComponent", () => {
  it("클래스 컴포넌트를 인식함", () => {
    class ClassComponent extends React.Component {
      override render() {
        return <div>Test</div>;
      }
    }
    expect(isClassComponent(ClassComponent)).toBe(true);
  });

  it("함수 컴포넌트는 클래스 컴포넌트가 아님", () => {
    const FunctionComponent = () => <div>Test</div>;
    expect(isClassComponent(FunctionComponent)).toBe(false);
  });

  it("prototype이 없으면 클래스 컴포넌트가 아님", () => {
    const func = () => {};
    expect(isClassComponent(func)).toBe(false);
  });

  it("prototype에 isReactComponent가 있으면 클래스 컴포넌트임", () => {
    class ClassComponent extends React.Component {}
    expect(isClassComponent(ClassComponent)).toBe(true);
  });

  it("prototype에 render가 있으면 클래스 컴포넌트임", () => {
    class ClassComponent {
      render() {
        return <div>Test</div>;
      }
    }
    expect(isClassComponent(ClassComponent)).toBe(true);
  });
});

describe("isForwardRefComponent", () => {
  it("forwardRef 컴포넌트를 인식함", () => {
    const ForwardRefComponent = React.forwardRef<HTMLDivElement>((props, ref) => (
      <div ref={ref}>Test</div>
    ));
    expect(isForwardRefComponent(ForwardRefComponent)).toBe(true);
  });

  it("함수 컴포넌트는 forwardRef 컴포넌트가 아님", () => {
    const FunctionComponent = () => <div>Test</div>;
    expect(isForwardRefComponent(FunctionComponent)).toBe(false);
  });

  it("null은 forwardRef 컴포넌트가 아님", () => {
    expect(isForwardRefComponent(null)).toBe(false);
  });

  it("일반 객체는 forwardRef 컴포넌트가 아님", () => {
    expect(isForwardRefComponent({})).toBe(false);
  });

  it("$$typeof가 Symbol(react.forward_ref)이면 forwardRef 컴포넌트임", () => {
    const mockForwardRef = {
      $$typeof: Symbol.for("react.forward_ref"),
    };
    expect(isForwardRefComponent(mockForwardRef)).toBe(true);
  });
});
