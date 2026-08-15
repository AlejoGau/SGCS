Ext.define('AdministratorSearch.controller.GatewayFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasModemsSmsModel', 'TablasModemsSmsSearchModel', 'GatewayModel' ],
    views : [ 'GatewayFormView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'gatewayformview' : {
				afterrender : this.initView
               
               
			},
            'gatewayformview button[action=save]': {
                click: this.onSaveClick
            }
            
            
		});
	},

	initView : function(view) {
        
        var record = view.record;
        view.loadRecord(view.record);
        
        if(view.record.get('tgm_cconfig') && view.record.get('tgm_cconfig') != '') {       
            
            var json = Ext.JSON.decode(view.record.get('tgm_cconfig'));
            items = json;
            Ext.Array.each(items, function(item){
                item.fieldLabel = getLocale(item.fieldLabel);
            })          
            view.down('#tgm_configcontainer').add(items);            
            view.down('#tgm_configcontainer').show()
            
            if(view.record.get('tgm_cmetadata') != '') {
                 var values = Ext.JSON.decode(view.record.get('tgm_cmetadata'));
                 
                 /*Ext.Array.each(values, function (value) {
                    console.log(value)
                 })*/
                 for(var key in values) {
                     if(values.hasOwnProperty(key)) {
                         if(view.down('[name="'+key+'"]')) {
                            view.down('[name="'+key+'"]').setValue(values[key])
                         }
                     }
                 }
                 
            }
        }
        else if(record.get('tgm_ntipo') == 1) {
            view.down('#tgm_ntipo1').show();
               
        } else if (record.get('tgm_ntipo') == 2) {
            view.down('#tgm_ntipo2').show();
        } else if (record.get('tgm_ntipo') == 3) {
            view.down('#tgm_ntipo3').show();
        }
        
        if (record.get('Id')>0){
            view.down('#tgm_ntipo').disable();
        }
        
        
        var grid =  view.down('grid');
        view.filters = [{
            property:'sms_igateway',
            value: view.record.get('Id')
        }];      
        
      /*  view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasModemsSmsSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        
        grid.bindStore(view.store);*/
        //view.store.grid = grid;
        //view.store.view = view;
        
      /*  var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);        
        view.store.load();   */
        
	},
    
  
    
    onSaveClick: function(grid,record,item,index,e,options){
        
        
		var myform = grid.up('form').getForm();
        var view = grid.up('gatewayformview');
        var win = grid.up('window');
		var record = myform.getRecord();


		myform.updateRecord(record);
        
        if(record.get('tgm_cconfig') != '') {
            var configs = view.down('#tgm_configcontainer').items.getRange();
            
            var values = {}
            Ext.Array.each(configs, function (field) {    
                values[field.name] = field.value
            })
            
            record.set('tgm_cmetadata', Ext.encode(values))            
            
        }
        
      
        if (myform.isValid()){
    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                         win.close();
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			}
    		});
        }

        
        
    }  

    
  
  
    
   

});