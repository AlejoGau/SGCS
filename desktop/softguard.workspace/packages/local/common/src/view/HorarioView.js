//MIGRADO2024
Ext.define('Common.view.HorarioView', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.horarioview', 
    //bodyPadding: 0,
    autoScroll: true,
    layout: 'anchor',
    itemId:'horarioview',
    items: [
        {
            xtype: 'fieldset',
            itemId: 'plantilla',
            title: '',
            layout: 'hbox',
            padding: 5,
            items: [
                    {
                        xtype: 'combo',
                        fieldLabel : 'Plantillas',

            			displayField: '_Descripcion',
            			valueField: 'Id',
                        width: 200,
                        itemId: 'zonaplantillacombo',
                        name: 'plantilla',
                        queryMode: 'local',
                        labelWidth: 60

                    }, {
                        xtype: 'button',
                        iconCls: 'icon-add',
                        text: 'Insertar',
                        action: 'saveplantilla',
                        margin:'0 5 0 5'
                    }, {
                        xtype: 'button',
                        iconCls: 'icon-delete',
                        text: 'Eliminar',
                        action: 'deleteplantilla',
                        margin:'0 10 0 0',
                        disabled : true
                    },{
                        xtype: 'textfield',
                        itemId: 'nombreplantilla',
                        width: 150,
                        margin: '0 5 0 0',
                        emptyText: 'Nombre de plantilla'
                    },{
                        xtype: 'button',
                        iconCls: 'icon-add',
                        text: 'Guardar',
                        action: 'guardarplantilla'
                    }
                ]
        },{
                xtype: 'grid',
                collapsible: true,
                title: 'Semanal',
                itemId: 'horariosemanal',
                minHeight: 200,
                //layout: 'anchor',
                selType: 'checkboxmodel',
                columns: [
					{
						xtype: 'gridcolumn',
						dataIndex: 'hor_ndiaapertura',
						header: 'Dia Apertura',
						sortable: true,
						width: 100,								            			
						renderer: function(value){										
							var store = Ext.data.StoreManager.get('TablaDiasStore');
							var record = store.findRecord('Value', value);							
							if(record == undefined)
								return value;
							else					
								return record.data.Name;										
						}
					},    								
					{
						xtype: 'gridcolumn',
						dataIndex: 'hor_choraapertura',
						header: 'Hora Apertura',
						sortable: true,
						width: 100
					},
					{
						xtype: 'gridcolumn',
						dataIndex: 'hor_ndiacierre',
						header: 'Dia Cierre',
						sortable: true,
						width: 100,									            			
						renderer: function(value){										
							var store = Ext.data.StoreManager.get('TablaDiasStore');
							var record = store.findRecord('Value', value);							
							if(record == undefined)
								return value;
							else					
								return record.data.Name;										
						}
					},
					{
						xtype: 'gridcolumn',
						dataIndex: 'hor_choracierre',
						header: 'Hora Cierre',
						sortable: true,
						width: 100
					}
				]// cierro columnas
           }, // cierro primera grilla
            
            {xtype: 'horarioalternativogridview'},
            
            {xtype: 'horarioexcepciongridview'},// cierro grid
            
            {xtype:'horariotoleranciaview'}
        
    ],
    
    initComponent: function () {
        this.callParent(arguments);       
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
               items: [
               /* {
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save'
                },*/
                {xtype: 'tbseparator'},
                {
                    iconCls: 'icon-add',
                    text: 'Agregar',
                    itemId: 'semanalAdd',
                    action: 'add'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: true,
                    action: 'delete'
                },"->",{
                    xtype:'container',
                    itemId:'timezone'
                }]
             }); 

         
         var semanal = this.down('#horariosemanal');
         semanal.addDocked(toolbar);
    } // cierro init
});