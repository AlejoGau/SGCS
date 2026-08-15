//MIGRADO2024
Ext.define('Common.view.SerTecROView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.sertecroview'],
    title : 'SmartPanic',
    preventHeader: true,
    layout: 'anchor',
    autoScroll: true,    
    fieldDefaults : {
        labelWidth : 150,
        anchor : '100%',
        labelAlign: 'left'  
        
    },
    bodyPadding :0,
     
    items : [
        {
            xtype : 'displayfield',
            value: '',
            itemId: 'header-sertec',
            margin: '5px'
        },
        
        {
            xtype: 'container',
            title: '',
                   
            
            layout:'column',
            items: [{
                
                title: 'Tipo de servicio',
                columnWidth: .33,
                minWidth:400,
                items:  [
                    {
                        xtype: 'fieldset',
                        title: 'Cuenta',
                        collapsible: true,
                        margin: '5px',
                        layout: {
                             type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
                        },
                        items: [ 
                 
                            {
                                xtype : 'displayfield',
                                name : 'cue_clinea',
                                fieldLabel : 'Linea',
                                itemId: 'linea'
                            },{
                                xtype : 'displayfield',
                                name : 'cue_ncuenta',
                                fieldLabel : 'Cuenta',
                                itemId: 'cuenta'
                            },{
                                xtype : 'displayfield',
                                name : 'cue_cnombre',
                                fieldLabel : 'Nombre',
                                itemId: 'nombrecuenta'
                            },{
                                xtype : 'displayfield',
                                name : 'cue_ccalle',
                                fieldLabel : 'Calle',
                                itemId: 'calle'
                            },{
                                xtype : 'displayfield',
                                name : 'cue_clocalidad',
                                fieldLabel : 'Localidad',
                                itemId: 'localidad'
                            },{
                                xtype : 'displayfield',
                                name : 'pro_cdescripcion',
                                fieldLabel : 'Provincia',
                                itemId: 'provincia'
                            },{
                                xtype : 'displayfield',
                                name : 'cue_ccodigopostal',
                                fieldLabel : 'Codigo Postal',
                                itemId: 'codigopostal'
                            },{
                                xtype : 'displayfield',
                                name : 'cue_ctelefono',
                                fieldLabel : 'Telefono',
                                itemId: 'telefono'
                            },{
                                xtype : 'displayfield',
                                name : 'cue_cobservacion',
                                fieldLabel : 'Observacion',
                                itemId: 'observacion'
                            },{
                                xtype : 'displayfield',
                                name : 'cue_dfechaalta',
                                fieldLabel : 'Fecha alta',
                                itemId: 'fechaalta',
                                renderer: Ext.util.Format.dateRenderer('d/m/Y G:i:s') 
                            }
                        ]
                    },{
                        xtype: 'fieldset',
                        title: 'Detalle servicio',
                        collapsible: true,                        
                        margin: '5px',
                        layout: {
                             type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
                        },
                        items: [
                            
                                {
                                    xtype : 'displayfield',
                                    name : 'stc_ccontacto',
                                    fieldLabel : 'Contacto'
                                },
                                {
                                    xtype : 'displayfield',
                                    name : 'stc_dfecha_desde_1',
                                    fieldLabel : 'Fecha 1er visita',
                                    renderer: Ext.util.Format.dateRenderer('d/m/Y G:i:s') 
                                },
                                {
                                    xtype : 'displayfield',
                                    name : 'stc_dfecha_desde_2',
                                    fieldLabel : 'Fecha 2da visita',
                                    renderer: Ext.util.Format.dateRenderer('d/m/Y G:i:s') 
                                },
                                {
                                    xtype : 'displayfield',
                                    name : 'stc_dfecha_desde_3',
                                    fieldLabel : 'Fecha 3era visita',
                                    renderer: Ext.util.Format.dateRenderer('d/m/Y G:i:s') 
                                }/* ,
                                {
                                    xtype : 'displayfield',
                                    name : 'stc_ctecnico_1_cnombre',
                                    fieldLabel : 'Tecnico asignado'
                                }*/
                            
                            
                            ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Fecha',
                        collapsible: true,                        
                        margin: '5px',
                        layout: {
                             type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
                        },
                        items: [ 
                    
                    
                                {
                                    xtype : 'displayfield',
                                    name : 'stc_dfecha_cierre',
                                    fieldLabel : 'Fecha cierre',
                                    margin: '0 5 5 0',
                                    itemId: 'fechacierre',
                                    renderer: Ext.util.Format.dateRenderer('d/m/Y G:i:s') 
                                    
                                },{
                                    xtype : 'displayfield',
                                    name : 'stc_dfecha_modificacion',
                                    fieldLabel : 'Fecha Modificacion',
                                    itemId: 'fechamodificacion',
                                    renderer: Ext.util.Format.dateRenderer('d/m/Y G:i:s') 
                                }
                                    
                        ]
                    
                    
                    
                    }
                    
                    
             ]
            },{
                title: 'Detalle',
                columnWidth: .33,
                minWidth:400,
                itemId: 'reclamos',
                items: [ {
                        xtype: 'fieldset',
                        title: 'Reclamos',
                        collapsible: true,                        
                        margin: '5px',
                        layout: {
                             type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
                        },
                        items: [
                            {
                                xtype : 'displayfield',
                                name : 'stc_creclamo_1',
                                fieldLabel : 'Reclamo 1',
                                margin: '0 5 5 0'
                                
                            },
                            {
                                xtype : 'displayfield',
                                name : 'stc_creclamo_2',
                                fieldLabel : 'Reclamo 2',
                                margin: '0 5 5 0'
                                
                            },
                            {
                                xtype : 'displayfield',
                                name : 'stc_creclamo_3',
                                fieldLabel : 'Reclamo 3',
                                margin: '0 5 5 0'
                                
                            },
                            {
                                xtype : 'displayfield',
                                name : 'stc_creclamo_4',
                                fieldLabel : 'Reclamo 4',
                                margin: '0 5 5 0'
                                
                            },
                            {
                                xtype : 'displayfield',
                                name : 'stc_creclamo_5',
                                fieldLabel : 'Reclamo 5',
                                margin: '0 5 5 0'
                                
                            }
                            
                            ]
                     }
                ]
            },{
                title: 'Servicio concluido',
                columnWidth: .33,
                minWidth:400,
                itemId: 'serviciosconcluidos',
                items: [
                     {
                        xtype: 'fieldset',
                        title: 'Observacion',
                        collapsible: true,                        
                        margin: '5px',
                        layout: {
                             type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
                        },
                        itemId: 'observaciones',
                        items: [
                             {
                                xtype : 'displayfield',
                                name : 'stc_mobservaciones',
                                fieldLabel : '',
                                margin: '0 5 5 0'
                                
                            }
                        
                        ]
                            
                     
                    },{
                        xtype: 'fieldset',
                        title: 'Entradas y salidas',
                        collapsible: true,                        
                        margin: '5px',
                        layout: {
                             type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
                        },
                        itemId : 'entradasysalidas',
                        items: [
                             {
                                xtype : 'displayfield',
                                name : 'stc_dintecnico_1',
                                fieldLabel : 'Tecnico 1 entrada',
                                margin: '0 5 5 0'
                                
                            },{
                                xtype : 'displayfield',
                                name : 'stc_doutecnico_1',
                                fieldLabel : 'Tecnico 1 salida',
                                margin: '0 5 5 0'
                                
                            },{
                                xtype : 'displayfield',
                                name : 'stc_dintecnico_2',
                                fieldLabel : 'Tecnico 2 entrada',
                                margin: '0 5 5 0'
                                
                            },{
                                xtype : 'displayfield',
                                name : 'stc_doutecnico_2',
                                fieldLabel : 'Tecnico 1 salida',
                                margin: '0 5 5 0'
                                
                            },{
                                xtype : 'displayfield',
                                name : 'stc_dintecnico_3',
                                fieldLabel : 'Tecnico 3 entrada',
                                margin: '0 5 5 0'
                                
                            },{
                                xtype : 'displayfield',
                                name : 'stc_doutecnico_3',
                                fieldLabel : 'Tecnico 3 salida',
                                margin: '0 5 5 0'
                                
                            }                           
                           
                        ]
                            
                     
                    },{
                        xtype: 'fieldset',
                        title: 'Detalles moviles',
                        collapsible: true,                        
                        margin: '5px',
                        layout: {
                             type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
                        },
                        itemId: 'moviles',
                        items: [
                             {
                                xtype : 'displayfield',
                                name : 'movil_1_nombre',
                                fieldLabel : 'Movil 1',
                                margin: '0 5 5 0'
                                
                            },{
                                xtype : 'displayfield',
                                name : 'movil_2_nombre',
                                fieldLabel : 'Movil 2',
                                margin: '0 5 5 0'
                                
                            },{
                                xtype: 'hiddenfield',
                                name: 'stc_cmovil_1'
                            },{
                                xtype: 'hiddenfield',
                                name: 'stc_cmovil_2'
                            }             
                           
                        ]
                            
                     
                    },{
                        xtype: 'fieldset',
                        title: 'Productos e insumos',
                        collapsible: true,                        
                        margin: '5px',
                        layout: {
                             type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
                        },
                        itemId: 'insumos',
                        items: [
                             {
                                xtype : 'displayfield',
                                name : 'stc_minsumos',
                                fieldLabel : '',
                                margin: '0 5 5 0'
                                
                            }           
                           
                        ]
                            
                     
                    },{
                        xtype: 'fieldset',
                        title: 'Detalle, precio y operador',
                        collapsible: true,                        
                        margin: '5px',
                        layout: {
                             type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
                        },
                        itemId: 'operador',
                        items: [
                             {
                                xtype : 'displayfield',
                                name : 'ope_cnombre',
                                fieldLabel : 'Operador',
                                margin: '0 5 5 0'
                                
                            }           
                           
                        ]
                            
                     
                    },{
                        xtype: 'fieldset',
                        title: 'Tecnico',
                        collapsible: true,                        
                        margin: '5px',
                        layout: {
                             type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
                        },
                        itemId: 'tecnico',
                        items: [ 
                    
                    
                                {
                                    xtype : 'displayfield',
                                    name : 'stc_ctecnico_1_cnombre',
                                    fieldLabel : 'Tecnico asignado 1',
                                    margin: '0 5 5 0',
                                    itemId: 'tecnico1'
                                    
                                },{
                                    xtype : 'displayfield',
                                    name : 'stc_ctecnico_2_cnombre',
                                    fieldLabel : 'Tecnico asignado 2',
                                    margin: '0 5 5 0',
                                    itemId: 'tecnico2'
                                    
                                },{
                                    xtype : 'displayfield',
                                    name : 'stc_ctecnico_3_cnombre',
                                    fieldLabel : 'Tecnico asignado 3',
                                    margin: '0 5 5 0',
                                    itemId: 'tecnico3'
                                    
                                },{
                                    xtype : 'displayfield',
                                    name : 'stc_ctecnico_4_cnombre',
                                    fieldLabel : 'Tecnico asignado 4',
                                    margin: '0 5 5 0',
                                    itemId: 'tecnico4'
                                    
                                },{
                                    xtype : 'displayfield',
                                    name : 'stc_ctecnico_5_cnombre',
                                    fieldLabel : 'Tecnico asignado 5',
                                    margin: '0 5 5 0',
                                    itemId: 'tecnico5'
                                    
                                }
                                    
                        ]
                    
                    
                    
                    },{
                        xtype: 'fieldset',
                        title: 'Mapa',
                        collapsible: true,                        
                        margin: '5px',
                        height: 300,
                        itemId: 'mapa',
                        hidden:true,
                        items: [ 
                                        
                                {
                                	xtype:'image',
                                    itemId: 'mapaimagen'
                            	}           
                        ]
                    },
                                        
                    {
                        xtype:'multicuentaserviciotecnicoextendidogridview',
                        height:200
                	}           
                        
                ]
            }]
        }
        
        
        
        
        
        
        
        
    ],
    initComponent : function() {
        this.callParent();
        
        this.down('multicuentaserviciotecnicoextendidogridview').record = this.initRecord;
        this.down('multicuentaserviciotecnicoextendidogridview').metodo = 'readonly';
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                 {
                    xtype: 'button',
                    text:'Asignar tecnico',
                    iconCls: 'icon-user-edit',
                    action: 'asignar',
                    itemId: 'asignar',
                    disabled: true
                },{
                    xtype: 'button',
                    text:'Asignar movil',
                    iconCls: 'icon-car-add',
                    action: 'asignarmovil',
                    itemId: 'asignarmovil',
                    disabled: true
                },{
                    xtype: 'button',
                    text:'Reclamos',
                    iconCls: 'icon-exclamation',
                    action: 'reclamos',
                    itemId: 'reclamos'
                }
                ,"->",{
                    xtype: 'button',
                    text:'Orden',
                    iconCls: 'icon-report',
                    action: 'ordenes',
                    itemId: 'ordenes'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
       
    } // cierro init
});