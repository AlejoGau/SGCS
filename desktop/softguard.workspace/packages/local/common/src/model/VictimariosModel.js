//MIGRADO2024
Ext.define('Common.model.VictimariosModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {name: 'Id',type: 'int'},
        {name: 'Name', type: 'string'},
        {name: 'ObjectTypeName', type: 'string', defaultValue: 'victimarios'},
        {name: 'vic_idKey', type:'int', defaultValue:0},
        {name: 'vic_cApellido', type:'string'},
        {name: 'vic_cNombre', type:'string'},
        {name: 'vic_cIdentificacion', type:'string'},
        {name: 'vic_cCalle', type:'string'}, 
        {name: 'vic_cCalleNro', type:'string'},        
        {name: 'vic_cCallePiso', type:'string'},
        {name: 'vic_cCalleDpto', type:'string'},
        {name: 'vic_cCodigoPostal', type:'string'},
        {name: 'vic_cPartido', type:'string'},
        {name: 'vic_cLocalidad', type:'string'},
        {name: 'vic_cUbicacion', type:'string'},
        {name: 'vic_cPathPicture', type:'string'},
        {name: 'vic_iStatus', type:'int'},
        {name: 'vic_tFechaAlta', type:'date'},
        {name: 'vic_iEdad', type:'int', defaultValue:''},
        {name: 'vic_iPeso', type:'int', defaultValue:''},
        {name: 'vic_iAltura', type:'int'},
        {name: 'vic_iAspectoRaza', type:'int', defaultValue:0},
        {name: 'vic_iAspectoTez', type:'int', defaultValue:0},
        {name: 'vic_iAspectoContextura', type:'int', defaultValue:0},
        {name: 'vic_iCabelloTipo', type:'int', defaultValue:0},
        {name: 'vic_iCabelloColor', type:'int', defaultValue:0},
        {name: 'vic_iCabelloEstilo', type:'int', defaultValue:0},
        {name: 'vic_iRostroForma', type:'int', defaultValue:0},
        {name: 'vic_iRestriccion', type:'int'},
        {name: 'vic_iOjosForma', type:'int', defaultValue:0},
        {name: 'vic_iOjosColor', type:'int', defaultValue:0},
        {name: 'vic_iNarizFrente', type:'int', defaultValue:0},
        {name: 'vic_iNarizPerfil', type:'int', defaultValue:0},
        {name: 'vic_iNarizSize', type:'int', defaultValue:0},
        {name: 'vic_iBocaLabios', type:'int', defaultValue:0},
        {name: 'vic_iBocaSize', type:'int', defaultValue:0},
        {name: 'vic_iMentonForma', type:'int', defaultValue:0},
        {name: 'vic_iOrejasForma', type:'int', defaultValue:0},
        {name: 'vic_iOrejasSize', type:'int', defaultValue:0},
        {name: 'vic_iCejasForma', type:'int', defaultValue:0},
        {name: 'vic_iCejasSize', type:'int', defaultValue:0},
        {name: 'vic_iPilosidadTipo', type:'int', defaultValue:0},
        {name: 'vic_iPilosidadForma', type:'int', defaultValue:0},
        {name: 'vic_cObservaciones', type:'string'},
        {name: 'vic_cCaractSocial', type:'string'},
        {name: 'vic_cAdicciones', type:'string'}
    ],
    proxy : {
        
    	type : 'rest',
		url : '/rest/m_Victimarios'
	},
    loadCuentaSearch: function (callback) {
        
        var record = this;
        
        
        var cuentaStore =Ext.create('Ext.data.Store',{
            model: 'Common.model.victimariosSearchModel',
            remoteFilter: true,
            filters: [
                    {
                        property:'Id',
                        value: record.get('Id')
                    }
                ]
        }).load({callback:function (records) {
            if(records) {
                record._recordCuentaFull = records[0];
            } else {
                record._recordCuentaFull = null;
            }
            callback(record._recordCuentaFull);
            return true;
            
        }});
        
    }
});