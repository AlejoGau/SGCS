Ext.define('GestorSim.model.ComandosGpsSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'tcm_iid',
    fields: [{
        name: 'tcm_iid',
        type: 'int'
        },
        {
        name: 'tcm_cdescripcion',
        type: 'string'
        },
        {
        name: 'tcm_cinterno',
        type: 'string'
        },
        {
        name: 'tcm_iReceptor',
        type: 'int'
        },
        {
        name: 'tcm_nEsGPS',
        type: 'int'
        },
        {
        name: 'tcm_nParametros',
        type: 'int'
        },
        {
        name: 'tcm_cValores',
        type: 'string'
        },
        {
        name: 'tcm_cComando',
        type: 'string'
        },
        {
        name: 'tcm_iEsCustom',
        type: 'int'
        }
        ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/Search/TGComandos',
		appendId : true
		}
});