import { Selector } from 'testcafe';

class BasePage {
    constructor () {
        this.deviceName =       Selector('span.device-name');
        this.deviceType =       Selector('span.device-type');
        this.deviceCapacity =   Selector('span.device-capacity');
        this.editButton =       Selector('a.device-edit');
        this.deleteButton =     Selector('button.device-remove');
        this.addDeviceButton =  Selector('a.submitButton');
    }
}

export default new BasePage();