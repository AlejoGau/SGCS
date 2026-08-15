Ext.define('WebRemoto.controller.NotaROController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoftguardNotaModel' ],
    views : [ 'NotaROView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'notaroview' : {
                afterrender : this.initView,
                objectchanged: this.objectChanged
        	}
		});
	}, // cierro init
    
    
    
    initView: function(view){
        var record = view.record;
        var cue_iid = record.get('cue_iid');
        var controller = this;       
        
        if(record.get('not_dtemporaldesde') != undefined) {
            if(view.down('#notas')) {
                    view.down('#notas').setValue(record.get('not_mnotaprincipal').replace(/\n/g, "<br />"));
                }
        } else {
            this.getSoftguardNotaModelModel().load(record.get('cue_iid'), {callback: function (recordx) {
                
                var notas = recordx.get('not_mnotaprincipal');
                if(view.down('#notas')) {
                    view.down('#notas').setValue(notas.replace(/\n/g, "<br />"));
                }
            }});
        }
        
        
        if(view.showMaximizer != false) {
           /* view.addTool({
                type: 'maximize', 
                itemId: 'maximizer',
                handler: function(event,img,view,tool){
                    var view = tool.up('notaroview');
                    var tabpanel = tool.up('tabpanel');
                    var record = view.record;
                                            
                    var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                		title : 'Nota ('+record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre')+')',
            			closeAction : 'hide',
            			width : 750,
            			height : 400,
            			border : true,
                        modal: false,
                        view: view,
            			items : [
                            {
                                xtype: 'formnote',
                                caller: view,
                                showMaximizer: false,
                                record:record,
                                module: view.module,
                                
                            }
                        ]
            		});
                    
                    win.show();
                }
            });*/
            view.down('#maximizer').show()
        }
    },
    
    objectChanged: function (view) {
        var record = view.record;
        this.getSoftguardNotaModelModel().load(record.get('cue_iid'), {callback: function (recordx) {
            
            var notas = recordx.get('not_mnotaprincipal');
            
            view.down('#notas').setValue(notas.replace(/\n/g, "<br />"));
        }});
        
    }
    
});