Ext.define('SmartTrack.view.VCSeguimientoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.vcseguimientogridview'],
    title : 'SmartPanic',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
   
    viewConfig: {
        stripeRows: false,
        getRowClass: function(record) {
            var imei = record.get('Imei');
            return !imei || imei === '' || imei === '0' || imei === 0 ? 'nohabilitado' : '';
        } 
    },
    features : [
        {
            ftype : 'grouping',
            groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> {columnName}: {name} ({rows.length})</input>',
            groupByText : getLocale('Agrupar'),
            //startCollapsed: true,
            showGroupsText : getLocale('Mostrar en grupos')
    	}
    ],
    columns : [{
            xtype:'actioncolumn',
            //header : 'Acciones',
            width:20,
            items: [{
                iconCls: 'icon-map',
                tooltip: getLocale('Seguimiento'),
                itemId: 'icoseguimiento', 
                handler: function(grid, rowIndex, colIndex,item, event, rec, row) {
                    var rec = grid.getStore().getAt(rowIndex);
                    if(rec.get('CuentaId') != '') {
                        var view = grid.up('vcseguimientogridview');
                        
                        view.fireEvent('mostrarSeguimiento',rec,view);
                    } else {
                        notify('El dispositivo no tiene cuenta asociada');
                    }
                }
            }]            
        },{
            xtype : 'gridcolumn',            
            header : 'Cuenta',
    		dataIndex : 'cue_clinea',
            renderer: function(value, p, r){
                var linea = r.data['cue_clinea'];
                var ncuenta = r.data['cue_ncuenta'];
                if(linea != '' && ncuenta != 0) {
                    return r.data['cue_clinea'] +"-"+ Ext.String.leftPad(r.data['cue_ncuenta'],4,'0'); 
                } else {
                    return '';
                }
            },
			width: 80    
		},{
            xtype : 'gridcolumn',            
            header : 'Nombre de cuenta',
    		dataIndex : 'cue_cnombre',
			width: 200         
		},{
            xtype : 'gridcolumn',
        	header : 'Usuario',
            dataIndex : 'Nombre',
            width : 150,
			sortable : true			
		},{
            xtype : 'gridcolumn',            
            header : 'Telefono',
    		dataIndex : 'Telefono',			
			width: 80          
		},{
    		xtype : 'gridcolumn',
			header : 'Id',
            dataIndex : 'Id',					
			hidden: true			
		},{
    		xtype : 'gridcolumn',
			header : 'Modelo',
			dataIndex : 'Modelo',
			sortable : true			
		},{
			xtype : 'gridcolumn',            
			header : 'Marca',
			dataIndex : 'Marca',
			sortable : true
		},{
			xtype : 'gridcolumn',            
			header : 'Version',
			dataIndex : 'Version',
			sortable : true,
			width : 100
		},{
            xtype : 'gridcolumn',            
    		header : 'Tipo',
			dataIndex : 'Tipo'
		},{
        	xtype : 'gridcolumn',
			header : 'Imei',
            dataIndex : 'Imei',
            flex: 1,
			sortable : true			
		},{
            xtype : 'datecolumn',
			header : 'Ultima posicion',
            dataIndex : 'gps_tfechahora',
            flex: 1,
			sortable : true	,
            format: 'd/m/Y H:i:s'		
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments); 


        this.onSelectChange = function (selModel, selections) {
            if (this.down('[action="asignarcuenta"]'))
            this.down('[action="asignarcuenta"]').setDisabled(selections.length == 0);
            if (this.down('[action="sacarcuenta"]'))
            this.down('[action="sacarcuenta"]').setDisabled(selections.length == 0);
        };       
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'combo',
                    store: [
                        ['telefono',getLocale('Telefono')],
                        ['nombre',getLocale('Nombre de cuenta')],
                        ['usuario',getLocale('Usuario')],
                        ['cuenta',getLocale('Cuenta')],
                        ['imei',getLocale('Imei')],
                        ['dealer',getLocale('Dealer')]
                    ],
                    queryMode: 'local',
                    value: 'imei',
                    itemId: 'queryType',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
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
                },'-',
                {
                    iconCls: 'icon-application-view-list',
                    text: 'Agrupar',
                    enableToggle: true,
                    toggleGroup: 'group',
                    pressed: true,
                    action: 'groupAlarmas'
                }
            ],// cierro items
            
         }); 
        
        this.addDocked(toolbar);
    } 
});

/**
 * Nueva vista para el mapa de Seguimiento
 */
Ext.define('SmartTrack.view.VCSeguimientoGridMenuView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.vcseguimientogridmenuview',
    title : 'SmartTrack',
    autoHeight : true,
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
   
    viewConfig: {
        stripeRows: false,
        getRowClass: function(record) {
            var imei = record.get('Imei');
            return !imei || imei === '' || imei === '0' || imei === 0 ? 'nohabilitado' : '';
        } 
    },
    features : [
        {
            ftype : 'grouping',
            groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> {columnName}: {name} ({rows.length})</input>',
            groupByText : getLocale('Agrupar'),
            //startCollapsed: true,
            showGroupsText : getLocale('Mostrar en grupos')
        }
    ],
    columns : [{
            xtype : 'gridcolumn',
            header : '',
			dataIndex : 'state',
			sortable : true,
			groupable : true,
            menuDisabled: true,
			width : 26,
            renderer: function(value, metadata,record){
                
                var subFixIcon = "";
                
                if (record.get('state') == "old"){
                    iconUrl = "/resources/softguard/images/mapguard-cservice/vc_old.png"; 
                    subFixIcon = "_old";
                } else if (record.get('state') == "disper"){  
                    iconUrl = "/resources/softguard/images/mapguard-cservice/vc_disper.png";     
                    subFixIcon = "_disper";
                } else {
                    iconUrl = "/resources/softguard/images/mapguard-cservice/vc.png";               
                }
                
                if(record.get('Config') != '') {
                    var config =  Ext.decode(record.get('Config'))
                    if(config && config.Icono) {
                        iconUrl =  config.Icono.replace(".png",subFixIcon+".png");
                    }
                }
                
                return '<img data-qtip="'+value+'" src="'+iconUrl+'" width=16 height=16>';
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Cuenta',
    		dataIndex : 'cue_cnombre',
            renderer: function(value, p, r){
                var linea = r.data['cue_clinea'];
                var ncuenta = r.data['cue_ncuenta'];
                if(linea != '' && ncuenta != 0) {
                    return r.data['cue_clinea'] +"-"+ Ext.String.leftPad(r.data['cue_ncuenta'],4,'0'); 
                } else {
                    return '';
                }
            },
			width: 80    
		},{
            xtype : 'gridcolumn',            
            header : 'Nombre de cuenta',
    		dataIndex : 'cue_cnombre',
            hidden: false,
			width: 200         
		},{
            xtype : 'gridcolumn',
        	header : 'Usuario',
            dataIndex : 'Nombre',
            width : 150,
			sortable : true			
		}
    ],
    
    initComponent: function () {         
        this.callParent(arguments);

        var toolbarVigicontroll = Ext.create('Ext.toolbar.Toolbar', { 
            items : [
                 {
                    text: 'Actualizado',
                    itemId: 'actualesVigicontrol',
                    pressed: true,
                    iconCls:'icon-vc-actualizado',
                    enableToggle: true
                },{
                    text: 'Dispersion',
                    itemId: 'dispersoVigicontrol',
                    iconCls:'icon-vc-dispersion',
                    pressed: true,
                    enableToggle: true
                },{
                    text: 'No actuales',
                    itemId: 'viejasVigicontrol',
                    pressed: true,
                    iconCls:'icon-vc-old',
                    enableToggle: true
                }
                
            ]
        })
        
        this.addDocked(toolbarVigicontroll);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            itemId: 'toolbarfiltro',
            items: [
                {
                    xtype: 'combo',
                    store: [
                        ['telefono',getLocale('Telefono')],
                        ['nombre',getLocale('Nombre de cuenta')],
                        ['usuario',getLocale('Usuario')],
                        ['cuenta',getLocale('Cuenta')],
                        ['imei',getLocale('Imei')],
                        ['dealer',getLocale('Dealer')]
                    ],
                    queryMode: 'local',
                    value: 'imei',
                    itemId: 'queryType',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
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
                },'-',
                {
                    iconCls: 'icon-application-view-list',
                    text: 'Agrupar',
                    enableToggle: true,
                    pressed: true,
                    toggleGroup: 'group',
                    action: 'groupAlarmas'
                },
                {
                    xtype: 'displayfield',
                    value: '',
                    scope: this,
                    itemId: 'toolbardisplayfield',
                    margin: '-10 10 0 10',
                }
                
            ],// cierro items
            
        }); 
        
        this.addDocked(toolbar);
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
                
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
                        pressed: true,
                        iconCls:'icon-map-magnify',
                        enableToggle: true,
                        toggleGroup : 'tipofiltro'
                    },
                    {
                        text: 'Todos los dispositvos del filtro aplicado',
                        itemId: 'dispositivos-filtro',
                        iconCls:'icon-map-magnify',
                        enableToggle: true,
                        toggleGroup : 'tipofiltro'
                        
                    }]
        })
        if(this.showTipoFiltro) {
            this.addDocked(toolbar);
        }
    } 
});

 
