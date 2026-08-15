//MIGRADO2024
Ext.define('Common.view.PoiGridView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.poigridview', 
    title: 'Puntos de interes',
    itemId: 'poigridview',
    anchor: '100%',
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
    preventClear: false,
    autoHeight: true,
    columns: [{
            xtype : 'gridcolumn',
        	header : '',
			dataIndex : 'Icon',
			sortable : true,
			groupable : true,
			width : 26,
            renderer: function(value, metadata,record){
                return '<img data-qtip="'+value+'" src="/resources/softguard/images/poi/'+value+'" width=16 height=16>';
            }
		},
        {
            dataIndex: 'Name',
            header: 'Nombre',
            sortable: true,
            editor: {
                xtype: 'textfield'
            },
            flex:1
        },{
            dataIndex: 'FullAddress',
            header: 'Dirección',
            flex:1
        },
        {
            dataIndex: 'Latitude',
            header: 'Lat',
            flex:1
        },{
            dataIndex: 'Longitude',
            header: 'Long',
            flex:1
        }
    ],
    initComponent: function () {
        /*
        this.editing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        this.plugins = [this.editing];
    */
        //------------para fijar perfiles de seguridad según AdministratorSearch-------------
        ///-----https://basecamp.com/2249105/projects/14758734/todos/445523325
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordTrackGuard = storeSecurity.findRecord('KeyReference', 'TrackGuard');
        var masterModule = storeSecurity.findRecord('KeyReference','MasterWebDealer');
        var administratorModule = storeSecurity.findRecord('KeyReference','Administrator');
   
/*
        if(isNaN(recordTrackGuard.id)){
            recordTrackGuard.id = 0;
            recordTrackGuard.data.Id = 0;
        }
*/
        //var url = '/Rest/Security/Modules/'+recordTrackGuard.id+'/Security';
        var url = '/Rest/Security/Modules/7/Security';
        var profile = 2;    
        var view = this;
                Ext.Ajax.request({
                  url: url,
                  method: 'GET',
                  success: function(resp,operation) {
                    var json = resp.responseText?JSON.parse(resp.responseText):null;
                    if (json && json.modules && json.modules.length>0){
                        var modules = json.modules;
                        Ext.Array.each(modules,function(module){
                            if(module.view == 'poigridview'){
                                console.log('Module: '+module);
                                profile = module.profile;
                            }
                                
                        });
                    } 
                    if (profile <=1){
                        view.down('#add').hide();
                        view.down('#delete').hide();
                        view.down('#import').hide();
                    }
                    
                  }
                });
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
        items: [
            /*{
                text: 'Guardar',
                iconCls: 'save',
                action: 'save',
                itemId:'save'
            },
            {xtype: 'tbseparator'},*/
            {
                xtype: 'textfield',
                itemId: 'fieldName',
                hidden: true,
                value: 'Name'
            },
            {
                xtype: 'textfield',
                itemId: 'query',
                defaultVale: getLocale('Nombre')
            },
            {
                iconCls: 'icon-search',
                text: 'Buscar',
                action: 'search'
            },
            {
                iconCls: 'icon-search',
                text: 'Todos',
                action: 'searchall'
            },
            {
                iconCls: 'icon-world',
                text: 'Mostrar todos',
                action: 'showall',
                enableToggle: true
            },
            {xtype: 'tbseparator'},
            {
                iconCls: 'icon-add',
                text: 'Agregar',
                action: 'add',
                itemId:'add'
            }, {
                iconCls: 'icon-delete',
                action: 'delete',
                text: 'Eliminar',
                disabled: true,
                itemId: 'delete',
            },'->', {
                iconCls: 'icon-database-refresh',
                action: 'import',
                text: 'Migrar POI anteriores',
                disabled: false,
                itemId: 'import',
            }
        ]// cierro items
     }); 
                     
    this.callParent(arguments);
    var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
        dock: 'bottom',
        displayInfo: true
    });
    this.addDocked(pagingtoolbar);
    this.addDocked(toolbar);
    } // cierro init
});