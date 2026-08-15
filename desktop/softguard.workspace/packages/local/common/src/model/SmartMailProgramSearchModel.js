//MIGRADO2024
Ext.define('Common.model.SmartMailProgramSearchModel', {
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
        defaultValue: 500
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'SmartMailProgram'
        },
		{name:'From',type:'string'},
        {name:'Body',type:'string'},
        {name:'DateStart',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        {name:'DateEnd',type:'date'},
        {name:'IsoDateStart',type:'date', dateFormat:'c'},
        {name:'IsoDateEnd',type:'date', dateFormat:'c'},
        {name:'Count',type:'int',defaultValue:0},
        {name:'Status',type:'string', defaultValue: 'I'},
        {name:'To',type:'string', convert:function(v,r){
            var re = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/ig;
            var result = re.exec(r.get('Query'));
            if(result && result != '' && result.length>0) {
                return result[0];    
            } else {
                return '';
            }
            
        }},
        {name:'Query',type:'string'},
        {name:'TransportType',type:'string', defaultvalue: 'MAIL'},
        {name:'Recurrent', type:'bool', defaultValue: false},
        {name:'Priority',type:'int',defaultValue:0},
        {name:'_Priority',type:'string', convert: function (v,r) {
            var priority = parseInt(r.get('Priority'));
            
            if(priority >= 900 && priority <= 909) {
                return getLocale('Todo mail x evento');
            } else if (priority >= 801 && priority <= 809) {
                return getLocale('Mail x controles del sistema');
            } else if (priority == 700) {
                return getLocale('Envio de reportes por mail');
            } else if (priority <= 600) {
                return getLocale('CRM');
            } else {
                return getLocale('No define');
            }
        
            
        }},
       
        {name:'RecurrentType',type:'string'},
        {name:'RecurrentTime',type:'int',defaultValue:0},
        {name:'RecurrentDateEnd',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'cue_cnombre',type:'string'}
        /*
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
        {name:'cue_nparticion',type:'string'},
        {name:'cue_cobservacion',type:'string'},
        {name:'cue_cfoto',type:'string'},
        {name:'cue_dfechaalta',type:'string'},
        {name:'cue_dservicio',type:'string'},
        {name:'cue_nmostrar',type:'string'},
        {name:'cue_nsonidoul',type:'string'},
        {name:'cue_nllaveul',type:'string'},
        {name:'cue_cemail',type:'string'},
        {name:'cue_cinstalador',type:'string'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_cLatLng',type:'string'},
        {name:'cue_nEfectiva',type:'string'},
        {name:'cue_cIdExtendido',type:'string'},
        {name:'cue_iZonaHoraria"',type:'string'},
        {name:'cue_cPartitionInfo',type:'string'}
        */
      
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/SmartMailProgramCuenta',
		appendId : true
	}
});
