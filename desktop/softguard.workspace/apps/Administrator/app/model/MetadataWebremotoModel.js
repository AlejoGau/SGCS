Ext.define('Administrator.model.MetadataWebremotoModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'Usuario',  type: 'string'},
        {name: 'ope_iid',  type: 'int'},
        {name: 'AtenderAuto',  type: 'string'},
        {name: 'ControlOperador',  type: 'string'},
        {name: 'ControlOperadorHoraDesde',  type: 'string'},
        {name: 'ControlOperadorHoraHasta',  type: 'string'},
        {name: 'Filtros',  type: 'string'},
        {name: 'mostrarFiltros',  type: 'string'},                
        {name: 'EnvioSMSMasivo',  type: 'string'},
        {name: 'eventOrder',  type: 'string'},
        {name: 'eventOrderPriority',  type: 'string'},
        {name: 'colaborador',  type: 'string'},
        {name: 'EnvioSmsSimple',  type: 'string'},
        {name: 'Security',  type: 'string'},
        {name: 'SIPPROTOCOLTAG',  type: 'string'},
        {name: 'generadorEventos',  type: 'string'},  
        {name: 'rights',  type: 'string'},  
        {name: 'grabarLlamadasEntrantes',  type: 'string'},  
        {name: 'sonido',  type: 'string'},
        {name: 'nomutealarm',  type: 'string'},
        {name: 'sineventosdeposicion',  type: 'string'},      
        {name: 'supervision',  type: 'int'},
        {name: 'otrasorganizaciones',  type: 'string'},
        {name: 'asignaciones',  type: 'string'},
        {name: 'horaIngreso',  type: 'string'},
        // viejo        
        {name: 'procesartodos',  type: 'string'}, 
        {name: 'procesarporlote',  type: 'string'},
        {name: 'procesarmultiple',  type: 'string'},  
        {name: 'procesartodospendientes',  type: 'string'}, 
        {name: 'procesarporlotependientes',  type: 'string'},
        {name: 'procesarmultiplependientes',  type: 'string'}, 
        {name: 'procesartodosproceso',  type: 'string'}, 
        {name: 'procesarporloteproceso',  type: 'string'},
        {name: 'procesarmultipleproceso',  type: 'string'}, 
        /**
         * BC 390361159 : Se agrega permiso de ver o no bitacora al atender evento
         */
        {name: 'bitacora',  type: 'string'},
        {name: 'timeline',  type: 'string'},
        {name: 'notas',  type: 'string'},
        {name: 'tareasVC',  type: 'string'},
        {name: 'comandos',  type: 'string'},
        // net2phone
        {name: 'net2phone_extension',  type: 'string'},
        //{name: 'net2phone_callerid',  type: 'string'}
        {name: 'net2phone_callerid_name',  type: 'string'},
        {name: 'net2phone_callerid_number',  type: 'string'},

        //wildix
        {name: 'wildix_extension',  type: 'string'},
        {name: 'wildix_password',  type: 'string'},

        // informes
        {name: 'informeLlamada',  type: 'string'},
        {name: 'informeNotificaciones',  type: 'string'},
        {name: 'informeMultimedia',  type: 'string'},
        {name: 'informeHistorico',  type: 'string'},
        {name: 'informeSertec',  type: 'string'},

        // tiempo atención automática https://basecamp.com/2249105/projects/14758734/todos/422259466
        {name: 'tiempoatencion',  type: 'int'}
    ],
    proxy: {
        type: 'rest',
        url: '',
        appendId: false
    }
});
