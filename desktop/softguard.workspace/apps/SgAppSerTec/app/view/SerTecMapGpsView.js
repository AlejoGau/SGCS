Ext.define('SgAppSerTec.view.SerTecMapGpsView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.sertecmapgpsview',
    forceClose: true,
    layout : 'border',
    frame : false,
    border : 0,
    items: [
        {
            xtype: 'gmappanel6',
            cls: 'gmappanel6',
            itemId: 'googlemap',
            region: 'center',
            zoomLevel : 2,
    		gmapType : 'map',
            mapConfOpts:  { 
                scrollwheel: true, 
                disableDoubleClickZoom: false, 
                draggable: true, 
                streetViewControl: true, 
                overviewMapControl: true,
                overviewMapControlOptions: {
                    opened: true
                },
                mapTypeControlOptions: {
                  style: 1
                }
            }
        }
    ],
    
    initComponent: function(){
        this.callParent();
        
        var gmappanel6 = this.down('gmappanel6');
        
        this.mask = Ext.create('Ext.LoadMask', this, {
                msg: getLocale("Cargando informacion necesaria.")
            });
        
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
    		items : [
                {
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En Ejecución',
                    action: 'enejecucion',
                    enableToggle: true,
                    itemId:'enejecucion-btn'
                },{
                    xtype: 'button',
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'Pendiente',
                    action: 'pendiente',
                    enableToggle: true,
                    itemId:'pendiente-btn'
                },
                '-',
                {
        			text : 'Cambiar a Manual',
					iconCls : 'icon-center',
                    _pressed: true,
                    itemId: 'center',
					action : 'center'
				}
                ,'-',{
                    text : 'Filtros',
                    itemId: 'filtros',
                    menu: {
                        width: 280,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                defaultButton:'sertecmapgpsview #search',
                                items: [
                                    
                                   {
                                        fieldLabel: 'Por tecnico',
                                        xtype: 'combobox',
                                        itemId: 'tecnicoscombo',
                                        multiselect : false,
                                        editable : false,
                                        queryMode: 'local',
                                        displayField: 'ins_cnombre',                    
                                        valueField: 'ins_ccodigo',
                                        labelWidth: 100,
                                        enableKeyEvents: true,
                                    },{
                                        xtype : 'numberfield',
                    					fieldLabel : 'Numero',
                    					name : "numero",
                    					itemId : 'numero',
                                        labelWidth: 100
                    				},{
                                		xtype : 'datefield',
                    					fieldLabel : 'Desde',
                    					name : "fdesde",
                    					bindToModel : false,
                    					itemId : 'fechadesde',
                                        labelWidth: 100
                    				},{
                    					xtype : 'datefield',
                    					fieldLabel : 'Hasta',
                    					itemId : 'fechahasta',
                    					bindToModel : false,
                    					name : "fhasta",
                                        labelWidth: 100
                    				},{
                                        fieldLabel: 'Nombre',
                                        xtype: 'textfield',
                                        itemId: 'nombre',                                        
                                        labelWidth: 100
                                        
                                    },{
                                        fieldLabel: 'Cuenta',
                                        xtype: 'textfield',
                                        itemId: 'cuenta',                                        
                                        labelWidth: 100,
                                        validator: function (value) {
                                            var view =  this.up('sertecmapgpsview');
                                            if(value.length >0) {
                                                view.down('#dealercuenta').setDisabled(true)
                                                view.down('#dealer').setDisabled(true)
                                            } else {
                                                view.down('#dealercuenta').setDisabled(false)
                                                view.down('#dealer').setDisabled(false)
                                            }
                                            
                                            return true;
                                        }
                                        
                                    },{
                                        fieldLabel: 'Dealer-Cuenta',
                                        xtype: 'textfield',
                                        itemId: 'dealercuenta',                                        
                                        labelWidth: 100,
                                        validator: function (value) {
                                            var view =  this.up('sertecmapgpsview');
                                            if(value.length >0) {
                                                view.down('#cuenta').setDisabled(true)
                                                view.down('#dealer').setDisabled(true)
                                            } else {
                                                view.down('#cuenta').setDisabled(false)
                                                view.down('#dealer').setDisabled(false)
                                            }
                                            return true;
                                        }
                                        
                                    },{
                                        fieldLabel: 'Dealer',
                                        xtype: 'textfield',
                                        itemId: 'dealer',                                        
                                        labelWidth: 100,
                                        validator: function (value) {
                                            var view =  this.up('sertecmapgpsview');
                                            if(value.length >0) {
                                                view.down('#dealercuenta').setDisabled(true)
                                                view.down('#cuenta').setDisabled(true)
                                            } else {
                                                view.down('#dealercuenta').setDisabled(false)
                                                view.down('#cuenta').setDisabled(false)
                                            }
                                            return true;
                                        }
                                        
                                    },{
                                        fieldLabel: 'Observacion',
                                        xtype: 'textfield',
                                        itemId: 'observacion',                                        
                                        labelWidth: 100
                                        
                                    },{
                                        fieldLabel: 'Provincia/Estado',
                                        xtype: 'combobox',
                                        itemId: 'provinciacombo',
                                        multiselect : false,
                                        editable : false,
                                        queryMode: 'local',
                                        displayField: 'pro_cdescripcion',                    
                                        valueField: 'pro_ccodigo',
                                        labelWidth: 100,
                                        enableKeyEvents: true,
                                        
                                    },{
                                        xtype:'textfield',
                                        fieldLabel: 'Localidad',
                                        itemId:'localidad',
                                        labelWidth: 100
                                    },{
                   
                                        xtype : 'combo',
                                        fieldLabel : 'Tipo de servicio',                    
                                        queryMode: 'local',
                                        forceSelection: true,
                                        allowBlank: true,
                                        editable: false,
                                        store: 'tip_ntipoStore',                            
                                        itemId: "tiposervicio",
                                        valueField : 'Value',
                                        labelWidth: 100,
                                        displayField : 'Name',
                                        plugins: ['clearbutton']
                                	},{
                                        xtype: 'button',
                                        text:'Buscar',
                                        iconCls: 'icon-find',
                                        action: 'search',
                                        itemId: 'search'
                                    }
                                ]
                            }
                
                        ]
                    }
                },"-",{
                    xtype: 'button',
                    text:'Ver Todos',
                    iconCls: 'icon-find',
                    action: 'todos',
                    itemId:'todos-btn'
                }
            ]
        });
        this.addDocked(toolbar);
    }
    
});