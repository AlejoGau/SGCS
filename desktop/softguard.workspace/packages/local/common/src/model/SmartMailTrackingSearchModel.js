//MIGRADO2024
Ext.define('Common.model.SmartMailTrackingSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        { name: 'RowNumber', type: 'int' },
        { name: 'ProgramId', type: 'int' },
        { name: 'VersionId', type: 'int' },
        { name: 'EmailId', type: 'int' },
        { name: 'ObjectTypeId', type: 'int' },
        { name: 'ObjectId', type: 'int' },
        { name: 'Email', type: 'string' },
        { name: 'SentDate', type: 'date' },
        { name: 'Read', type: 'string' },
        { name: 'ReadDate', type: 'date' },
        { name: 'LastReadDate', type: 'date' },
        { name: 'QtyReadings', type: 'string' },
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'From', type: 'string' },
        { name: 'Body', type: 'string' },
        { name: 'DateStart', type: 'date' },
        { name: 'DateEnd', type: 'date' },
        { name: 'Count', type: 'int' },
        { name: 'Status', type: 'string' },
        { name: 'Query', type: 'string' },
        { name: 'TransportType', type: 'string' },
        { name: 'Recurrent', type: 'string' },
        { name: 'Priority', type: 'int' }
        ],
   
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/rest/search/SmartMailTrackingEmail',        
		appendId : true
	}
});