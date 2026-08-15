//MIGRADO2024
Ext.define('Common.view.BitacoraView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.bitacoraview',    
    layout: 'fit',
    margin:0,
    items: [        
        {
            xtype: 'textarea',
            readOnly:true,
            itemId: 'bitacora',
            autoScroll: true   
        }          
           
    ],
    
    initComponent: function(){
        this.callParent();       
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
               {
                    xtype: 'button', 
                    text: 'Agregar', 
                    action: 'guardarbitacora',
                    hidden:true,
                    itemId: 'savebitacora'
                },'->',{
                    type: 'button', 
                    itemId: 'maximizer',
                    hidden:true,
                    iconCls:'icon-arrow-out',
                    text:'',
                    handler: function(btn){
                        var view = btn.up('bitacoraview');
                        var tabpanel = btn.up('tabpanel');
                        var record = view.record;
                                                
                        var win = Ext.create('Ext.Window', {
                            layout: 'fit',
                        	title : getLocale('Bitacora')+' ('+record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre')+')',
                			closeAction : 'hide',
                			width : 750,
                            translate: false,
                			height : 400,
                			border : true,
                            modal: false,
                            view: view,
                			items : [
                                {
                                    xtype: 'bitacoraview',
                                    caller: view,
                                    showMaximizer: false,
                                    record:record
                                    
                                }
                            ]
                		});
                        
                        win.show();
                    }
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
    }
});