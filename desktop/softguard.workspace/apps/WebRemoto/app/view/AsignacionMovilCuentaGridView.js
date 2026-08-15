
Ext.define('WebRemoto.view.AsignacionMovilCuentaGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.asignacionmovilcuentagridview'],
    title : 'Templates',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype : 'gridcolumn',            
            header : 'Movil',
            dataIndex : 'nombreDispositivo',           
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Cuenta movil',
            dataIndex : '_cuentaMovil',           
            flex: 1
        }, {
			xtype : 'gridcolumn',
			header : 'Evento',
            columnId: 'Evento',
			dataIndex : 'rec_calarma',
			sortable : false,
			renderer : function(value, metadata, record, colIndex,store, view) {
                var texto ='';
               
                metadata.tdCls += ' ultimo-evento';

                var panel = this;
                 if (Ext.util.Format.trim(record.get('rec_cAlarma')) != ''){
                    texto = record.get('rec_cAlarma') + ' - ' + record.get('cod_cDescripcion');
                    record.txtColor = decimalColorToHTMLcolor(record.get('cod_nColorLetra'));
                    record.backColor = decimalColorToHTMLcolor(record.get('cod_nColor'));
                    metadata.style = 'color:' + record.txtColor + '; background-color:' + record.backColor;
                } else {
                    texto = record.get('rec_cContenido');
                    metadata.style = 'color:#333; background-color:transparent;';   
                }
                
                return texto;
            },
			width:210
		},{
            xtype : 'gridcolumn',            
            header : 'Cuenta evento',
            dataIndex : '_cuenta',           
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Direccion evento',
            dataIndex : 'cue_cCalle',           
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Estado',
            dataIndex : '_amv_estado',           
            flex: 1
        }, {
    		xtype : 'gridcolumn',
			header : 'Tipo',
			dataIndex : 'tipoDispositivo',
			sortable : false,
			renderer : function(value, metadata, record, colIndex,store, view) {
                return getLocale(value)
            },
            flex:1
		}
        
    ],
    
    initComponent: function () {
       
        
   
       
                
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            xtype:'fieldset',
                                            title:getLocale('Movil'),
                                            layout:'hbox',
                                            width:270,
                                            margin:'0 0 5 0',
                                            padding:'0 0 5 0',
                                            items:[
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'dealerMovil',
                                                    emptyText: getLocale('Dealer'),
                                                    width:110
                                                    
                                                },{
                                                    xtype: 'textfield',
                                                    itemId: 'cuentaMovil',
                                                    emptyText: getLocale('Cuenta'),
                                                    width:147,
                                                    margin:'0 0 0 5'
                                                }
                                            ]
                                        },{
                                            xtype:'fieldset',
                                            title:getLocale('Evento'),
                                            layout:'hbox',
                                            width:270,
                                            margin:'0 0 5 0',
                                            padding:'0 0 5 0',
                                            items:[
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'dealerEvento',
                                                    emptyText: getLocale('Dealer'),
                                                    width:110
                                                    
                                                },{
                                                    xtype: 'textfield',
                                                    itemId: 'cuentaEvento',
                                                    emptyText: getLocale('Cuenta'),
                                                    width:147,
                                                    margin:'0 0 0 5'
                                                }
                                            ]
                                        },{
                                            xtype: 'combo',
                                            itemId: 'comboalarmas',                                    
                                            multiSelect: false,
                                            displayField: 'Descripcion',
                                            valueField: 'Codigo',
                                            queryMode: 'local',
                                            fieldLabel:'Codigo alarma'
                                        }
                                        ,{
                                            xtype: 'combo',
                                            itemId: 'tipodispositivo',                                    
                                            store:[
                                                ['movil',getLocale('Movil')],
                                                ['smarttrack',getLocale('smarttrack')]
                                                ],
                                            queryMode: 'local',
                                            fieldLabel:'Tipo dispositivo'
                                        }
                                    ]
                                 }
                             ]
            		    }
                    
    			},{
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },'-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});