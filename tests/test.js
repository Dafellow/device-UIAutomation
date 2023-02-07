import deviceMainPage from './PageModel/BasePage';
import addDevicePage from './PageModel/AddDevicePage';

const devicesClientAppURL = 'http://localhost:3001';
const devicesServerAppURL = 'http://localhost:3000';
const deviceNameUpdate    = 'Renamed Device';
const deviceName          = 'DAVID-LOCAL';
const deviceType          = 'MAC';
const deviceCapacity      = '100';

fixture `Validate main Device functionalities on web page`
    .page(devicesClientAppURL);

test('Validate devices list sync with backend.', async t => {
    const devicesInformation = await t.request(devicesServerAppURL + `/devices`);
    const devicesList = devicesInformation.body;
    for (let device; device < devicesInformation.body.length; device++){
        await t
            .expect(deviceMainPage.deviceName[device]).contains(devicesList.system_name)
            .expect(deviceMainPage.deviceType[device]).contains(devicesList.type)
            .expect(deviceMainPage.deviceCapacity[device].textContent).contains(devicesList.hdd_capacity)
            .expect(deviceMainPage.editButton.exists).ok()
            .expect(deviceMainPage.deleteButton.exists).ok();
    }  
});


test('Validate a device can be added successfully', async t => {
    await   t
            .click(deviceMainPage.addDeviceButton)
            .typeText(addDevicePage.systemName, deviceName)
            .click(addDevicePage.deviceType)
            .click(addDevicePage.deviceOptions.withText(deviceType))
            .typeText(addDevicePage.hddCapacity, deviceCapacity)
            .click(addDevicePage.saveButton)
            .expect(deviceMainPage.deviceName.withText(deviceName).exists).ok()
            .expect(deviceMainPage.deviceType.withText(deviceType).exists).ok()
            .expect(deviceMainPage.deviceCapacity.withText(deviceCapacity).exists).ok();
});


test('Validate the rename of the first device of the list', async t => {
    const devicesInformation = await t.request(devicesServerAppURL + `/devices`);
    const firstDeviceId = devicesInformation.body[0].id;
    const firstDeviceCapacity = devicesInformation.body[0].hdd_capacity;
    const firstDeviceType = devicesInformation.body[0].type;
    await t.request({
                url: devicesServerAppURL + `/devices/` + firstDeviceId,
                method: 'PUT',
                body: {system_name: deviceNameUpdate, type: firstDeviceType, hdd_capacity: firstDeviceCapacity}
            });
    await t
            .navigateTo(devicesClientAppURL)
            .expect(deviceMainPage.deviceName.withText(deviceNameUpdate).exists).ok();
});


test('Validate the delete function on the last element', async t => {
    const devicesInformation = await t.request(devicesServerAppURL + `/devices`);
    const lastDeviceId = devicesInformation.body[devicesInformation.body.length-1].id;
    const lastDeviceName = devicesInformation.body[devicesInformation.body.length-1].system_name;
    await t.request({
                url: devicesServerAppURL + `/devices/` + lastDeviceId,
                method: 'DELETE'
            });
    await t
            .navigateTo(devicesClientAppURL)
            .expect(deviceMainPage.deviceName.withText(lastDeviceName).exists).notOk();
});
