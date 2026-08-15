Ext.define('WebRemoto.view.EventosPTGridView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventosptgridview',
    title : 'Procesamiento múltiple',
    preventHeader: true,
    layout : 'fit',
    
	items : [

	{
		xtype : 'gridpanel',
		itemId : 'gridrecepcion',
        stateId: 'eventosptgridview',
        autoScroll : true,
        scroll: true,
		layout : 'fit',
        selType:'checkboxmodel',
        /*selModel: Ext.create('Ext.selection.CheckboxModel', {
             listeners:{
                selectionchange: function(selectionModel, selectedRecords, options){
                    
                    var title = getLocale('Se procesaran  todos los eventos');    				
					if(selectionModel.store.data.length > selectedRecords.length ) {
                     	 title = getLocale('Se procesaran ')+selectedRecords.length+getLocale('  eventos');
					}
					selectionModel.view.up('window').setTitle(title);
                }
            },
        
        }),*/
        viewConfig: {
            loadMask: false,
            preserveScrollOnRefresh: true
        },
        features : [
            {
        		ftype : 'grouping',
                groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> '+getLocale('Prioridad')+': {name} ({rows.length})</input>',
                groupByText : getLocale('Agrupar'),
                //startCollapsed: true,
                showGroupsText : getLocale('Mostrar en grupos')
    		}
        ],
		columns : [
		    {
				text : 'Fecha y Hora del Evento',
				dataIndex : 'r.rec_iid',
				xtype : 'datecolumn',
				//format : 'D d-m-Y G:i:s',
                renderer : function(value, object, record) {
        			return Ext.Date.format(record.get('rec_isoFechaHora'),'D d-m-Y G:i:s') ;
    			},
				width : 170
			}, {
				xtype : 'gridcolumn',
				header : 'Evento',
                columnId: 'Evento',
				dataIndex : 'rec_calarma',
				sortable : false,
				renderer : function(value, metadata, record, colIndex,store, view) {
                    var texto ='';
                    var panel = this.up('eventosptgridview');
                    if (Ext.util.Format.trim(record.get('rec_calarma')) != ''){
                        texto = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                        var txtColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolorletra'));
                        var backColor = panel.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                        metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                    } else {
                        texto = record.get('rec_cContenido');
                        metadata.style = 'color:#333; background-color:transparent;';
                    }
                    
                    return texto;
                },
				width : 210
			}, {
				text : 'Prioridad',
                columnId : 'Prioridad',
				dataIndex : 'rec_iPrioridad',
                renderer: function(value, metadata, record){
                    return value==0?record.get('cod_nprioridad'):value;
                },
				xtype : 'numbercolumn',
                format:'0',
				width : 50
			},
            {
                xtype: 'gridcolumn',
                header: 'Cuenta',
                dataIndex: 'rec_iidcuenta',
                itemId:'cuentacol',
                sortable : true,
                width: 200,
                renderer : function(value, metadata, record, colIndex,store, view) {
                   
                    if(!this.up('eventosptgridview').nombreMadre) {
               
                        if(record.get("cue_nparticion") == 0) {
                            return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
                        } else {
                            return record.get('madre_clinea')+'-'+record.get('madre_ncuenta')+' '+record.get('madre_cnombre') + '/'+record.get('cue_cnombre');
                        }
                    
                    } else {
                         return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
                    }
                }
            },{
                xtype : 'gridcolumn',
                header : 'Estado',
        		dataIndex : 'rec_nestado',
    			sortable : true,
    			groupable : true,
    			width : 60,
                renderer: function(value, metadata,record){
                    var store = Ext.data.StoreManager.lookup('EventoEstadoStore');
                    var text = '';
                    var estado = store.findRecord('Value', value);
                    if (estado) {
                        text = estado.get('Name');
                    }                  
                   return '<div class="circulo estado'+value+'" title="'+text+'"></div>'
                }
    		},
            {
                xtype: 'gridcolumn',
                header: 'Origen',
                dataIndex: 'rec_nOrigen',
                sortable : true,
                width: 70,
                renderer : function(value, metadata, record, colIndex,store, view) {
                    var store = Ext.data.StoreManager.lookup('EventoOrigenStore');
                    var origen = store.findRecord('Value', value);
                    return origen.get('Name');
                }
            },
            {
				xtype : 'gridcolumn',
				header : 'Usuario',
				dataIndex : 'usu_cnombre',
				sortable : true,
				width : 150
			},
            {
				xtype : 'gridcolumn',
				header : 'Dirección',
				dataIndex : 'cue_ccalle',
				sortable : true,
				width : 200
			},
            {
    			xtype : 'gridcolumn',
				header : 'Zona',
				dataIndex : 'rec_czona',
                renderer: function(value,metadata,record){
                    return record.get('_zona');
                },
				sortable : true,
				width : 150
			}]
	}],
    
    initComponent: function(){
        var view = this;
        
              
        Ext.Ajax.request({
             url: '/rest/tablas/parametros/',
             params: { par_ccodigo: 'VISUALIZAPARTICIONMWR'},
             method: 'GET',
             scope: this,
             success: function(response){
                             
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros[0];
                
                    if(rec.par_ivalor == 1) {
                        this.nombreMadre = true;
                    } else {
                        this.nombreMadre = false;
                    }
             }
       });
        
        
        
        
        this.decimalColorToHTMLcolor = function(number) {
            var intnumber = number - 0;
    		var red, green, blue;
    		var template = "#000000";
    	        red = (intnumber&0x0000ff) << 16;
    		green = intnumber&0x00ff00;
    		blue = (intnumber&0xff0000) >>> 16;
    	        intnumber = red|green|blue;
    	
    		var HTMLcolor = intnumber.toString(16);
    	
    	
    		HTMLcolor = template.substring(0,7 - HTMLcolor.length) + HTMLcolor;
    	
    		return HTMLcolor;
    	};
        
        
        this.callParent();
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'paging',
            displayInfo: true
        });
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text    : 'Confirmar',
                    action: 'confirmar',
                    disabled:true,
                    itemId:'confirmar'
                },{
                    text    : 'Cancelar',
                    action: 'cancel',
                    itemId: 'btncancel',
                    disabled:true,
                    itemId:'cancel'
                },"-",                
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        /*{
                                            xtype: 'combo',
                                            store: 'EventoEstadoStore',
                                            queryMode: 'local',
                                            displayField: 'Name',
                                            valueField: 'Value',
                                            itemId: 'comboEstados',
                                            emptyText: getLocale('Estados'),
                                            multiSelect: true
                                        },*/
                                        {
                                            xtype: 'combo',
                                            store: 'EventoOrigenStore',
                                            queryMode: 'local',
                                            displayField: 'Name',
                                            valueField: 'Value',
                                            itemId: 'comboOrigenes',
                                            //fieldLabel: 'Origen',
                                            emptyText: getLocale('Origen'),
                                            multiSelect: true
                                        },{
                                            xtype: 'combo',
                                            store: 'EventoTipoStore',
                                            queryMode: 'local',
                                            displayField: 'Name',
                                            valueField: 'Value',
                                            itemId: 'comboTipos',
                                            //fieldLabel: 'Tipo',
                                            emptyText: getLocale('Tipo'),
                                            multiSelect: true
                                        },{
                                            xtype: 'combo',
                                            itemId: 'grupos',
                                            emptyText: getLocale('Grupo'),
                                            value: '',
                                            queryMode: 'local',
                                            displayField: 'gru_cdescripcion',
                                            valueField: 'gru_ccodigo',
                                            labelWidth: 50
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'dealer',
                                            emptyText: getLocale('Dealer'),
                                            itemId: 'dealer'
                                        }
                                    ]
                                 }
                             ]
                	    }
                    
    			},{
                                            xtype: 'combo',
                                            store: 'EventoEstadoStore',
                                            queryMode: 'local',
                                            displayField: 'Name',
                                            fieldLabel: 'Estados',
                                            valueField: 'Value',
                                            itemId: 'comboEstados',
                                            emptyText: getLocale('Estados'),
                                            labelWidth: 43,
                                            width: 250,
                                            multiSelect: true
                                        },'-',{
                    text : 'Excluir',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                       {
                                            xtype: 'combo',
                                            itemId: 'grupos-excluir',
                                            emptyText: getLocale('Grupo'),
                                            value: '',
                                            queryMode: 'local',
                                            displayField: 'gru_cdescripcion',
                                            valueField: 'gru_ccodigo',
                                            labelWidth: 50,
                                           // plugins: ['clearbutton']
                                        }
                                    ]
                                 }
                             ]
                        }
                    
    			}
                ,{
                    xtype: 'button',
                    //style: {padding: "0 0 0 0"},
                    action: 'soloAlarmas',
                    text: 'Solo Alertas',
                    pressed: false,
                    enableToggle: true,
                    margin: '0 0 0 5'
                }
                 ,'-',getLocale('Grupos:'),
                 {
                    iconCls: 'icon-application-view-list',
                    text: 'Evento',
                    enableToggle: true,
                    toggleGroup: 'group',
                    action: 'groupAlarmas'
                },
                 {
                    iconCls: 'icon-application-view-list',
                    text: 'Prioridad',
                    enableToggle: true,
                    toggleGroup: 'group',
                    action: 'groupPrioridad'
                }
                ]// cierro items
         }); 
        
        this.addDocked(pagingtoolbar);
        this.addDocked(toolbar);
        
        if (view.hideColumns){
            Ext.Array.each(view.hideColumns, function(index){
                var column =view.down("gridcolumn[dataIndex=" + index + "]");
                if (column) column.hide();
            });
        }
        
        if (view.showColumns){
            Ext.Array.each(view.hideColumns, function(index){
                var column =view.down("gridcolumn[dataIndex=" + index + "]");
                if (column) column.show();
            });
        }
        
        
    }
});