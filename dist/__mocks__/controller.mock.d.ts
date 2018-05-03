import { SomethingMock } from './something.mock';
/**
 * class ControllerMock
 */
declare class ControllerMock {
    /**
     * get something method
     * @param text
     */
    getSomething(text: string): Promise<SomethingMock>;
}
export { ControllerMock };
