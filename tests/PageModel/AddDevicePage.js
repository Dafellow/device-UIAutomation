import { Selector } from 'testcafe';

class AddDevicePage {
    constructor () {
        this.systemName     =   Selector('#system_name');
        this.deviceType     =   Selector('#type');
        this.hddCapacity    =   Selector('#hdd_capacity');
        this.deviceOptions  =   Selector('option');
        this.saveButton     =   Selector('button.submitButton');
    }
}

export default new AddDevicePage();
