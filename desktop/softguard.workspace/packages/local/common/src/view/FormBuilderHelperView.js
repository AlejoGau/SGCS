//MIGRADO2024
Ext.define('Common.view.FormBuilderHelperView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.formbuilderhelperview'],
    title : '',
    frame : false,   
    autoScroll:true,
    bodyPadding : 5,    
    fieldDefaults : {
        labelWidth : 150,
        labelAlign: 'left', 
        editable:false
    },
    items : [
        {
            xtype:'fieldset',
            title:'Nuevo campo',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:[
                    {
                        xtype : 'combo',
                        queryMode: 'local',
                        itemId: 'xtype',            		
                        editable: false,
                        fieldLabel:'Tipo campo',
                        store:[
                                ['textfield', getLocale('Campo de texto')],
                                ['numberfield', getLocale('Campo de numero')]
                            ]
            		},{
                        xtype:'textfield',
                        fieldLabel:'Etiqueta',
                        itemId:'fieldLabel'
                    },{
                        xtype:'textfield',
                        fieldLabel:'Name',
                        itemId:'name'
                    },{
                        xtype:'textfield',
                        fieldLabel:'Valor por default',
                        itemId:'value'
                    },{
                        xtype:'button',
                        text:'Agregar',
                        itemId:'agregar'
                    }
                ]
        }/*,{
            xtype:'fieldset',
            title:'Formulario',
            itemId:'formulario',
            items:[]
        }*/
        ,{
            xtype:'grid',
            itemId:'formulario',
            columns:[{
                        xtype:'actioncolumn',
                        header: '',
                        width: 30,
                        items: [
                            {
                                iconCls: 'icon-delete',
                                tooltip: getLocale('Eliminar'),
                                handler: function(grid, rowIndex, colIndex,item, event) {
                                    var view = grid.up('formbuilderhelperview');
                                    var rec = grid.getStore().getAt(rowIndex);
                                    view.fireEvent('deleteitem',rec,view);
                                }
                            }
                        ]
                    },
                    {
                        xtype : 'gridcolumn',
                        header : 'Tipo',
                        dataIndex : 'xtype',                	
                        flex:1
            		},{
                        xtype : 'gridcolumn',
                        header : 'Label',
                        dataIndex : 'fieldLabel',                    
                        flex:1
            		},{
                        xtype : 'gridcolumn',
                        header : 'Valor default',
                        dataIndex : 'value',                    
                        flex:1
                	}
                ]
        }
        
        
    ],
    
	initComponent : function() {
		this.callParent();
        
       
        
	} 
});