Ext.define('SgAppWebReport.model.GeographyOrgGridModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'string'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
    	defaultValue: 603
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Geography'
        },
		{name:'Parent',type:'int',defaultValue:0},
		{name:'Level',type:'int',defaultValue:0},
		{name:'FirstParent',type:'int',defaultValue:0},
		{name:'ShortName',type:'string'},
		{name:'StandardName',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Geography/',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        /*buildUrl: function(request){
                var url = '/Rest/Geography/';
                var action = request.action;
                var operation = request.operation;
                
                if (action != 'read' && action != 'create')
                    url = url+operation.records[0].get('Id');
                    
                return url;
        	}*/
		}
});