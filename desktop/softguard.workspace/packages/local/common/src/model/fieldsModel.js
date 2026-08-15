//MIGRADO2024
Ext.define('Common.model.fieldsModel', {
   extend: 'Ext.data.Model',
   //idProperty: 'Id',
   fields: [
        {name:'xtype',type:'string'},
        {name:'fieldLabel',type:'string'},
        {name:'value',type:'string'},
        {name:'metaObject',type:'auto'}
   ]
   
});