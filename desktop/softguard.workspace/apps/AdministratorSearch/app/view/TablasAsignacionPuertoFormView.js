Ext.define('AdministratorSearch.view.TablasAsignacionPuertoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasasignacionpuertoformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
       /* {
            xtype : 'textfield',
            name : 'tpa_icodigo',
            fieldLabel: 'Codigo',
            maxLength: 3,
            inputWidth:40
        },*/{
            xtype : 'combo',
            fieldLabel : 'Dealer',
            itemId: 'delaer',
			name : 'tpa_cdealer',
			//store : 'TablaLineasStore',
			displayField : 'lin_crazonsocial',
			valueField : 'lin_ccodigo',
            anchor : '100%',            
            allowBlank : false,
            queryMode: 'local'            
    	},{
                xtype: 'fieldset',
                title: '',
                collapsible: false,
                layout: {
                     type: 'vbox',
                    align: 'stretch',
                    flex:1
                },
                items:[
                    {
                        xtype : 'combo',
                    	fieldLabel : 'Puerto',
                        itemId: 'puerto',
            			name : 'tpa_ipuerto',
            			store : 'ReceptoresStore',
                        emptyText: 'Seleccione',
            			displayField : 'pue_cdescripcion',
            			valueField : 'pue_icodigo',
                        anchor : '100%',                    
                        queryMode: 'local'
        	    	},{
                        xtype: 'container',
                        layout: {
                            
                            type: 'hbox',
                            align: 'stretch',
                            anchor: '100%'
                        },
                        margin: '0 0 5 0',
                        items: [
                        {
                            xtype : 'displayfield',
                            value: getLocale('Linea'),
                            width:80
                        },{
                            xtype: 'container',
                            layout: {
                                
                                type: 'vbox',
                                align: 'stretch',
                                anchor: '100%'
                            },
                            margin: '0 0 5 30',
                            items: [
{
                                            xtype: 'container',
                                            layout: {
                                                
                                                type: 'hbox',
                                                align: 'stretch',
                                                anchor: '100%'
                                            },
                                            margin: '0 0 5 0',
                                            items: [
                                                {
                                                    xtype : 'displayfield',
                                                    value: '1'
                                                },
                                                {
                                                    xtype : 'displayfield',
                                                    value: '16',
                                                    margin: '0 0 5 260'
                                                }
                                            ]
                                        },{
                                            xtype: 'container',
                                            layout: {
                                                
                                                type: 'hbox',
                                                align: 'stretch',
                                                anchor: '100%'
                                            },
                                            margin: '0 0 5 0',
                                            items: [
                                                {
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-1',
                                                    tooltip:'1'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-2'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-3'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-4'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-5'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-6'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-7'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-8'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-9'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-10'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-11'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-12'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-13'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-14'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-15'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-16'
                                                }
                                            ]
                                        },{
                                            xtype: 'container',
                                            layout: {
                                                
                                                type: 'hbox',
                                                align: 'stretch',
                                                anchor: '100%'
                                            },
                                            margin: '0 0 5 0',
                                            items: [
                                                {
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-17'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-18'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-19'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-20'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-21'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-22'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-23'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-24'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-25'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-26'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-27'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-28'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-29'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-30'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-31'
                                                },{
                                                    xtype : 'checkboxfield',
                                                    name : 'cat_cDescripcion',
                                                    fieldLabel: '',
                                                    margin: '0 5 5 0',
                                                    itemId: 'linea-32'
                                                }
                                            ]
                                        },{
                                            xtype: 'container',
                                            layout: {
                                                
                                                type: 'hbox',
                                                align: 'stretch',
                                                anchor: '100%'
                                            },
                                            margin: '0 0 5 0',
                                            items: [
                                                {
                                                    xtype : 'displayfield',
                                                    value: '17'
                                                },
                                                {
                                                    xtype : 'displayfield',
                                                    value: '32',
                                                    margin: '0 0 5 260'
                                                }
                                            ]
                                        },{
                                            xtype:'button',
                                            text:'Seleccionar Todos',
                                            handler:function (btn) {
                                                var view = btn.up('tablasasignacionpuertoformview')
                                                
                                                for(i=1; i<=32; i++) {
                                                    view.down('#linea-'+i).setValue(true)
                                                }
                                                
                                            }
                                        }

                            ]
                        }
                    ]
                }

            ]
           
        },{
                    
            xtype : 'combo',
            fieldLabel : 'Conexion Ip',
            itemId: 'conexionip',
			name : 'tpa_iportip',			
			displayField : 'ipc_cdescripcion',
			valueField : 'ipc_icodigo',
            emptyText: 'Seleccione',
            anchor : '100%',
            queryMode: 'local'
    	}
    ],

    initComponent : function() {
        
        this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
    } // cierro init
});