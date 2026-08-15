Ext.define('Administrator.view.MapGuardWebSecurityView', {
    extend : 'Ext.form.Panel',
    title: 'Seguridad',
    alias : 'widget.SgAppMapGuardWebSecurity', 
    
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            margin : '0 0 10 0',

            items: [        
                {
                                                    
                    xtype: 'combo',
                    queryMode: 'local',
                    itemId: 'patrullas',
                    fieldLabel: 'Patrullas',
                    displayField: 'tmp_cnombre',    							
                	valueField: 'tmp_idKey',
                    flex:1
                                    
                },{

                    xtype:'button',
                    text: 'Agregar',
                    itemId:'agregarpatrulla',
                    width: 100
                }
            ]
        }
       ,{
         
            xtype:'gridpanel',
            title:'Patrullas asignadas',
            itemId: 'patrullasasigandas',
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            columns : [{
            			xtype : 'gridcolumn',
            			header : 'Nombre',
            			dataIndex : 'tmp_cnombre',
                        flex:1
            		}]
            
		
         
		}
       
    ],
    
    initComponent : function() {
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveSecurity'
                }]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
         
         
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    scope: this,
                    action: 'delete',
                    itemId:'delete'
                }]// cierro items
         }); 
         this.down('#patrullasasigandas').addDocked(toolbar);
    } // cierro init

});
