Ext.define('AdministratorSearch.controller.SessionPanelController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TaskStatusModel', 'ReporteSesionesSearchModel', 'TaskStatusSearchModel', 'ReporteSesionesSeisMesesSearchModel' ],
    views : [ 'SessionPanelView' ],

    init : function(config) {
        // genero los eventos

        this.control({
    				'sessionpanelview' : {
						beforerender : this.initview,
                        closesession: this.onCloseSession,
                        objectedit: this.onObjectEdit,
					},
                    'sessionpanelview button[action=refresh]': {
                        click: this.onRefreshClick
                    },
                    'sessionpanelview #reporte' : {
                        cellclick : this.onPopulateCombo
                    }
    				
                });
	}, // cierro init
    
    onPopulateCombo : function(grid, column, columnIndex, record, row, rowIndex, dataIndex) {
        var controller = this;
        var view = grid.up('sessionpanelview');
        
        /* Para chequeo de los elementos de la grilla
        console.log(grid);
        console.log(column);
        console.log(columnIndex);
        console.log(record);
        console.log(row);
        console.log(rowIndex); 
        */
        
        // Combo que se visualiza por medio del setEditor - No logro pre-cargarlo 1 sola vez y que no se rompa
        var storeMesesSenales = Ext.create('Ext.data.Store', {
            model : this.getReporteSesionesSeisMesesSearchModelModel(),
            remoteFilter: true,
            autoload: true
        });
        
        var combo = Ext.create('Ext.form.ComboBox', {
            itemId : 'senalesSeisMeses',
            name: 'senalesSeisMeses',
            displayField: 'MesCantidad',                    			
            valueField: 'Cantidad'
        });
        combo.bindStore(storeMesesSenales);
        storeMesesSenales.load();

        var cm = grid.getGridColumns();
        var rowCue_iid = record.get('clave');
        var rowCue_iidColumn = columnIndex;
        
        if (rowCue_iid == 'Cantidad de Señales Recibidas por mes' && columnIndex == 1) {
            /* Para chequeo de columna
            console.log('columnIndex : ',rowCue_iidColumn);
            console.log(cm[1]);
            */
            cm[1].setEditor(combo)
        } else {
            cm[1].setEditor(null)
        }
        
    }, 
    
    onRefreshClick: function (btn) {
       
        var view = btn.up('sessionpanelview');
        view.down('#modulos').removeAll()
        this.populate(view)
        
        view.down('sessiongridview').fireEvent('refresh', view.down('sessiongridview'));
        view.down('systemtestgridview').fireEvent('refresh', view.down('systemtestgridview'))
    },
    
    populate: function (view) {
        view.store =Ext.create('Ext.data.Store',{
            model: this.getReporteSesionesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.down('#reporte').bindStore(view.store);
        view.store.load({callback: function (records) {}})

        view.storeTask =Ext.create('Ext.data.Store',{
            model: this.getTaskStatusSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        });
        view.down('#tasks').bindStore(view.storeTask);
        view.storeTask.load()
        
        
        
        var modulos = [];
        var usuarioContectados = [];
        var total = 0;
        
        Ext.Ajax.request({
                  url: '/handler/SessionsSearchHandlerAlt',//url: '/handler/SessionsSearchHandler',
                  method: 'GET',
                  scope: this,
                  success: function(response){
                    var data = Ext.JSON.decode(response.responseText);
                                
                    Ext.Array.each(data, function(obj){
       
                        if(!modulos[obj['modulo']]) {
                            modulos[obj['modulo']] = 0;
                        }
                        usuarioContectados[obj['userId']] = obj['modulo'];
                        modulos[obj['modulo']]++;
                        total++;
                    });
                    
                    //view.down('#modulos').setTitle(getLocale('Módulos con sesiones activas')+': '+total);
                    
                    
                    var containerModulos = view.down('#modulos')
                    
                   // Ext.Array.each(modulos, function(value, key){
                   
                   for(var key in modulos)
                    {
                 
                        containerModulos.items.add(Ext.widget('displayfield', {
                            value: modulos[key],
                            fieldLabel: key,
                            margin:'0 0 0 10'
                        }))  
                    }
                    
                    var totalusuarios = 0;
                    
                    for(var key in usuarioContectados)
                    {
                        totalusuarios++;                        
                    }
                    
                    var cant = view.down('#cantidadusuariosconectados');
                    cant.setValue = totalusuarios;
                    //view.down('#cantidadusuariosconectados').setValue(totalusuarios);    
                    //});
                    
                    
                    
                    
                  }
            });
            
            if (myQueryString.Language){
                Language = myQueryString.Language;
            } else if (_UserData && _UserData.metadata && _UserData.metadata.language){
                Language=_UserData.metadata.language;
            } else {
                Language = 'es-ar';
            }
            
            view.down('#rendimiento').add({
                xtype: 'uxiframe',
                itemId: 'Iframe',
                height : 750,
                border : false,
                width:'100%',
                src:'/handler/PerformanceHTML?icon=computer_error.png&Language='+Language
            });
            
    },


    onCloseSession: function (view,record,gridview) {
        var target = view.down('#Iframe');       
        target.setSrc("/handler/logout?token="+record.get("AccessToken")+"&returnUrl=/handler/SessionHtml&_dc=");
        setTimeout(function(){ 
                gridview.fireEvent('refresh',gridview)
            }, 2000);
    },
    
	initview : function(view) {
        this.populate(view)
	},
    
    onObjectEdit: function(record, view) {
        var controller = this;
        var recId = record.get('Id');
        var store = view.storeTask;
        
        //ToDo : Remove element
        record.destroy();
        
        //ToDo : Reload view.storeTask Store.
        store.load();
        
    }
   
});