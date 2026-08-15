//MIGRADO2024
Ext.define('Common.model.DeleteLandingUserModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id', type: 'int'}
    ],
    
    proxy: {
        type: 'rest',
        url: '/rest/search/deleteLandingUser',
        appendId: true
    }
});