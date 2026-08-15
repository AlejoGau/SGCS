Ext.define('Common.view.EncuestaPreguntasFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.encuestaspreguntasformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true,
        anchor : '100%',
    },
    items : [
        {
                
            xtype : 'combo',
            fieldLabel : 'Estado',            
        	name : 'epg_status',
			store : [
                [0, getLocale('Deshabilitado')],
                [1, getLocale('Habilitado')]
                ],			
        	
            anchor : '100%',
            queryMode: 'local'
		},{
            fieldLabel: 'Nombre',
            name: 'epg_name',
            xtype: 'textfield'
        },{
            fieldLabel: 'Descripcion',
            name: 'epg_descripcion',
            xtype: 'textarea'
        },{
                
            xtype : 'combo',
            fieldLabel : 'Tipo',            
    		name : 'epg_tipo',
            itemId:'epg_tipo',
			store : [
                [0, getLocale('Unica opcion')],
                [1, getLocale('Multiples opciones')]
                ],			
        	
            anchor : '100%',
            queryMode: 'local'
		},{
    	 xtype:'container',
         hidden:true,
         itemId:'opcionesMultiples',
         items:[{
                xtype:'grid',
                itemId:'opcionesMultiplesgrid',
                columns:[{
                    xtype:'actioncolumn',
                    header: '',
                    width: 40,
                    items: [
                        {
                            iconCls: 'icon-delete',
                            tooltip: getLocale('Eliminar'),
                            handler: function(grid, rowIndex, colIndex,item, event) {
                                
                                Ext.MessageBox.confirm(getLocale('Delete'), getLocale('Esta a punto de borrar una opcion, esta seguro ?'), function(btn){
                                   if(btn === 'yes'){
                                        var view = grid.up('encuestaspreguntasformview');
                                        var rec = grid.getStore().getAt(rowIndex);
                                        view.fireEvent('deleteOpcion',rec,view);
                                   }
                                   else{
                                      //some code
                                   }
                                 });
                                
                            }
                        }
                    ]
                },{
                    xtype : 'gridcolumn',
                    header : 'Respuesta',
                    dataIndex : 'epo_name',                	
                    flex:1
        		},{
                    xtype : 'gridcolumn',
                    header : 'Estado',
                    dataIndex : 'epo_tipo',                    
                    flex:1,
                    renderer: function (value,obj,record) {
                        return record.get('_epo_tipo')
                    }
                },{
                    xtype : 'gridcolumn',
                    header : 'Estadoxxxxxx',
                    dataIndex : 'epo_status',                    
                    flex:1,
                    renderer: function (value,obj,record) {
                        return record.get('_epo_status')
                    }
        		}]
		}
		]
    	
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
         
          var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    itemId: 'addOpciones'
                }
            ]// cierro items
         }); 
        
        this.down('#opcionesMultiplesgrid').addDocked(toolbar);
        
	} // cierro init
});
