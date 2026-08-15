//MIGRADO2024
Ext.define('Common.model.SmsStatusModel', {
    extend: 'Ext.data.Model',
    idProperty: 'sms_1',
    fields: [
        {name:'sms_1',type:'int',defaultValue:0},
    	{name:'sms_2',type:'int',defaultValue:0},
    	{name:'sms_3',type:'int',defaultValue:0},
    	{name:'sms_4',type:'int',defaultValue:0}
	]
});