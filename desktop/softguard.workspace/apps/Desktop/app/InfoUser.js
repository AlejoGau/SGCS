Ext.define('Desktop.model.infoUser', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'Company',  type: 'string'},
        {name: 'FirstName',   type: 'string'},
        {name: 'LastName', type: 'string'},
        {name: 'UserId', type: 'string'}
        
    ]
});