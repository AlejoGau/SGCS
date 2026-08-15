Ext.define('iOT.view.iOTSolicitudesAccesoView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.iotsolicitudesaccesoview', 
    title: 'Notas Activas',
	layout: 'fit',
	//selModel:Ext.create('Ext.selection.CheckboxModel'),
	viewConfig: {
		trackOver: true,
		stripeRows: true,
		loadMask: false,
	
	},
	activeHelp: true,
    columns:[
		{

			text: 'Cuenta',
			autoSizeColumn: true,
			dataIndex:'_lineacuenta',            
            flex: 15/100,
			
			

        },{

			text: 'Nombre',
			dataIndex: 'cue_cnombre',
			autoSizeColumn: true,
            flex: 30/100,
           
        },{
            text: 'Fecha Solicitud',
			xtype: 'datecolumn',            
			format:'d/m/Y H:m',
			autoSizeColumn: true,
            flex: 15/100,
			dataIndex: "pdl_tReqFechaHora"
        },{

			text: 'ID',
			dataIndex: 'pdl_cLockName',
            flex: 30/100,
			autoSizeColumn: true,                     
        },{

			text: 'Estado',
			dataIndex: 'pdl_iStatus',
            flex: 30/100,
			autoSizeColumn: true,  
			renderer: function(value,metadata,record){
				var str = Ext.util.Format;
                var estado = record.get('pdl_iStatus');
                if(estado==1){
                    metadata.style = "background-color:red;";
                    return 'Pendiente';
                }else{
                    metadata.style = "background-color:green;";
				    return 'Procesada';
                }
			}            
        }    
    ],
    initComponent: function () {   
        


		this.callParent(arguments);
		var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
			dock: 'bottom',
			displayInfo: true
		});
        this.addDocked(pagingtoolbar);    

        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [

             /*  {
                    iconCls: 'icon-cuentaAdd',
                    text: 'Nueva Cuenta',
                    itemId: 'cuentaCreate',
                    action: 'crearCuenta',
                    disabled:true,
                    hidden:true
                },*/{
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'container',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: 270,
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                itemId: 'dealer',
                                                emptyText: getLocale( 'Dealer' ),
                                                width: 110

                                            }, {
                                                xtype: 'textfield',
                                                itemId: 'cuenta',
                                                emptyText: getLocale( 'Cuenta' ),
                                                width: 147,
                                                margin: '0 0 0 5'
                                            }
                                        ]
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'nombre',
                                        emptyText: getLocale( 'Nombre' ),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'ID',
                                        emptyText: getLocale( 'ID' ),
                                        width: 260                                                                                

                                    }
                                ]
                            },
                       
                        ]
                    }
                },
                {
                    iconCls: 'icon-cuenta_filter_nohabilitadas ',
                    text: 'Pendientes',
                    action: 'filterPendientes',
                    itemId: 'filterPendientes',
                    toggleGroup: 'filter',
                    enableToggle: true
                },
                {
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Procesadas',
                    action: 'filterProcesadas',
                    itemId: 'filterProcesadas',
                    toggleGroup: 'filter',
                    enableToggle: true
                },{
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search',
                    itemId: 'search'
                },{
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'todos',
                    itemId: 'todos'
                }                     				
            ]// cierro items
        });

        this.addDocked( toolbar );
  
    }

});

																
