Ext.define('Logger.controller.MultiCuentaLllamadasGrabadasGridController', {
    extend : 'Ext.app.Controller',
    models : [ 'GrabacionAudioSearchModel', 'TablasOperadoresSearchModel', 'TablasCodigosAlarmaSearchModel' ],
    views : [ 'MultiCuentaLllamadasGrabadasGridView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
			'multicuentallamadasgrabadasview' : {
				afterrender : this.initView,
                selectedEvents: this.eventsSelected
			},
            'multicuentallamadasgrabadasview #buscargrabadas' : {
                click: this.onSearchClick
            },
            'multicuentallamadasgrabadasview #todosgrabadas' : {
                click: this.onTodosClick
            },
            'multicuentallamadasgrabadasview #evento': {
                click: this.onEventoClick
            }
		});
	}, // cierro init
    
    
    eventsSelected: function(record, view) { 
    }, 

    onEventoClick: function (btn) {
        var view = btn.up('generareventoformview');
        var myWindow = Ext.widget('window',{
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'eventselecterhelperview',
                eventSelected: view.eventosSeleccionados,
                caller: view,
                filter: [{property:'cod_nManual', id:'cod_nManual',value:1}],
                simpleSelect: true,
                closeAction: 'destroy'
            }],
            layout: 'fit'
        }).show();

        myWindow.on('selectedEvents',function () {
         console.log(arguments)
        })
    },

	initView : function(view) {
        var record = view.record;
        
        view.filter = [];
             
		view.store = Ext.create('Ext.data.Store', {
            model : this.getGrabacionAudioSearchModelModel(),
            remoteFilter: true,
        	autoload: false,
            filters: view.filter
        });
        
        
      //  var myGrid = view.down('#gridllamada');
        
       var toolbar = view.down('pagingtoolbar');
       toolbar.bindStore(view.store);
       view.bindStore(view.store);
       view.store.load();
        
        
        var store = KeyModulesStore;
        store.load({callback: function(){
          
            // *************   aun no existe ese permiso en las key *******************
           /* if (!store.isModuleAvailable('Logger')){
                notify('Ud. no posee los permisos necesarios para utilizar llamadas grabadas.')
                view.down('#gridllamada').setDisabled(true);
            }*/
            
        }})
        
        
        var operadorStore =Ext.create('Ext.data.Store',{
            model: this.getTablasOperadoresSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#comboOperadores').bindStore(operadorStore);
        
        operadorStore.load();
	},
    
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('multicuentallamadasgrabadasview');
      
        var filters = Ext.clone(view.filter);
        view.store.clearFilter(true);
        
        if(view.down('#nombre').getValue()) {
            
            
            filters.push( {
                property: 'cue_cnombre:LIKE',
                value: view.down('#nombre').getValue(),
                id:'nombre'
            })
        }
        
        
        if(view.down('#dealer').getValue()) {
            
            
            filters.push( {
                property: 'cue_clinea:LIKE',
                value: view.down('#dealer').getValue(),
                id:'dealer'
            })
        }
        
        
        if(view.down('#cuenta').getValue()) {
            
            
            filters.push( {
                property: 'cue_ncuenta:LIKE',
                value: view.down('#cuenta').getValue(),
                id:'cuenta'
            })
        }
        
        
        if(view.down('#comboOperadores').getValue()) {
            
            
            filters.push( {
                property: 'rec_ioperador:LIKE',
                value: view.down('#comboOperadores').getValue(),
                id:'operador'
            })
        }
       
        
        
        if(view.down('#eventos').getValue()) {            
            
            filters.push( {
                property: 'rec_calarma',
                value: view.down('#eventos').getValue(),
                id:'codigoalarma'
            })
        }
        
        var fdesde = Ext.Date.parse(Ext.Date.format(view.down('#fechadesde').getValue(),'Y-m-d')+' '+Ext.Date.format(view.down('#horadesde').getValue(),'h:i:s a'), 'Y-m-d h:i:s a');
        var fhasta = Ext.Date.parse(Ext.Date.format(view.down('#fechahasta').getValue(),'Y-m-d')+' '+Ext.Date.format(view.down('#horahasta').getValue(),'h:i:s a'), 'Y-m-d h:i:s a');

        const dateDesde = new Date(fdesde);
        const dateHasta = new Date(fhasta);

        const timestampDesde = dateDesde.getTime();
        const timestampHasta= dateHasta.getTime();


        const timezoneOffsetDesde = dateDesde.getTimezoneOffset();
        const timezoneOffsetHasta = dateHasta.getTimezoneOffset();  
             
        const offsetHoursDesde = String(Math.floor(Math.abs(timezoneOffsetDesde) / 60)).padStart(2, '0');
        const offsetHoursHasta = String(Math.floor(Math.abs(timezoneOffsetHasta) / 60)).padStart(2, '0');  

        const offsetMinutesDesde = String(Math.abs(timezoneOffsetDesde) % 60).padStart(2, '0');     
        const offsetMinutesHasta = String(Math.abs(timezoneOffsetHasta) % 60).padStart(2, '0');

        const timezoneStringDesde = (timezoneOffsetDesde > 0 ? '-' : '+') + offsetHoursDesde + offsetMinutesDesde;
        const timezoneStringHasta = (timezoneOffsetHasta > 0 ? '-' : '+') + offsetHoursHasta + offsetMinutesHasta;


        const formattedDateDesde = `/Date(${timestampDesde}${timezoneStringDesde})/`;
        const formattedDateHasta = `/Date(${timestampHasta}${timezoneStringHasta})/`;

    

        if (view.down('#fechadesde').getValue()) {
            filters.push({ 
                property: 'o.[gra_dfechahora]:GT' ,
                value: formattedDateDesde,
                id: 'fechadesde'
            });
        }
        
            
        if (view.down('#fechahasta').getValue()) {
            filters.push({ 
                property: 'o.[gra_dfechahora]:LT',
                value: formattedDateHasta,
                id: 'fechahasta'
            });
        }

        view.store.filter(filters);
       
    },

     onTodosClick: function(button){ 
        var view = button.up('multicuentallamadasgrabadasview');
        view.store.clearFilter(true);
        view.store.filter(view.filter);
        //store.load();
        
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#horadesde').setValue('');
        view.down('#horahasta').setValue('');
        //view.down('#codigoalarma').setValue('');
        view.down('#comboOperadores').setValue('');
        view.down('#cuenta').setValue('');
        view.down('#dealer').setValue('');
        view.down('#nombre').setValue('');

    },

    convertToDateFormat: function(isoString) {
        // Paso 1: Convertir la cadena ISO a un objeto Date
        const date = new Date(isoString);
        
        // Paso 2: Obtener la marca de tiempo en milisegundos
        const timestamp = date.getTime();

        // Paso 3: Obtener la diferencia de la zona horaria en minutos y convertir a formato -HHMM
        const timezoneOffset = date.getTimezoneOffset();
        const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
        const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
        const timezoneString = (timezoneOffset > 0 ? '-' : '+') + offsetHours + offsetMinutes;

        // Paso 4: Construir la cadena en el formato deseado
        const formattedDate = `/Date(${timestamp}${timezoneString})/`;

        return formattedDate;
    }
});