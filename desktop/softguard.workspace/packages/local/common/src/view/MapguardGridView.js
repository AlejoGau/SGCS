//MIGRADO2024
Ext.define('Common.view.MapguardGridView', {
    extend : 'Ext.grid.GridPanel',
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
   // store: 'MapguardVehicleStore',
    alias : 'widget.mapguardgridview',
    title : 'Dispositivos Móviles',
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
                
                if(Ext.util.Format.trim(record.get('cService')) != '') {
                    return '<img data-qtip="'+value+'" src="/iconossg/'+record.get('cService')+'.png" width=16 height=16>';
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
                        grid.up('mapguardgridview').fireEvent('liberarMovil',grid,record)
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
        
        
    } // cierro init
});
Ext.define('Common.view.MapGuardForServtecGridView', {
    extend : 'Common.view.MapguardGridView',
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
   // store: 'MapguardVehicleStore',
    alias : 'widget.mapguardforservtecgridview',
    title : 'Dispositivos Móviles',
    viewConfig: {
        loadMask: false
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
                return '<img data-qtip="'+value+'" src="http://www.softdemonitoreo.com/iconossg/'+record.get('cService')+'.png" width=16 height=16>';
            }
		},
        {
        	xtype : 'gridcolumn',
			header : 'Nombre',
			sortable : true,
			dataIndex : 'cue_cnombre',
            renderer : function(value, object, record) {
    			return record.get('cue_cnombre') + ' (' + record.get('cue_clinea') + '-' + record.get('cue_ncuenta')+')';
			},
			flex:1
		},
        {
    		xtype : 'gridcolumn',
			header : 'Cuenta asignada',
			sortable : true,
			dataIndex : 'cue_ncuenta',
			renderer : function(value, object, record) {
				return record.get('asi_clinea') + '-' + record.get('asi_ncuenta');
			},
			width : 80
		},{
            header:    "&nbsp;",
            dataIndex: "tmp_nestado",
            width:     26,
            renderer: function(value, metaData){
                metaData.style += "padding:0px;";
                if(value == 3){
                    return "&nbsp;<img src=\"/resources/global/images/icons/photo.png\" data-qtip=\""+getLocale('Desasignar')+"\"/>";
                }
                    
                return '';
            }
        }
    ],
    
   /* initComponent: function () {
        this.callParent(arguments);
        
      
        
        
    } */// cierro init
});