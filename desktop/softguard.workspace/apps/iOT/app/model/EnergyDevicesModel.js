Ext.define('iOT.model.EnergyDevicesModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'ped_idCta', type: 'int' },
        { name: 'ped_cUri', type: 'string' },
        { name: 'ped_cDeviceID', type: 'string' },
        { name: 'ped_cLabel', type: 'string' },
        { name: 'ped_cName', type: 'string' },
        { name: 'ped_iVarCount', type: 'string' },
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/p_EnergyDevices/',
        appendId: true
    }
});