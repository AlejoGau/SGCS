Ext.define('AdministratorSearch.controller.ViewerTimerController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TaskStatusSearchModel', 'LogsByTimerSearchModel', 'TablasParametrosModel', 'TablasParametrosSearchModel', 'ParametrosUserEditableSearchModel' ],
    views : [ 'ViewerTimerView' ],

    init : function(config) {
		// genero los eventos
		this.control({
					'viewertimer' : {
						afterrender : this.initView
    				},
                    'viewertimer #refresh' : {
    					click : this.onRefresh
    				},
                    'viewertimer #mododebug' : {
        				change : this.onMododebug
    				}
                    
                    
    			});
	}, // cierro init
    
    
    
    onMododebug: function (check) {
        
        if(check._supendEvent) {
            return false;
        }
        
        var view = check.up('viewertimer');
        var controller = this;
        
        //defino valor a guardar
        var valueToWritte = 0;
        if(check.getValue()) {
            valueToWritte = 1;    
        }
     
        
         Ext.Ajax.request({
              url: '/Rest/search/SYS_modoDebug',             
              params: {modo:valueToWritte},
              method: 'GET',
              scope: this,
              success: function(response){
                var response = Ext.JSON.decode(response.responseText);
                
                if(valueToWritte == 1) {
                    notify('El sistema se encuentra en modo debug.')                    
                } else {
                    notify('El sistema se encuentra en modo normal.')
                }
                
              }
         })
        
        
        
        
        
    },
    onRefresh: function (btn) {
        var view = btn.up('viewertimer');
        
        view.storeJobs.load()
        view.storeLogs.load()
    },

	initView : function(view) {
       


        //JOB 
        view.storeJobs =Ext.create('Ext.data.Store',{
            model: this.getTaskStatusSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{property:"Name:IN", value:"TimerExecute,TimerHBRedirectorEventos,TimerResetHorario"}]
        });
        view.down('#jobs').bindStore(view.storeJobs)
        view.storeJobs.load({callback:function (records) {
            console.log(records)
        }})
        
        //LOGS
        view.storeLogs =Ext.create('Ext.data.Store',{
            model: this.getLogsByTimerSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            sorter:[{
                property:'Date',
                direction: 'DESC'
            }]
        });
        
        var toolbar = view.down('#logs').down('pagingtoolbar');
        toolbar.bindStore(view.storeLogs);
        view.down('#logs').bindStore(view.storeLogs)
        
        view.storeLogs.load({callback:function (records) {
        }})

        //veo si esta activo el modo debug
        
        var parametroStore =Ext.create('Ext.data.Store',{
            model: this.getTablasParametrosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            remoteGroup: false,
            groupField: 'par_ccategoria',
            filters: [{
                property:'par_ccodigo',
                value:'DEBUGSQL'
            }]
        })        
        
        parametroStore.load({callback:function (records) {
            if(records.length>0) {
                
                var mododebug = records[0].get('par_ivalor')
                var check = view.down('#mododebug');
                
                
                //"supendo el evento"
                check._supendEvent = true
                if(mododebug == 1) {
                    check.setValue(true)
                    notify('El sistema se encuentra en modo debug.')
                } else {
                    check.setValue(false)
                    notify('El sistema se encuentra en modo normal.')
                }
                //habilito el evento
                check._supendEvent = false
                
                
            }
        }})
        
        
        
        
        
        
       
	},
    

});