//MIGRADO2024
/*Ext.define('WeSafe.controller.SPSeguientoGridController', {
   extend: 'Common.controller.SPSeguientoGridController'
});
*/
//MIGRADO2024
Ext.define('WeSafe.controller.SPSeguientoGridController', {
   extend : 'Ext.app.Controller',
   stores : [  ],
   models : [ 'SmartPanicSearchModel', 'KeyModulesModel', 'SPCuentaSeguimientoModel' ],
   views : [ 'SPSeguimientoGridView' ],
   init : function(config) {
       // genero los eventos
     this.control(
           {
        'spseguimientogridview' : {
           afterrender : this.initView,
               mostrarSeguimiento: this.onMostrarSeguimiento
        },
           'spseguimientogridview button[action=search]': {
               click: this.onSearchClick
           },
           'spseguimientogridview button[action=getall]': {
               click: this.onGetAllClick
           },
           'spseguimientogridview button[action=groupCuenta]' : {
            click : this.onGroupCuentaClick
        }
     });
  },
  initView : function(view) {
       view.licenseViolation = false;
       var isAdmin = view.isAdmin;
       
       //if (!isAdmin)
           //view.down('#toolbardisplayfield').hide(); esta dando error y no encuentro nada, vieno copiado?
       
       view.filters = [{
               property: 'cue_ncuenta:NOT',
               value: ''
           },{
               property: 'Imei:NOT',
               value: ''
           }
       ];
       if(view.filterImei) {
           view.filters.push({
                   property: 'Imei',
                   value: view.filterImei
           })
       }
               
       if(view.filterTipo) {
           view.filters.push({
                   property: 'tip_nTipo',
                   value: view.filterTipo
           })
       }

       view.filters.push({
         property: 'IsWeSafe',
         value: '1'
      })

       var store =Ext.create('Ext.data.Store',{
           model: this.getSPCuentaSeguimientoModelModel(),
           pageSize: 50,
           remoteSort: true,
           remoteFilter: true,
           filters: view.filters
       })
       view.bindStore(store);
       view.groupingFeature = view.getView().getFeature('grouping');
       
       this.hideColumns(view,['cue_ncuenta','cue_cnombre'])
       var toolbar = view.down('pagingtoolbar');
       toolbar.bindStore(store);
       
       var storeKey = KeyModulesStore;//this.getKeyModulesStoreStore();
       var t = this;
       
       storeKey.each(function(record)  {  
          if( record.get('Module') == 'SmartPanics') {
               view.QtyUsers = record.get('QuantityOfUsers'); 
                store.load();                           
          }                   
       }, this); 
       //t.tieneUsuariosDisponibles(view);
       // DEDALO 25/1/2018 lo saco porque tarda mucho en ususarios reales, por lo que veo no afecta en smartpanics, el dato se calcula igual.
       // si es necesario el calculo desde seguimiento pasarlo server side... 
  },
   
   
   onMostrarSeguimiento: function(record,view){
       if (view.licenseViolation){
           notifyError('Hay mas dispositivos asociados que los permitidos!')
           return false
       }
       
       var title = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre') + ' ' + record.get('Nombre');//"Evento: " + record.get('rec_iid');
       title = title.replace(',','');
       var id = record.get('CuentaId');
       var panel = view.up('tabpanel'); 
       var mon = Ext.widget('spseguimientomapview',{
           title : title,
           record:record,
           translate: false,
           closable : true,
           translate: false,
           closeAtion: 'Destroy'
       });
       panel.add(mon);
       panel.setActiveTab(mon);
   },
   onGroupCuentaClick: function(button, event, options){
       var view = button.up('spseguimientogridview');      
       var store = view.store;
       store.sorters.clear();
       store.groupers.clear();
       view.groupingFeature.disable();
       view.groupingFeature.lastGroupers = null;
       view.groupingFeature.block();
       store.filters.push({
         property: 'IsWeSafe',
         value: '1'
      })
       if (button.pressed){
           view.groupingFeature.enable();
           view.groupingFeature.pruneGroupedHeader();
           view.groupingFeature.unblock();
           view.groupingFeature.refreshIf();
           
           store.remoteSort = false;
           store.pageSize = 999;
           store.group('cue_cnombre');
           view.getStore().load();
       }else {
           store.remoteSort = true;
           store.pageSize = 50;
           store.clearGrouping();
           view.getStore().load()
       }
   },
   
   onGroupAlarmasClick: function(button, event, options){
       var view = button.up('spseguimientogridview');      
       var store = view.store;
       var grouping = view.getView().features[0];
       
       if (button.pressed){
           grouping.enable();
           //store.group('cue_cnombre');
       }else {
           grouping.disable();
           view.getView().refresh()
       }
   },
   onGetAllClick: function(button, event, options) {    
       var view = button.up('spseguimientogridview');
       var store = view.getStore();
       store.clearFilter(true);
       view.filters.push({
         property: 'IsWeSafe',
         value: '1'
      })
       store.filter(view.filters);
     /*  view.down('#Name').setValue('');
       view.down('#LastName').setValue('');
       view.down('#Email').setValue('');*/
       
       /*var taxonomytree = view.query('taxonomiesmastertree')[0]; 
       var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
       var taxonomiesArray = [];
       Ext.Array.each(taxonomiesSelected, function (rec) {
           if (rec.get('checked'))
           rec.set('checked', false)
       },this);*/
   },
   
   onSearchClick: function(button, event, options) {    
       var view = button.up('spseguimientogridview');
       var store = view.getStore();
       var filters = [{
           property: 'cue_ncuenta:NOT',
           value: ''
       }];
       var queryType = view.down('#queryType').getValue();
       var query = view.down('#query').getValue();
       if (queryType == 'imei')
           filters.push({ 
               property: 'Imei:LIKE',
               value: query,
               id: 'search'
           });
           
       if (queryType == 'telefono')
           filters.push({ 
               property: 'Telefono:LIKE',
               value: query,
               id: 'search'
           });
           
       if (queryType == 'nombre')
           filters.push({ 
               property: 'cue_cnombre:LIKE',
               value: query,
               id: 'search'
           });
           
        if (queryType == 'usuario')
           filters.push({ 
               property: 'Nombre:LIKE',
               value: query,
               id: 'search'
           });
           
       if (queryType == 'cuenta')
           filters = [{ 
               property: 'cue_ncuenta:LIKE',
               value: query,
               id: 'search'
           }];
           
       if (queryType == 'dealer')
           filters = [{ 
               property: 'cue_clinea:LIKE',
               value: query,
               id: 'search'
           }];
       
      filters.push({
         property: 'IsWeSafe',
         value: '1'
      })
       if (filters.length>0)   {
           store.clearFilter(true);
           store.filter(filters); 
          
       } else {
          store.clearFilter();
       }
   },
   
   tieneUsuariosDisponibles: function (view, callback) {
       if(view.QtyUsers != 0 ) { //==0 solo para testeo
           var store =Ext.create('Ext.data.Store',{
               model: this.getSmartPanicSearchModelModel(),
               pageSize: 1000, // estaba tirando 25 max
               filters: [{
                   property: 'cue_ncuenta:NOT',
                   value: ''
               }]
           })
           
           store.load(function () {
               var asignados = this.getTotalCount();
              if(asignados == view.QtyUsers) {
                   // actualizo cantidades en la barra
                   {
                       var t = view.down('toolbar');
                        //fieldToolBar.setValue(getLocale('Disponibles/Usados') +' ('+view.QtyUsers+'/'+asignados+')');      
                   }
                   view.down('[action="nuevo"]').setDisabled(true);
                   var msg = getLocale('Se supero la cantidad de asignaciones disponibles')+'. ('+asignados+'\/'+view.QtyUsers+')';
                   Ext.Msg.alert('Atención', msg, Ext.emptyFn);
              } else if (asignados > view.QtyUsers) {
                   // actualizo cantidades en la barra
                   //fieldToolBar.setValue(getLocale('Disponibles/Usados') +' ('+view.QtyUsers+'/'+asignados+')');
                   //view.down('#queryType').setDisabled(true);
                   //view.down('#query').setDisabled(true);
                   //view.down('[action="search"]').setDisabled(true);
                   //view.down('[action="getall"]').setDisabled(true);
                  
                   view.down('[action="groupAlarmas"]').setDisabled(true);
                   view.down('[action="configurar"]').setDisabled(true);
                   view.down('[action="nuevo"]').setDisabled(true);
                   
                   Ext.Msg.alert('Atención', getLocale('Se supero la cantidad de asignaciones disponibles. Por favor comuniquese con el administrador')+'.('+asignados+'/'+view.QtyUsers+')', Ext.emptyFn);    
                   view.licenseViolation =true;
                   view.fireEvent('licenseviolation');
              } else {
                   // actualizo cantidades en la barra
                   //fieldToolBar.setValue(getLocale('Disponibles/Usados')+' ('+view.QtyUsers+'/'+asignados+')');
                  if(callback) {
                      callback();
                  }
              }
           });
       }else {
           // actualizo cantidades en la barra
           var t = view.down('toolbar');    
           fieldToolBar.setValue(getLocale('Dispositivos ilimitados'));
           if(callback) {
              callback();
           }
       }
   },
   
   hideColumns: function(view, columns){
       Ext.Array.each(columns, function(index){
           var column =view.down("gridcolumn[dataIndex=" + index + "]");
           if (column) column.hide();
       });
   },
   
   showColumns: function(view, columns){
       Ext.Array.each(columns, function(index){
           var column =view.down("gridcolumn[dataIndex=" + index + "]");
           if (column) column.show();
       });
   }
});