Ext.define('IPRSManager.controller.IprsCommGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'IprsCommModel' ],
    views : [ 'IprsCommGridView' ],

    init : function(config) {
        this.control({
    		'iprscommgridview' : {
				afterrender : this.initview,
                itemdblclick: this.onItemClick
			},
            'iprscommgridview #filtroComunes' : {
    			click : this.onFilterClick
			},
            'iprscommgridview #filtroErrores' : {
        		click : this.onFilterClick
			}

        });
	},
    
    
    onItemClick: function (view,record) {
        console.log(record)
            var win = Ext.create('Ext.Window', {
        		layout: 'fit',
    			title :  getLocale('Conn')+': '+record.get('AssemblyClassName')+' '+getLocale('Error')+': '+record.get('Error_code'),
    			closeAction : 'destroy',
    			width : 400,
    			height : 250,
    			border : true,
                modal: true,
                view: view,
    			items : [{
                    xtype:'textarea',
                    value: record.get('Data')
                    
    			}]
            }).show()
    },
    
    onFilterClick: function (btn) {
        var view = btn.up('iprscommgridview')
        
        var filter = []
        view.commstore.clearFilter()
       if(view.down('#filtroComunes').pressed) {
            filter.push(function (item) {
                 return item.data.Error_code <= 0;
             })
        } else if(view.down('#filtroErrores').pressed) {
            filter.push(function (item) {
                 return item.data.Error_code > 0;
             })
        }
        
        view.commstore.filter(filter)
    },
    
	initview : function(view) {
        var controller = this;
        var record = view.record;
        // creo el store
        
        view.commstore =Ext.create('Ext.data.Store',{
            model: this.getIprsCommModelModel() ,
            remoteSort: false,
            remoteGroup: false,
            remoteFilter: false,
            sorters: [{property:'TRawFechaHora',direction:'DESC'}]
        })  
        
        view.bindStore(view.commstore);
        
        
	}
});


