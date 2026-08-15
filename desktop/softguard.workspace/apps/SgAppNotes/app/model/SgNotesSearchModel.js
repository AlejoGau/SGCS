Ext.define('SgAppNotes.model.SgNotesSearchModel', {
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
		{name:'sgn_title',type:'string'},
        {name:'sgn_body',type:'string'},
        {name:'sgn_userid',type:'int',defaultValue:0},
        {name:'sgn_fileduserid',type:'int',defaultValue:0},
        {name:'sgn_status',type:'int',defaultValue:0},
        {name:'sgn_datecreated',type:'date'},
            //, dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        {name:'usu_cnombre_alta',type:'string'},
        {name:'usu_cnombre_filed',type:'string'},
        {name: 'udw_usuario',type: 'string'}
        ],
        proxy : {
            type : 'rest',
            reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
            },
            url : '/Rest/search/m_sgnotesSearch',
            appendId : false
        }
});

																
