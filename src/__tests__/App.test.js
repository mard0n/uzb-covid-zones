import React from "react";
import { render, cleanup } from "@testing-library/react";
import DummyTest from '../common/test/index';

afterEach(cleanup);

it("should take a snapshot", () => {
  const { asFragment } = render(<DummyTest />);

  expect(asFragment()).toMatchSnapshot();
});
