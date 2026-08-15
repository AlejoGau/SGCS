//MIGRADO2024
Ext.define('Common.view.SmartpanicsHelperView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.smartpanicshelperview',
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
    
    
    
    
    initComponent: function () {
        
        
        this.items = [
            {
                            
                xtype: 'tabpanel',
                flex: 1,
                //Federico V. dejo comentado porque rompia la vista en el modulo de FenceManager. Tarea DS-717
                /*layout:{
                    type: 'hbox',
                    align: 'stretch'
                },*/
                margins: '5 0 0 0',
                itemId: 'tabpanel',
                items: [                    
           
                         {
                            xtype : 'gridpanel',
                            itemId : 'gridtodos',
                            flex: 1,
                            autoScroll : true,
                            scroll: true,
                            title: 'De la cuenta',
                            autoDestroy :true,
                            selModel: Ext.create('Ext.selection.CheckboxModel'),
                            columns : [
                                {
                                	xtype : 'gridcolumn',
                        			header : 'Smartpanics',
                        			dataIndex : 'Nombre',
                                	flex:1                    
                        		},{
                                    xtype : 'gridcolumn',
                                	header : 'Telefono',
                        			dataIndex : 'Telefono',
                                	flex:1                    
                        		}
                                
                            ]
                        },{
                            xtype : 'gridpanel',
                            itemId : 'gridtodosotras',
                            flex: 1,
                            autoScroll : true,
                            scroll: true,
                            title: 'Otras cuentas',
                            
                            autoDestroy :true,
                            selModel: Ext.create('Ext.selection.CheckboxModel'),
                            columns : [
                                {
                                	xtype : 'gridcolumn',
                        			header : 'Smartpanics',
                        			dataIndex : 'Nombre',
                                	flex:1                    
                        		},{
                                    xtype : 'gridcolumn',
                        			header : 'Cuenta',
                        			dataIndex : 'cue_clinea',
                                	flex:1,
                                    renderer: function (value,object, record) {
                                        
                                        return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')
                                    } 
                        		},{
                                    xtype : 'gridcolumn',
                        			header : 'Cuenta',
                        			dataIndex : 'cue_cnombre',
                                	flex:1                    
                        		},{
                                    xtype : 'gridcolumn',
                            		header : 'Telefono',
                        			dataIndex : 'Telefono',
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
                selModel: Ext.create('Ext.selection.CheckboxModel'),
               
                columns : [
                    {
                    	xtype : 'gridcolumn',
            			header : 'Smartpanics seleccionados',
            			dataIndex : 'Nombre',
                    	flex:1                    
            		},{
                        xtype : 'gridcolumn',
                		header : 'Cuenta',
            			dataIndex : 'cue_clinea',
                    	flex:1,
                        renderer: function (value,object, record) {
                            return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')
                        } 
            		},{
                        xtype : 'gridcolumn',
            			header : 'Cuenta',
            			dataIndex : 'cue_cnombre',
                    	flex:1                    
            		},{
                        xtype : 'gridcolumn',
                		header : 'Telefono',
            			dataIndex : 'Telefono',
                    	flex:1                    
            		}
                    
                ],            
               flex:1
           }
        ]
      
      
      this.callParent(arguments);
        //this.addEvents('selectedEvents');        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'button',
                    text:'Listo',
                    iconCls: 'icon-accept',               
                    itemId:'listo'
                },
                {
                    xtype: 'button',
                    text: getLocale('SmartPanics del Dealer'),
                    iconCls: 'icon-accept',
                    itemId: 'sendAll'
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
                        items: [
                            {
                                xtype:'textfield',
                                fieldLabel : '',                	
                                itemId:'query',
                                emptyText: getLocale('Smartpanics'),
                                flex:1
                                
                            },{
                                xtype: 'textfield',
                                itemId: 'telefono',
                                emptyText: getLocale('Telefono')
                                
                            },{
                                xtype:'button',
                                text:'Buscar',
                                itemId:'buscar'
                            }
                        ]
                    }
                 },{
                    xtype:'button',
                    text:'Todos',
                    itemId:'todos'
                }
            ]// cierro items
         }); 
         this.down('#gridtodos').addDocked(toolbarTodos);
         
         
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
                            itemId: 'nombresmartpanics',
                            emptyText: getLocale('Smartpanics'),                                            
                            width:260
                        },{
                            xtype: 'textfield',
                            itemId: 'telefonootras',
                            emptyText: getLocale('Telefono'),                                            
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
         
         
         
    } // cierro init
});