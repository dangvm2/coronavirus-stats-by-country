import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./App";
import DataTable from "./pages/DataTable";
import { SearchBox } from "./components/SearchBox";
import SearchResult from "./components/SearchResult";
import { formatDate, formatNumber } from "./helpers/commonFunc";

//START: mock import library
jest.mock("react-router-dom", () => ({
  Route: () => ({}),
  Switch: () => [],
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({}),
}));
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));
//END: mocking import library

describe("Tests for App", () => {
  test("Should render Overview Link on default route", () => {
    render(<App />);
    const linkElement = screen.getByText(/Overview/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Should render DataTable Link", () => {
    render(<App />);
    const linkElement = screen.getByText(/Data Table/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe("Tests for DataTable page", () => {
  test("should render SearchBox", () => {
    const wrapper = shallow(<DataTable />);
    const comp = wrapper.find(SearchBox);
    expect(comp.exists()).toBe(true);
  });

  test("should render SearchResult", () => {
    const wrapper = shallow(<DataTable />);
    const comp = wrapper.find(SearchResult);
    expect(comp.exists()).toBe(true);
  });
});

describe("Tests for Common Function", () => {
  //Format Date
  test("Format undefined value", () => {
    expect(formatDate(undefined)).toBe("");
  });
  test("Format empty date", () => {
    expect(formatDate("")).toBe("");
  });
  test("Format invalid date", () => {
    expect(formatDate("abc123")).toBe("");
  });
  test("Format valid date", () => {
    expect(formatDate("2020-04-05T06:37:00Z")).toBe("13:37, 05 Apr 2020");
  });
  //Format Number
  test("Format undefined value", () => {
    expect(formatNumber(undefined)).toBe("0");
  });
  test("Format empty string", () => {
    expect(formatNumber("")).toBe("0");
  });
  test("Format string", () => {
    expect(formatNumber("")).toBe("0");
  });
  test("Format valid number", () => {
    expect(formatNumber(123456789)).toBe("123,456,789");
  });
});
