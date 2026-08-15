Ext.define('GestorSim.model.SimCardTimeLineModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Stl_idkey',
        type: 'int'
        },
        {
            name: 'Stl_simcardidkey',
            type: 'int'
        },        

        { 
            name: 'Stl_tFechaHora', 
            type: 'date', dateFormat: 'c' 
            
        },

        {
            name: 'Stl_cAccion',
            type: 'int'
        },
        {
            name: 'Stl_cOriginal',
            type: 'string'
        },
        {
            name: 'Stl_cActualizado',
            type: 'string'
        },
        {
            name: 'Stl_cUserDss',
            type: 'string'
        }
        
        ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/Search/SimcardTimeLineSearch',
		appendId : true
		}
});