


Ext.define('SgAppNotes.model.SgNotesModel', {
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
		defaultValue: 3222
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'm_sgnotes'
        },
		{name:'sgn_title',type:'string',defaultValue:'title'},
        {name:'sgn_body',type:'string'},
        {name:'sgn_userid',type:'int',defaultValue:0},
        
        {name:'sgn_fileduserid',type:'int',defaultValue:0},
        {name:'sgn_status',type:'int',defaultValue:0},
        {name:'sgn_datecreated',type:'date'
            , dateFormat:'MS', defaultValue: new Date()}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/m_sgnotes/',
        appendId : true,
        writer:{ writeAllFields:true }
		}
});

																
