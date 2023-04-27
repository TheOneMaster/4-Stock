import '@testing-library/jest-native/extend-expect'

global.__reanimatedWorkletInit = () => { };
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));
