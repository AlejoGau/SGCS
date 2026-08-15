//MIGRADO2024
Ext.define('Common.view.SmartTrackGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.smarttrackgridview'],
    title : 'SmartTrack',
    autoHeight : true,
    selType:'checkboxmodel',
    closeAction: 'hide',
   selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
   
    viewConfig: {
        
        stripeRows: false,
        getRowClass: function(record) { 
            return record.get('Imei') == 0 ? 'nohabilitado' : ''; 
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
                iconCls: 'icon-reportes',
                tooltip: getLocale('Eventos'),
                itemId: 'icoeventos', 
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var rec = grid.getStore().getAt(rowIndex);
                    if(rec.get('CuentaId') != '') {
                        var view = grid.up('smarttrackgridview');
                        
                        view.fireEvent('mostrarEventos',rec,view);
                    } else {
                        notify('El dispositivo no tiene cuenta asociada');
                    }
                
                }
            }]            
        },{
            xtype : 'gridcolumn',            
            header : 'Dispositivo',
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
            hidden: false,
			width: 200         
		},{
            xtype : 'gridcolumn',
        	header : 'Nombre Dispositivo',
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
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments); 

        var view = this;
        var recordEvento = view.recordEvento;
        var field = 'imei';
        var query = '';
        
     /*   this.onSelectChange = function (selModel, selections) {
            this.down('[action="asignarcuenta"]').setDisabled(selections.length == 0);
            this.down('[action="sacarcuenta"]').setDisabled(selections.length == 0);
        };  */      
   //     
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        if (recordEvento){
            var dealer = recordEvento.get('cue_clinea');
            if (dealer){
                field = 'dealer';
                query = dealer;
            }
        }
        
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
                    value: field,
                    itemId: 'queryType',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    value: query,
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
                    iconCls: 'icon-cuentaDelete',
                    text: 'Desasignar Cuenta',
                    scope: this,
                    action: 'sacarcuenta',
                    
                },'-',
                {
                    iconCls: 'icon-application-view-list',
                    text: 'Agrupar',
                    enableToggle: true,
                    toggleGroup: 'group',
                    action: 'groupAlarmas'
                },'-',
               
                {
                    iconCls: 'icon-add',
                    text: 'Nuevo dispositivo',
                    action: 'nuevo'
                },'->',
                {
                    iconCls: 'icon-cog',
                    text: 'Configurar servicio',
                    scope: this,
                    itemId: 'btnconfig',
                    action: 'configurar'
                },'-',
                {
                    xtype: 'displayfield',
                    value: '',
                    scope: this,
                    itemId: 'toolbardisplayfield',
                    margin: '0 10 0 10',
                }
                
            ],// cierro items
            
         }); 
        
        this.addDocked(toolbar);
        
    } 
});
Ext.define('Common.view.SmartTrackExtendedGridView', {
    extend : 'Common.view.SmartTrackGridView',
    alias : ['widget.smarttrackextendedgridview'],
    title : 'SmartTrack',
    autoHeight : true,
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
   
    viewConfig: {
        
        stripeRows: false,
        getRowClass: function(record) { 
            return record.get('Imei') == 0 ? 'nohabilitado' : ''; 
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
                    var config =  Ext.JSON.decode(record.get('Config'))
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
        //this.addEvents('cuentachanged');
        //this.addEvents('onchange');
        //this.addEvents('smarttrackchange');
        //this.addEvents('licenseviolation');
        var view = this;
        var recordEvento = view.recordEvento;
        var field = 'imei';
        var query = '';
        if (recordEvento){
            var dealer = recordEvento.get('cue_clinea');
            if (dealer){
                field = 'dealer';
                query = dealer;
            }
        }
        
        //saco el dock
        this.removeDocked(this.down('toolbar[dock=top]'));
        
        
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
                    pressed: false,
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
                    value: field,
                    itemId: 'queryType',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    value: query,
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    itemId: 'searchBtn',
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
                        pressed: false,
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