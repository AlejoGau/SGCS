Ext.define('SgAppMultiMonitorWeb.view.ProcesamientoTRGridView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.procesamientotrgridview',
    //title : 'Eventos en Tiempo Real',
    layout : 'fit',
    disableSelection :true,

	items : [
    {
        xtype: 'container',
        layout:'border',
        items: [
            
            	{
            		xtype : 'gridpanel',
            		itemId : 'gridrecepcion',
                    region:'center',
                    
                    ignoreDirty: true,
                    autoScroll : true,
                    scroll: true,
            		layout : 'fit',
                    viewConfig: {
                        loadMask: false,
                        loadingText: getLocale('Cargando...'),
                        markDirty: false,
                        preserveScrollOnRefresh: true,
                        getRowClass: function(record, index) {
                            var estados = [];
                            var view = this.up('procesamientotrgridview');
                            // calculo los estados
                            if (view.down('#pendientes').pressed){
                                estados.push(0);
                            }
                            if (view.down('#espera').pressed){
                                estados.push(2);
                            }
                            if (view.down('#proceso').pressed){
                                estados.push(1,4,9);
                            }
                            if (view.down('#procesado').pressed){
                                estados.push(3,5,6,7);
                            }
                            
                            var estado = record.get('rec_nestado');
                            if (Ext.Array.indexOf(estados,estado) == -1){
                                return 'display-none';
                            }
                        }
                    },
                    features : [
                        {
                    		ftype : 'grouping',
                            id: 'grouping',
                          //  groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> '+getLocale('Prioridad')+': {name} ({rows.length})</input>',
                            groupByText : getLocale('Agrupar'),
                            //startCollapsed: true,
                            showGroupsText : getLocale('Mostrar en grupos')
                		}
                    ],
            		columns : [
                        {
                            header:    "&nbsp;",
                            dataIndex: "rec_cContenido",
                            width:     26,
                            hidden: true,
                            renderer: function(value, metaData){
                                metaData.style += "padding:0px;";
                                if(value.match(/IMG|JPG/g)){
                                    return "&nbsp;<img src=\"/resources/global/images/icons/photo.png\" data-qtip=\""+getLocale('Posee imágenes')+"\"/>";
                                }else if(value.match(/AVI/g)){
                                    return "&nbsp;<img src=\"/resources/softguard/images/icons/cctv_camera.png\" data-qtip=\""+getLocale('Posee video')+"\"/>";
                                }
                                    
                                return '';
                            }
                        },{
                            header:    "&nbsp;",
                            dataIndex: "_rec_cContenido",
                            width:     26,
                            hidden: true,
                            renderer: function(value, metaData){
                                metaData.style += "padding:0px;";                    
                                if(value.match(/\[MP4\]/g))
                                    return "&nbsp;<img src=\"/resources/global/images/icons/sound.png\" data-qtip=\""+getLocale('Posee sonido')+"\"/>";
                                return '';
                            }
                        },
            		    {
                				text : 'Fecha y Hora del Evento',
                				dataIndex : 'rec_tFechaHora',
            					//xtype : 'datecolumn',
            					//format : 'd-m-Y G:i:s',
                                renderer: function(value,metadata,record){
                                    
                                    var fechaEvento = Ext.Date.format(record.get('rec_isoFechaHora'), 'd-m-Y');
                                    var hoy = Ext.Date.format(new Date(), 'd-m-Y')
                                    var ayer = Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, -1), 'd-m-Y')
                                    if(fechaEvento == hoy) {
                                        return getLocale('Hoy')+' '+Ext.Date.format(record.get('rec_isoFechaHora'), 'G:i:s');
                                    } else if(fechaEvento == ayer) {
                                        return getLocale('Ayer')+' '+Ext.Date.format(record.get('rec_isoFechaHora'), 'G:i:s');
                                    } else {
                                        return Ext.Date.format(record.get('rec_isoFechaHora'), 'D d-m-Y G:i:s');
                                    }
                                },
            					width : 170
            				},{
                    			text : 'Minutos',
                				dataIndex : 'rec_tFechaHora',
            				    width : 60,
                                renderer: function(value,metadata,record){
                                   
                                   return Math.round((((new Date()-new Date(record.get('rec_isoFechaHora')))/1000)/60))
                                }
            				},
                            {
                                xtype: 'gridcolumn',
                                header: 'Cuenta',
                                dataIndex: 'rec_iidcuenta',
                                sortable : true,
                                flex:2,
                                renderer : function(value, metadata, record, colIndex,store, view) {
                                   
                                    if(!this.up('procesamientotrgridview').nombreMadre) {

                                        var nombre = '';
                                                        
                                        if(record.get('cue_nparticion') != 0) {
                                            nombre = record.get('madre_clinea')+'-'+record.get('madre_ncuenta')+' '+record.get('madre_cnombre')+' / '+getLocale('En partición:')+' ';
                                        }
                                         
                                        return nombre +record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
                                    
                                    } else {
                                         return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
                                    }
                                }
                            }, {
                				xtype : 'gridcolumn',
            					header : 'Icono',
            					width: 100,
            					sortable : false,
                                dataIndex:'_iconos',
            					
                            }, {
            					xtype : 'gridcolumn',
            					header : 'Evento',
                                columnId: 'Evento',
            					dataIndex : 'rec_calarma',
            					sortable : false,
            					renderer : function(value, metadata, record, colIndex,store, view) {
                                    var texto ='';
                                    var panel = this.up('procesamientotrgridview');
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
            					width:210
            				}, /*{
                				text : 'Prioridad',
                                columnId : 'Prioridad',
            					dataIndex : 'rec_iPrioridad',
                                renderer: function(value, metadata, record){
                                    return value==0?record.get('cod_nprioridad'):value;
                                },
            					xtype : 'numbercolumn',
                                format:'0',
            					width : 50
            				},*/{
                                    xtype : 'gridcolumn',
                                    header : 'Estado',
                            		dataIndex : '_rec_nestado',
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
                				xtype : 'gridcolumn',
            					header : 'Operador',
            					dataIndex : 'ope_cnombre',
                                hidden: true,
            					sortable : true,
            					flex:1
            				},
                    
                            {
                    			xtype : 'gridcolumn',
            					header : 'Observacion',
            					dataIndex : 'rec_cObservaciones',
                                renderer: function(value, metadata,record){
                                    return value.replace(/%/g, '');
                                },
            					flex:2
            				}
                            
                            ]
            	},{
                    xtype:'container',
                    region:'east',
                    width:300,
                    height:'100%',
                    layout:'fit',
                    items: [
                            {
                                xtype:'textarea',
                                layout:'fit',
                                itemId:'ticket',
                                height:'100%'
                            }
                        ]
            	}
                
                
                ]
    }
    
    
    ],
    
    initComponent: function(){
        var view = this;
        this.callParent();

        var VISUALIZAPARTICIONMWR = getParametro('VISUALIZAPARTICIONMWR')
        if(VISUALIZAPARTICIONMWR == 1) {
            this.nombreMadre = true;
        } else {
            this.nombreMadre = false;
        }

        
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
        
        
        
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'paging',
            displayInfo: true
        });
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                 {
                    iconCls: 'icon-control-play',
                    action: 'play',
                    pressed: true,
                    toggleGroup: 'control'
                },
                {
                    iconCls: 'icon-control-stop',
                    pressed: false,
                    toggleGroup: 'control',
                    action: 'stop'
                },
                '-',
                {
                    text : 'Filtros',
                    itemId: 'filtrostr',
                    hidden:true,
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
                                        },
                                        {
                                            xtype:'container',
                                            layput:'hbox',
                                            items: [
                                                    {
                                                        xtype: 'textfield',
                                                        itemId: 'dealer',
                                                        emptyText: getLocale('Dealer'),
                                                        
                                                    },{
                                                        xtype: 'textfield',
                                                        itemId: 'cuenta',
                                                        emptyText: getLocale('Cuenta'),
                                                        
                                                    }
                                                ]
                                        },{
                                            xtype: 'combo',
                                            itemId: 'prioridad',
                                            emptyText: getLocale('Prioridad'),
                                            queryMode: 'local',
                                            store: 'EventoPrioridadesStore',
                                            multiSelect: true,
                                            displayField: 'Name',
                                            valueField: 'Value',
                                        }
                                    ]
                                 }
                             ]
                	    }
                    
    			},{
                    text : 'Excluir',
                    hidden:true,
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
                    
    			}/*,{
                    xtype: 'button',
                    text: 'Buscar',
                    action: 'search',
                    itemId: 'search',
                    iconCls: 'icon-find'
                },{
                    xtype: 'button',
                    text: 'Ver todos',
                    action: 'clearfilters',
                    itemId: 'clearfilters',
                    iconCls: 'icon-find'
                }*/
                
                /*,{
                    xtype: 'button',
                    //style: {padding: "0 0 0 0"},
                    action: 'soloAlarmas',
                    text: 'Solo Alertas',
                    pressed: false,
                    enableToggle: true,
                    margin: '0 0 0 5'
                }*/
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
                    text: 'Cuenta',
                    enableToggle: true,
                    toggleGroup: 'group',
                    action: 'groupCuenta'
                },
                 {
                    iconCls: 'icon-application-view-list',
                    text: 'Estado',
                    enableToggle: true,
                    toggleGroup: 'group',
                    action: 'groupEstado'
                },"-",
                 {
                    iconCls: 'circulo estado0',
                    text: 'Pendientes',
                    action: 'pendientes',
                    enableToggle: true,
                    pressed: true,
                    itemId: 'pendientes'
                },
                 {
                    iconCls: 'circulo estado2',
                    text: 'Espera',
                    action: 'espera',
                    enableToggle: true,
                    pressed: true,
                    itemId: 'espera'
                },
                 {
                    iconCls: 'circulo estado1',
                    text: 'En proceso',
                    action: 'proceso',
                    enableToggle: true,
                    pressed: true,
                    itemId: 'proceso'
                },
                 {
                    iconCls: 'circulo estado3',
                    text: 'Procesado',
                    action: 'procesado',
                    enableToggle: true,
                    pressed: true,
                    hidden: true,
                    itemId: 'procesado'
                }
                ]// cierro items
         }); 
        
      //  this.addDocked(pagingtoolbar);
        this.addDocked(toolbar);
        
        if (view.hideColumns){
            Ext.Array.each(view.hideColumns, function(index){
                var column =view.down("gridcolumn[dataIndex=" + index + "]");
                if (column) column.hide();
            });
        }
        
        if (view.showColumns){
            Ext.Array.each(view.showColumns, function(index){
                var column =view.down("gridcolumn[dataIndex=" + index + "]");
                if (column) column.show();
            });
        }
        
        
    }
});
