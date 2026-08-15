//MIGRADO2024
Ext.define('Common.controller.m_tstconexionGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_tstconexionModel', 'm_tstconexionSearchModel' ],
    views : [ 'm_tstconexionGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'm_tstconexiongridview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchange: this.onGetAllClick
            },
            'm_tstconexiongridview button[action=search]': {
                click: this.onSearchClick
            },
            'm_tstconexiongridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'm_tstconexiongridview button[action="new"]' : {
                click: this.onNewTstClick
            }
        });
    },
  
    initView : function(view) {
        var record = view.record;
        var controller = this;
        view.cue_iid = record.get('cue_iid');
        var filters = view.filters?view.filters:[];
        
        if (view.cue_iid>0){
            filters.push({
                property: 'txc_idCuenta',
                value: view.cue_iid
            })
        }
        
        var store =Ext.create('Ext.data.Store',{
            model: controller.getM_tstconexionSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load({callback:function () {
           
        }});
	},
    
    onGetAllClick: function(button, event, options) {    
        var view = button.up('m_tstconexiongridview')?button.up('m_tstconexiongridview'):button;
        var store = view.getStore();
        store.clearFilter(true);
        
        //view.down('#datedesde').setValue('')
        store.filter(view.filters)
    },
    
    onNewTstClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('m_tstconexiongridview');
        var model = this.getM_tstconexionModelModel();
        var record = Ext.create(model,{
            txc_idCuenta: view.record.get('cue_iid')
        });
        var title = getLocale('Nuevo control');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
        if(view.record) {
            var organizacionId = view.record.get('Id');
        }
        if (!mytab) {
            var newTab = Ext.widget('m_tstconexionformview', {
                translate:false,
                targetTab: newTab,
                title : title,
                recordCuenta: view.record,
                record: record,
                closable : true,
                caller: view
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
            mytab.show();
        }
    },
    onSearchClick: function(button, event, options) {    
        var view = button.up('m_tstconexiongridview');
        var tbar = view.getDockedItems('toolbar[dock="top"]');
        var store = view.getStore();
        var query = view.down('#query');
        var field = view.down('#fieldName');
        var filters = Ext.Array.clone(view.filters);
        var fechadesde = view.down('#datedesde').getValue();
        var fechahasta = view.down('#datehasta').getValue();
        var estado = view.down('#estado').getValue();
        var prefijo = view.down('#prefijo').getValue();
        var numerocomprobante = view.down('#numerocomprobante').getValue();
        var cbc_ctipocbte = view.down('#cbc_ctipocbte').getValue();
        if  (fechadesde) {
            filters.push({ 
                property: 'cbc_dFecha:GTEDATESTRING',
                value: Ext.Date.format(fechadesde,'Y-m-d'),
                id: 'fechadesde'
            });
        }
        
        if  (fechahasta) {
            filters.push({ 
                property: 'cbc_dFecha:LTEDATESTRING',
                value: Ext.Date.format(fechahasta,'Y-m-d'),
                id: 'fechahasta'
            });
        }
        
        if  (estado != null) {
            filters.push({ 
                property: 'cbc_cEstado',
                value: estado,
                id: 'estado'
            });
        }
        
        if  (cbc_ctipocbte != null) {
            filters.push({ 
                property: 'cbc_ctipocbte',
                value: cbc_ctipocbte,
                id: 'cbc_ctipocbte'
            });   
        }
        if  (prefijo) {
            filters.push({ 
                property: 'cbc_cPrefijoCbte',
                value: Ext.String.leftPad(Ext.util.Format.trim(prefijo), 4, '0'),
                id: 'prefijo'
            });
            
            view.down('#prefijo').setValue(Ext.String.leftPad(Ext.util.Format.trim(prefijo), 4, '0'));
        }
        
        if  (numerocomprobante) {
            filters.push({ 
                property: 'cbc_iNumeroCbte',
                value: numerocomprobante,
                id: 'numerocomprobante'
            });
        }
        store.clearFilter(true);
        if (filters)
            store.filter(filters);
    },
    
    onItemClick: function(view,record,item,index,e,options){
        var viewgrid = view.up('m_tstconexiongridview')
        var id = record.get('Id');
        var model = this.getM_tstconexionModelModel();
        var proxy = model.getProxy();
        panel=view.up('tabpanel')
        var title = record.get('ipc_cdescripcion');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
        if (mytab){
            mytab.show();
            return;
        }
        var newTab = Ext.widget('m_tstconexionformview',{
            iconCls: 'icon-printer',
            record: record,
            title: title,
            closable: true,
            translate: false,
            closeAction: 'destroy'
        });
        // agrego la paleta creada
        panel.add(newTab);
        panel.setActiveTab(newTab);
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    }
});