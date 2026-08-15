Ext.define('Cuenta.model.SoftguardCuentaModel', {
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
                defaultValue: 3001
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
                defaultValue: 'Cuenta'
        },
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'cue_cnombre',type:'string', convert:function(v,r){
            var nombre = v;
            if (nombre)
            return JSON.parse('"' + nombre.replace(/\"/g, '\\"') + '"')
            else
            return nombre
        }},
        {name:'_cuenta',type:'string'},
        {name:'cue_ccalle',type:'string'},
        {name:'cue_clocalidad',type:'string'},
        {name:'cue_cprovincia',type:'string'},
        {name:'cue_ccodigopostal',type:'string'},
        {name:'cue_ccallecorreo',type:'string'},
        {name:'cue_clocalidadcorreo',type:'string'},
        {name:'cue_cprovinciacorreo',type:'string'},
        {name:'cue_ccodigopostalcorreo',type:'string'},
        {name:'cue_ctelefono',type:'string'},
        {name:'cue_cclave',type:'string'},
        {name:'cue_cpermiso',type:'string'},
        {name:'cue_ctipo',type:'string'},
        {name:'cue_cubicacion',type:'string'},
        {name:'cue_nparticion',type:'int',defaultValue:0},
        {name:'cue_cobservacion',type:'string'},
        {name:'cue_cfoto',type:'string'},
        {name:'cue_dfechaalta',type:'date', dateFormat:'MS'},
        {name:'cue_dservicio',type:'date', dateFormat:'MS'},
        {name:'cue_nmostrar',type:'int',defaultValue:1},
        {name:'cue_nsonidoul',type:'int',defaultValue:0},
        {name:'cue_nllaveul',type:'int',defaultValue:0},
        {name:'cue_cemail',type:'string'},
        {name:'cue_cinstalador',type:'string'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_cLatLng',type:'string'},
        {name:'Situacion',type:'string'},
        {name:'cue_nEfectiva',type:'int',defaultValue:0},
        {name:'cue_cIdExtendido',type:'string'},
        {name:'cue_iZonaHoraria',type:'int',defaultValue:0},
        {name:'cue_cPartitionInfo',type:'string'},
        {name:'cue_iid',type:'int',mapping:'Id'},
        {name:'cue_nAutoMonitoreo',type:'int',defaultValue:2},
        {name:'cue_nPrioridad',type:'int'},        
        {name:'cue_cCustom',type:'string'}
        
    ],
    
    validations: [
        {type: 'presence',  field: 'cue_dfechaalta'},
        {type: 'presence',  field: 'cue_dservicio'},
        {type: 'presence',  field: 'cue_clinea'},
        {type: 'presence',  field: 'cue_ncuenta'},
        {type: 'presence',  field: 'cue_cnombre'}/*,
        {type: 'length',    field: 'name',     min: 2},
        {type: 'inclusion', field: 'gender',   list: ['Male', 'Female']},
        {type: 'exclusion', field: 'username', list: ['Admin', 'Operator']},
        {type: 'format',    field: 'username', matcher: /([a-z]+)[0-9]{2,3}/}*/
    ],
    
    proxy: {
        type: 'rest',
        url: '/rest/cuenta/',
        
        appendId: true
    },
    
    /**
     * Carga el search de cuenta 
     */
    loadCuentaSearch: function (callback) {
        
        var record = this;
        
        
        var cuentaStore =Ext.create('Ext.data.Store',{
            model: 'Common'+'.model.CuentaSearchModel',
            remoteFilter: true,
            filters: [
                    {
                        property:'cue_iid',
                        value: record.get('cue_iid')
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
        
    },

});

																
