Ext.define('WebMG.model.m_pagos_fcSearchModel', {
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
        defaultValue: 625
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'm_pagos_fc'
        },
		
        {name:'pag_iCodigoCbte',type:'int'},
        {name:'pag_iCodigoCaja',type:'int'},
        {name:'pag_cFormaPago',type:'int'},
        {name:'pag_iNumero',type:'string'},
        {name:'pag_cBanco',type:'int'},
        {name:'pag_dVencimiento',type:'date'},
        {name:'pag_yImporte',type:'string'},
        {name:'pag_cFirmante',type:'string'},
        
        {name:'cbc_iCodigo_ID',type:'string'},
        {name:'cbc_dFecha',type:'string'},
        {name:'cbc_iCliente',type:'string'},
        {name:'cbc_cTipoCbte',type:'string'},
        {name:'cbc_cPrefijoCbte',type:'string'},
        {name:'cbc_iNumeroCbte',type:'string'},
        {name:'cbc_ySubTotal',type:'string'},
        {name:'cbc_yImpuesto1',type:'string'},
        {name:'cbc_yImpuesto2',type:'string'},
        {name:'cbc_yImpuesto3',type:'string'},
        {name:'cbc_yTotal',type:'string'},
        {name:'cbc_cEstado',type:'string'},
        {name:'cbc_cCAE',type:'string'},
        {name:'cbc_cVtoCAE',type:'string'}
        
        ],

		
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/m_pagos_fc',
		appendId : true
		}
});