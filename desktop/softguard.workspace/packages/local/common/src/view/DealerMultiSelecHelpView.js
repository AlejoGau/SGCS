//MIGRADO2024
Ext.define('Common.view.DealerMultiSelecHelpView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.dealermultiselectionhelperview'],
    title : '',
    ignoreDirty: true,
    autoHeight : true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
   
    bodyStyle: {
        background: '#efefef'
    },
     
    items:[
            {
                            
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                margins: '5 0 0 0',
                itemId: 'tabpanel',
                items: [                    
           
                         {
                            xtype : 'gridpanel',
                            itemId : 'gridtodosotras',
                            flex: 1,
                            autoScroll : true,
                            scroll: true,
                            title: 'Otras cuentas',
                            
                            autoDestroy :true,
                            selModel: {
                                checkOnly: false,
                                injectCheckbox: 'last',
                                mode: 'SIMPLE'
                            },
                            selType: 'checkboxmodel',
                            columns : [
                                {
                                    xtype : 'gridcolumn',
                        			header : 'Cuenta',
                        			dataIndex : 'cue_clinea',
                                	flex:1,
                                    renderer: function (value,object, record) {
                                        return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')
                                    } 
                        		},{
                                    xtype : 'gridcolumn',
                        			header : 'Nombre',
                        			dataIndex : 'cue_cnombre',
                                	flex:1                    
                        		},{
                                    xtype : 'gridcolumn',
                            		header : 'Telefono',
                        			dataIndex : 'cue_ctelefono',
                                	flex:1                    
                        		}
                                
                            ]
                        }                
                    
                    ]
            },{
                xtype:'container',
                layout:'vbox',
                margin:'120 5 0 5',
                itemId:'botones',
                items: [
                        {
                            xtype:'button',
                            text: 'Agregar',
                            iconCls: 'icon-add',       
                            itemId:'agregar',
                            
                             margin:'0 0 5 0',
                             width:120
                        },{
                            xtype:'button',
                            text: 'Quitar',
                            iconCls: 'icon-cancel',
                            itemId:'quitar',
                             width:120
                        }
                    ]
            },{
                xtype : 'gridpanel',
            	itemId : 'gridselecionados',
                flex: 1,
                autoScroll : true,
                scroll: true,
                title: 'Seleccionados',
                selModel: {
                    checkOnly: false,
                    injectCheckbox: 'last',
                    mode: 'SIMPLE'
                },
                selType: 'checkboxmodel',
               
                columns : [
                    {
                        xtype : 'gridcolumn',
                		header : 'Cuenta',
            			dataIndex : 'cue_clinea',
                    	flex:1,
                        renderer: function (value,object, record) {
                            return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')
                        } 
            		},{
                        xtype : 'gridcolumn',
            			header : 'Nombre',
            			dataIndex : 'cue_cnombre',
                    	flex:1                    
            		},{
                        xtype : 'gridcolumn',
                		header : 'Telefono',
            			dataIndex : 'cue_ctelefono',
                    	flex:1                    
            		}
                    
                ],            
               flex:1
           }
        ],
    
    initComponent: function () {
        this.callParent(arguments);     
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'button',
                    text:'Listo',
                    iconCls: 'icon-accept',               
                    itemId:'listo'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
         
         
         
         
         var toolbarTodos = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text : 'Filtros',
                    itemId: 'filtro',
                	menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [{
                            xtype:'fieldset',
                            padding:'0 0 0 0',
                            border:0,
                            layout:'hbox',
                            width:270,
                            margin:'0 0 5 0',
                            items:[
                                {
                                    xtype: 'textfield',
                                    itemId: 'dealer',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    emptyText: getLocale('Dealer'),
                                    width:110
                                    
                                },{
                                    xtype: 'textfield',
                                    itemId: 'cuenta',
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    emptyText: getLocale('Cuenta'),
                                    width:147,
                                    margin:'0 0 0 5'
                                }
                            ]
                        },{
                            xtype: 'textfield',
                            itemId: 'nombre',
                            emptyText: getLocale('Nombre'),                                            
                            width:260
                        },{
                            xtype: 'textfield',
                            itemId: 'calle',
                            emptyText: getLocale('Calle'),                                            
                            width:260
                        },{
                            xtype: 'textfield',
                            itemId: 'email',
                            emptyText: getLocale('Email'),                                            
                            width:260
                        },{
                            xtype: 'textfield',
                            itemId: 'localidad',
                            emptyText: getLocale('Localidad'),                                            
                            width:260                            
                        },{
                            xtype: 'button',
                            iconCls: '',
                            text: 'Buscar',
                            action: 'busrcarotras',
                            itemId:'busrcarotras'
                        }]
                	}
                },{
                    xtype: 'button',
                    iconCls: '',
                    text: 'Todos',
                    action: 'todosotras',
                    itemId:'todosotras'
                }
            ]// cierro items
         }); 
         this.down('#gridtodosotras').addDocked(toolbarTodos);
         
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'pagingtoolbar',
            displayInfo: true
        });
        
        this.down('#gridtodosotras').addDocked(pagingtoolbar);
                
     
    } 
});