 
Ext.define('Common.model.SmartMailSenderModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
 defaultValue: 504
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
 defaultValue: 'SmartMailSender'
        },
 /** Daniel O. Medina
  * 
  * 
  * 
  */
 {name:'AccountName',type:'string'},
 {name:'PopServer',type:'string'},
 {name:'PopPort',type:'string'},
 {name:'PortSsh',type:'int',defaultValue:0},
 {name:'SmtpServer',type:'string'},
 {name:'SmtpPort',type:'string'},
 {name:'SmtpSsh',type:'int',defaultValue:0},
 {name:'Signature',type:'string'},
 {name:'completeName', type:'string', persist: false,convert: function(v, record){
     return record.get('Name') + ' <'+record.get('AccountName')+'>';
 }}
        ],
 proxy: {
         type : 'rest',
         reader: {
             type : 'json',
             rootProperty : 'rows',
             totalProperty : 'total'
         },
         url : '/Rest/SmartMailSender/',
         appendId : true,
         writer: {writeAllFields: true}
 
     }
 });
 