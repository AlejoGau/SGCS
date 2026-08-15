Ext.define('WebRemoto.view.NotaROView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.notaroview',    
    autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    margin:0,
    items: [        
        {
            xtype: 'displayfield',
            itemId: 'notas',
            autoScroll: true   
        }          
           

    ],
    
    initComponent: function(){
        this.callParent();       
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [,'->',{
                    type: 'button', 
                    itemId: 'maximizer',
                    hidden:true,
                    iconCls:'icon-arrow-out',
                    text:'',
                    handler: function(btn){
                        var view = btn.up('notaroview');
                        var tabpanel = btn.up('tabpanel');
                        var record = view.record;
                        var win = Ext.create('Ext.Window', {
                            layout: 'fit',
                            translate:false,
                        	title : getLocale('Nota')+ ' ('+record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre')+')',
                			closeAction : 'hide',
                			width : 750,
                			height : 400,
                			border : true,
                            modal: false,
                            view: view,
                			items : [
                                {
                                    //xtype: 'notaroview',
                                    xtype: 'formnote',
                                    caller: view,
                                    showMaximizer: false,
                                    record:record,
                                    notas: view.notas,
                                    module: view.module
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