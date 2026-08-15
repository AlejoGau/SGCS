//MIGRADO2024
Ext.define('Common.model.RoutesProgramSearchModel', {
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
        defaultValue: 3119
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_categorizacion'
        },
        
		{name:'routeId',type:'int'},
        {name:'programtype',type:'int'},
        {name:'starthour',type:'int'},
        {name:'startminutes',type:'int'},
        {name:'dayofweek',type:'int'},
        {name:'dayofmonth',type:'int'},
        {name:'name',type:'string'}, //nombre de la ronda
        {name:'usu_cnombre',type: 'string'},
        {name:'_explicado',type:'string', convert:function (val, rec) {
           
            var horario = Ext.util.Format.leftPad(rec.get('starthour'),2,'0')+':'+Ext.util.Format.leftPad(rec.get('startminutes'),2,'0');
            
            if(rec.get('programtype') == 1) {
                return getLocale('Todos los dias en el horario: ')+horario
            } else if(rec.get('programtype') == 2) {
                return getLocale('De lunes a viernes en el horario: ')+horario
            } else if(rec.get('programtype') == 3) {
                var day = 'Domingo';
                var dayofweek = rec.get('dayofweek');
                if(dayofweek == 0) {
                    day = 'Domingo';
                } else if(dayofweek == 1) {
                    day = 'Lunes';
                } else if(dayofweek == 2) {
                    day = 'Martes';
                } else if(dayofweek == 3) {
                    day = 'Miercoles';
                } else if(dayofweek == 4) {
                    day = 'Jueves';
                } else if(dayofweek == 5) {
                    day = 'Viernes';                    
                } else if(dayofweek == 6) {
                    day = 'Sabado';                
                }
                    
                return getLocale('El dia ')+day+getLocale(' en el horario: ')+horario
            } else if(rec.get('programtype') == 4) {
                return getLocale('Todos los meses en el dia ')+rec.get('dayofmonth')+getLocale(' en el horario: ')+horario
            } else {
                return '-----';
            }
            
            
        }},
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/VC_Route_Programs',
		appendId : true
	}
});