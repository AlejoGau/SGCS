Ext.define('Desktop.SystemTest6GridView', {
    extend : 'Ext.grid.Panel',
    alias : ['widget.systemtest6gridview'],
    title : '',
    autoHeight : true, 

    selModel: {
        selType: 'cellmodel'
    },
    
    // features: [{
    //     id: 'group',
    //     ftype: 'grouping',
    //     groupHeaderTpl: '{ Category }',
    //     hideGroupedHeader: true,
    //     enableGroupingMenu: false
    // }],
       
    initComponent: function () {
        var me = this;

        me.columns = [{
                xtype : 'gridcolumn',            
                header : getLocale('Nombre'),
                dataIndex : 'Name',
                renderer: function(v){
                    return getLocale(v);
                },
                flex:1
            },{
                xtype : 'gridcolumn',
                header : getLocale('Estado'),
                dataIndex : 'Status',
                renderer: function(value, object, record) {
                    if (value == 2){
                        object.tdAttr = "style='background-color: #FAAC58; color: #fff'";    
                    }
                    if (value == 3){
                        object.tdAttr = "style='background-color: #ff0000; color: #fff'";    
                    }
                    return getLocale(record.get('Message')); 
                
                },
                flex:1
            },{
                xtype : 'datecolumn',            
                header : getLocale('Fecha'),
                dataIndex : 'LastExecution',
                format: 'D d-m-Y G:i:s',
                flex:1
            }];

        this.callParent(arguments);  
        
        me.on({
            afterrender : this.initView
        })

        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [{
                iconCls:'x-tbar-loading',
                text: getLocale('Refrescar'),
                scope: this,
                action: 'search',
                listeners: {
                    click: me.onRefreshClick
                }
            }]
        });
        me.addDocked(toolbar);

    },

    initView : function(view) {
        
        // Cargo el Store en la VIEW
        var store = Ext.create('Ext.data.Store',{
            model: view.getSystemTestSearchModelModel(),
            pageSize: 50,
            remoteFilter: true,
            remoteSort: true,
        	autoload: true,
            groupField: 'Category'
        })
        view.bindStore(store);
        store.load();
    },

    getSystemTestSearchModelModel: function() {
        return Ext.data.schema.Schema.instances.default.getEntity('SystemTestSearchModel');
    },

    onRefreshClick: function (btn) {
        var view = btn.up('systemtest6gridview')?btn.up('systemtest6gridview'):btn;
        view.getStore().load();
    }
});