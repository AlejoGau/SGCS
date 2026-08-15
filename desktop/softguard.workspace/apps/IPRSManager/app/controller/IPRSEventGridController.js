Ext.define('IPRSManager.controller.IPRSEventGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'IPRSEventModel', 'IprsConeccionSearchModel' ],
    views : [ 'IPRSEventGridView' ],

    init : function(config) {
        this.control({
			'iprseventgridview' : {
				afterrender : this.initview,
                itemdblclick: this.onItemClick
			},
           /* 'iprseventgridview #filtrar' : {
    			click: this.onFiltrarClick
			},
            'iprseventgridview #todos' : {
        		click: this.onTodosClick
			}*/
         
            'iprseventgridview #filtro' : {
            	change: this.onFiltroChange
			}
            

        });
	},

    onItemClick: function (view,record) {
        console.log(record)
            var win = Ext.create('Ext.Window', {
    			layout: 'fit',
    			title : getLocale('Imei')+': '+record.get('CImei'),
    			closeAction : 'destroy',
    			width : 400,
    			height : 250,
    			border : true,
                modal: true,
                view: view,
    			items : [{
                    xtype:'textarea',
                    value: record.get('CData')
                    
    			}]
            }).show()
    },

    onFiltroChange: function (combo,valuex) {
        var view = combo.up('iprseventgridview')   
        view.valuex = valuex;
        if(valuex.length > 0) {
            view.socketstore.filterBy(function (record) {  
                console.log(view.valuex)
                var ret = false;
                view.valuex.forEach(function (r,i) {
                    console.log(record.get('Ipc_cdescripcion').toLowerCase() == r.toLowerCase(), record.get('Ipc_cdescripcion').toLowerCase(), r.toLowerCase())
                    if(record.get('Ipc_cdescripcion').toLowerCase() == r.toLowerCase()) {                        
                        ret = true;
                    }
                })
                return ret;
            });
        } else {
            view.socketstore.clearFilter()
        }
    },
    
    /*onFiltrarClick : function (btn) {
        var view = btn.up('iprseventgridview')
        var combo = view.down('#filtro')
        
        view.socketstore.filter({
                property: 'AssemblyClassName',
                value:combo.getValue()
        })
        
    },
    onTodosClick : function (btn) {
        var view = btn.up('iprseventgridview')
        view.down('#filtro').setValue('')
        
        //this.onFiltrarClick(btn)
         view.socketstore.clearFilter()
        
    },*/
	initview : function(view) {
        var controller = this;
        var record = view.record;
        // creo el store
        view.socketstore =Ext.create('Ext.data.Store',{
            model: this.getIPRSEventModelModel() ,
            remoteSort: false,
            remoteGroup: false,
            remoteFilter: false,
            sorters: [{property:'TRawFechaHora',direction:'DESC'}],
            trackRemoved:false
        })  
        
        view.bindStore(view.socketstore);
        
        var conStore =Ext.create('Ext.data.Store',{
            model: this.getIprsConeccionSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property:"iprsc_iprsiid",
                value:view.record.get('Id')
            }]
        })

      /*  view.down('toolbar').add({
                    xtype:'button',
                    text:'Filtrar',
                    itemId:'filtrar'
                },{
                    xtype:'button',
                    text:'Todos',
                    itemId:'todos'
                })*/

        conStore.load({callback:function (records) {
           /* Ext.Array.each(records, function (record) {
                comboCmp.getStore().add({Value:record.get('rec_cdll'), Name:record.get('rec_cdll').replace('PacketParser','')})
            })     */    
            
            var comboCmp = Ext.widget('tagfield',{
                itemId:'filtro',
                displayField: 'ipc_cdescripcion',
                valueField: 'ipc_cdescripcion',
                emptyText:getLocale('Todos'),
                autoGenId:true,
                flex:1,
                //filterPickList :true,
                store: conStore,
                    queryMode: 'local',
                triggerAction: 'all',
                lastQuery: ''
            });
            view.down('toolbar').add(comboCmp)
        }}); 
	}
});


