var navigateFA = function(panel, direction){
    // This routine could contain business logic required to manage the navigation steps.
    // It would call setActiveItem as needed, manage navigation button state, handle any
    // branching logic that might be required, handle alternate actions like cancellation
    // or finalization, etc.  A complete wizard implementation could get pretty
    // sophisticated depending on the complexity required, and should probably be
    // done as a subclass of CardLayout in a real-world implementation.
    var layout = panel.getLayout();
    layout[direction]();
    Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
    Ext.getCmp('move-next').setDisabled(!layout.getNext());
    
    //Ext.getCmp('move-next').setDisabled(true);
};

Ext.define('WebMG.view.FacturacionAutomaticaWizardView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.facturacionautomaticawizardview'],
    title : '',  
    border:0,
    
    items : [ 
        {
            xtype:'panel',
            itemId:'cardspanel',
            flex:1,
            layout:'card',  
            activeItem: 0,
            border:0,
            items:[
                {
                    itemId: 'card-0',
                    layout:'vbox',
                    border:0,
                    items:[
                        {
                            xtype:'container',
                            html:getLocale('Configuracion de facturacion'),
                            style:{
                                fontSize:'18px',
                                margin: '0 0 10px 0'
                            }
                        },
                        
                        {
                            xtype: 'combo',           
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: 'Empresa Facturadora',
                            lastQuery: '',
                            itemId:'organizacionfacturadora',
                            multiSelect: false,
                            displayField: 'org_cnombre',
                            valueField: 'Id',
                            labelWidth:150,
                            allowBlank:false,
                            plugins : ['clearbutton']
                        },{
                            xtype: 'combo',           
                            editable: false,
                            queryMode: 'local',
                            fieldLabel: 'Comprobante a generar',
                            lastQuery: '',
                            itemId:'cbc_ctipocbte',
                            displayField: '_cbt_cdescripcion',
                            valueField: 'cbt_ccodigo',
                            labelWidth:150,
                            allowBlank:false,
                            plugins : ['clearbutton']
                        },{
                            xtype:'fieldset',
                            title:'Envio',
                            items:[{
                                xtype:'checkboxfield',            
                                fieldLabel: 'Enviar por mail',
                                itemId:'enviarpormail',
                                //hidden:true
                            },{
                                xtype: 'combo',
                                fieldLabel: 'Template',
                                queryMode: 'local',
                                displayField: 'Name',
                                valueField: 'Id',
                                itemId: 'comboTemplate',
                                hidden:true
                            }]
                        }]
                },{
                    itemId: 'card-1',
                    layout:'vbox',
                    border:0,
                    items:[
                        {
                            xtype:'container',
                            flex:1,   
                            items:[{
                                    xtype:'container',
                                    html:getLocale('Filtro de facturacion'),
                                    style:{
                                        fontSize:'18px',
                                        margin: '0 0 10px 0'
                                    }
                                }/*,{
                                    xtype: 'datefield',
                                    itemId: 'date',
                                    fieldLabel: 'Proximo vencimiento',
                                    labelWidth:150,
                                    width:400
                                }*//*, {
                                    xtype : 'combo',		
                                    displayField : 'cbt_cdescripcion',
                                    queryMode: 'local',
                                    itemId: 'cbc_ctipocbte',
                                    valueField : 'cbt_ccodigo',
                                    editable: false,
                                    fieldLabel:'Comprobante'
                                        
                                }*/,{
                                    xtype: 'combo',           
                                    editable: false,
                                    queryMode: 'local',
                                    fieldLabel: 'Categoria impositiva',
                                    lastQuery: '',
                                    itemId:'categoriasimpositivas',
                                    displayField: 'cat_cdescripcion',
                                    valueField: 'cat_ccodigo',
                                    plugins: ["clearbutton"],
                                    labelWidth:150,
                                    width:400
                                },{
                                    xtype: 'combo',           
                                    editable: false,
                                    queryMode: 'local',
                                    fieldLabel: 'Condicion de pago',
                                    lastQuery: '',
                                    itemId:'condicionespago',
                                    displayField: 'con_cdescripcion',
                                    valueField: 'con_ccodigo',
                                    plugins: ["clearbutton"],
                                    labelWidth:150,
                                    width:400
                                },{
                                    xtype:'button',
                                    text:'Buscar',
                                    itemId:'buscar'
                                },{
                                    margin: '0 0 0 10',
                                    xtype:'button',
                                    text:'Generar Novedades',
                                    itemId:'contratoAnovedad'
                                }
                            ]
                        },{
                            xtype:'fieldset',
                            flex:1,
                            width:'100%',
                            title:getLocale('Estadistica'),
                            items:[{
                                    xtype:'displayfield',
                                    fieldLabel:'Cantidad clientes',
                                    itemId:'cantidadClientes',
                                    labelWidth:150
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'Cantidad Provincias',
                                    itemId:'cantidadProvincias',
                                    labelWidth:150
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'Cantidad categorias impositivas',
                                    itemId:'cantidadCategoriasImpositivas',
                                    labelWidth:200
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'Cantidad de novedades',
                                    itemId:'cantidadDeNovedades',
                                    labelWidth:200
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'Contratos automáticos',
                                    itemId:'cantidadContratosAutomaticos',
                                    labelWidth:200,
                                    value: 0
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'Cantidad estimada a facturar',
                                    itemId:'cantidadTotalCalculada',
                                    labelWidth:200,
                                    value: 0
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'Contratos sin cuentas activas',
                                    itemId:'cantidadContratosSinCuentas',
                                    labelWidth:220,
                                    value: 0
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'Filtro',
                                    hidden: true,
                                    itemId:'filtro',
                                    labelWidth:150
                                }
                            ]
                        }                          
                    ]
                },{
                    itemId: 'card-2',
                    border:0,
                    items:[{
                        xtype:'container',
                        html:getLocale('Resumen'),
                        style:{
                            fontSize:'18px',
                            margin: '0 0 10px 0'
                        }
                    },{
                        xtype:'displayfield',
                        fieldLabel:'Empresa facturadora',
                        itemId:'empresafacturadoradisplay'
                    },{
                        xtype:'displayfield',
                        fieldLabel:'Cantidad clientes',
                        itemId:'fin_cantidadClientes',
                        labelWidth:150
                    },{
                        xtype:'displayfield',
                        fieldLabel:'Cantidad Provincias',
                        itemId:'fin_cantidadProvincias',
                        labelWidth:150
                    },{
                        xtype:'displayfield',
                        fieldLabel:'Cantidad categorias impositivas',
                        itemId:'fin_cantidadCategoriasImpositivas',
                        labelWidth:200
                    },{
                        xtype:'displayfield',
                        fieldLabel:'Cantidad de novedades',
                        itemId:'fin_cantidadDeNovedades',
                        labelWidth:200
                    },{
                        xtype:'displayfield',
                        fieldLabel:'Contratos automáticos',
                        itemId:'fin_cantidadContratosAutomaticos',
                        labelWidth:200,
                        value: 0
                    },{
                        xtype:'displayfield',
                        fieldLabel:'Cantidad estimada a facturar',
                        itemId:'fin_cantidadTotalCalculada',
                        labelWidth:200,
                        value: 0
                    },{
                        xtype:'displayfield',
                        fieldLabel:'Contratos sin cuentas activas',
                        itemId:'fin_cantidadContratosSinCuentas',
                        labelWidth:220,
                        value: 0
                    },{
                        xtype:'displayfield',
                        fieldLabel:'Filtro',
                        itemId:'fin_filtro',
                        hidden:true,
                        labelWidth:150
                    },{
                        xtype:'button',
                        text:'Facturar',
                        itemId:'facturar'
                    }]
                }
            ]
        }
    ],
    bbar: [
        {
            id: 'move-prev',
            text: 'Back',
            handler: function(btn) {
                navigateFA(btn.up('facturacionautomaticawizardview').down("#cardspanel"), "prev");
            },
            disabled: true
        },
        '->', // greedy spacer so that the buttons are aligned to each side
        {
            id: 'move-next',
            text: 'Next',
            handler: function(btn) {
                navigateFA(btn.up('facturacionautomaticawizardview').down("#cardspanel"), "next");
            },
            disabled: true
        }
    ],
   
	initComponent : function() {
		this.callParent();

	} 
});