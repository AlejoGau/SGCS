//MIGRADO2024
Ext.define('Common.view.MovilesGridView', {
    extend : 'Ext.grid.GridPanel',
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
   // store: 'MapguardVehicleStore',
    alias : 'widget.movilesgridview',
    title : 'Dispositivos Móv',
    viewConfig: {
        loadMask: false,
        preserveScrollOnRefresh: true
    },
    features : [
        {
        	ftype : 'grouping',
            groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> {name} ({rows.length})</input>',
            groupByText : getLocale('Agrupar'),
            showGroupsText : getLocale('Mostrar en grupos')
		}
    ],
	columns : [{
            xtype : 'gridcolumn',
			header : '',
			dataIndex : 'cService',
			sortable : true,
			groupable : true,
			width : 26,
            renderer: function(value, metadata,record){
                
                var tipo = null;
                    
                    if(record.get('state') == 'vieja') {
                        tipo = "vieja";
                    } else if(record.get('tmp_nestado') == 1) {
                        tipo = "movil_disponible";
                    } else if(record.get('tmp_nestado') == 2) {
                        tipo = "Sos";
                    } else if(record.get('tmp_nestado') == 3) {
                        tipo = "movil_asignado";
                    }
               
                
                if(tipo != 'vieja') {
                    return '<img data-qtip="'+value+'" src="/resources/softguard/images/mapguard-cservice/'+tipo+'.png" width=16 height=16>';
                } else if (tipo == 'vieja') {
                    return '<img data-qtip="'+value+'" src="/resources/softguard/images/exclamacion.png" width=16 height=16>';
                } else {
                    return '';
                }
            }
		},
        {
        	xtype : 'gridcolumn',
			header : 'Nombre',
			sortable : true,
			dataIndex : 'cue_cnombre',
			flex:1
		},
        {
    		xtype : 'gridcolumn',
			header : 'Cuenta',
			sortable : true,
			dataIndex : 'cue_ncuenta',
			renderer : function(value, object, record) {
				return record.get('cue_clinea') + '-' + record.get('cue_ncuenta');
			},
			width : 80
		},{
            header:    "&nbsp;",
            dataIndex: "tmp_nestado",
            width:     26,
            renderer: function(value, metaData){
                metaData.style += "padding:0px;";
                if(value == 3){
                    return "&nbsp;<img src=\"/resources/global/images/icons/cancel.png\" data-qtip=\""+getLocale('Desasignar')+"\"/>";
                }
                    
                return '';
            },
            listeners: {
                click: function (grid,cell,a,b,event,record) {
                    if(record.get('tmp_nestado') == 3){
                        console.log(arguments)    
                        grid.up('movilesgridview').fireEvent('liberarMovil',grid,record)
                    }                    
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
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            itemId:'toolbarfiltro',
            items: [{
                    xtype : 'combo',
                    multiSelect : true,
        			emptyText: getLocale('Todos'),
        			displayField : 'flo_cdescripcion',
                    queryMode: 'local',
        			valueField : 'flo_ccodigo',
                    itemId: 'flo_ccodigo',
                    editable: false,                                           
                    flex:1
        		},{
                    text:'Todos',
                    itemId:'todos'
        		}]
        })
        this.addDocked(toolbar);
        var toolbarMoviles = Ext.create('Ext.toolbar.Toolbar', { 
            items : [
                 {
                    text: 'Disponible',
                    itemId: 'disponibleMoviles',
                    pressed: true,
                    iconCls:'icon-mp-disponibles',
                    enableToggle: true
                },{
                    text: 'Sos',
                    itemId: 'sosMoviles',
                    iconCls:'icon-mp-sos',
                    pressed: true,
                    enableToggle: true
                },{
                    text: 'Asignado',
                    itemId: 'asignadoMoviles',
                    pressed: true,
                    iconCls:'icon-mp-asignado',
                    enableToggle: true
                },{
                    text: 'No actuales',
                    itemId: 'viejas',
                    pressed: false,
                    iconCls:'icon-tg-exclamation',
                    enableToggle: true
                }
                
            ]
        })
        this.addDocked(toolbarMoviles);
        
        
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            itemId:'tipofiltro',
            dock: 'bottom',
            items : [{
                        text: 'Todos los dispositivos',
                        itemId: 'dispositivos-todos',
                        iconCls:'icon-map-magnify',
                        pressed: false,
                        enableToggle: true,
                        toggleGroup : 'tipofiltro'
                    },
                    {
                        text: 'Dispositivos seleccionados',
                        itemId: 'dispositivos-seleccionados',
                        pressed: false,
                        iconCls:'icon-map-magnify',
                        enableToggle: true,
                        toggleGroup : 'tipofiltro'
                    },
                    {
                        text: 'Todos los dispositvos del filtro aplicado',
                        itemId: 'dispositivos-filtro',
                        pressed: true,
                        iconCls:'icon-map-magnify',
                        enableToggle: true,
                        toggleGroup : 'tipofiltro'

                    }]
        })
        if(this.showTipoFiltro) {
            this.addDocked(toolbar);
        }  
        
        
    } // cierro init
});