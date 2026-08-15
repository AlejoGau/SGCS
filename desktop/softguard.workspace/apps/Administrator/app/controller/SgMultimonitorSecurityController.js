Ext.define('Administrator.controller.SgMultimonitorSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'SgMultimonitorSecurityView' ],

    init : function(config) {
        // this.initConfig(config);
        // genero los eventos

    	this.control({
            
            'SgAppMultiMonitorWebSecurity' : {
                beforerender : this.initSettingview
    		},
            'SgAppMultiMonitorWebSecurity button[action=saveMultimonitor]': {
                click: this.onSaveClick
            }
		});
	}, 
    
    
    
    initSettingview: function (view) {


        var record = view.record; 
        var modules = view.modules;
        var moduleId= 19;
        var userName = record.get('Name');
        var url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;     
        view.url = url;
        var controller = this;
        var security = {modules:[],rights:[], event:[]}
        view.security = security;

        view.metadata = Ext.define('metadata', {
                    extend: 'Ext.data.Model',
                    fields: [
                        {name: 'sonido',  type: 'string'},
                        
                    ],
                    proxy: {
                        type: 'rest',
                        url: view.url,
                        appendId: false
                    }
                });
    

         
         view.metadata.load(0,{callback: function(record){
            
                if(record) {

                    if(record.get('sonido') == null || record.get('sonido') == '') {
                        view.down('#sonido').setValue(true);
                    } else {
                        view.down('#sonido').setValue(record.get('sonido'));
                    }

                }

         }})
                    
    },  
    
   
    
    onSaveClick : function(button, event, options) {
        var me = this;
        var view = button.up('SgAppMultiMonitorWebSecurity');
        var security = view.security;
        var record =  view.record;
        
        
        var url = view.url;//+'/'+userId;
    
        //view.metadata.set('sonido',view.down('#sonido').getValue())
        
        var metadata = {
                sonido: view.down('#sonido').getValue()            
        }
        
        var json = Ext.encode(metadata);
       
        Ext.Ajax.request({
          url: url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
              me.initSettingview(view);
            notify('Los datos se guardaron con éxito');
          }
        });
    }
});