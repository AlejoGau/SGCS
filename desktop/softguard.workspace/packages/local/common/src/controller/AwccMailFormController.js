//MIGRADO2024
Ext.define('Common.controller.AwccMailFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'w_destinatarios_correoSearchModel', 'SmartMailProgramModel' ],
    views : [ 'AwccMailFormView' ],
    init : function(config) {
    	// genero los eventos
		this.control({
    		'awccmailformview' : {
    			afterrender : this.initview
    		},
    
    		'awccmailformview button[action="send"]' : {
    			click : this.onSendClick
    		}
        });
	}, // cierro init
	initview : function(view) {
        // cargo el registro
        var to = view.down('#to');
        var cc = view.down('#cc');
        var cco = view.down('#cco');
        var from = view.down('#from');
        var body = view.down('#body');
        var subject = view.down('#asunto');
        
 
        var model = this.getSmartMailProgramModelModel();
        view.record= Ext.create(model,{
            DateStart: new Date(),
            Name: ''
            
        })
        view.loadRecord(view.record);
 
 
        var emailToStore =  Ext.create('Ext.data.Store', {
                        model : this.getW_destinatarios_correoSearchModelModel(),
                        remoteFilter: true,
                        autoload: false
                        
                    });
       
       view.down('#to').bindStore(emailToStore)
       emailToStore.load();
        
        console.log(this.application)
        //to.setValue(view.to);
        cc.setValue(view.cc);
        cco.setValue(view.cco);
      //  from.setValue(this.application.UserData.UserId);
        body.setValue(view.mailbody);
        subject.setValue(view.subject);
        
        
        Ext.Ajax.request({
              url: '/Rest/t_parametros/',
              params: { filter:'[{"property":"par_ccodigo", "value":"MAILSENDERNAME"}]'},
              method: 'GET',
              scope: this,
              success: function(response){
                  var mailSender = Ext.JSON.decode(response.responseText).rows[0].par_cvalor; 
                  
                  Ext.Ajax.request({
                      url: '/Rest/t_parametros/',
                      params: { filter:'[{"property":"par_ccodigo", "value":"MAILSENDER"}]'},
                      method: 'GET',
                      scope: this,
                      success: function(response){
                          mailSender = mailSender +' <'+ Ext.JSON.decode(response.responseText).rows[0].par_cvalor+'>';
                          from.setValue(mailSender);
                      }
                  });
              }
        })
        
       
        
	},
	onSendClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('awccmailformview');
        var win = button.up('window');
		var record = myform.getRecord();
        
        
        
        myform.updateRecord(record);
        if (record.data.DateEnd == null){
            record.data.DateEnd,new Date(-62135586000000);
        };
        
        if (record.data.DateStart == null){
            record.set('DateStart',new Date());
        };
        
        if (record.data.RecurrentDateEnd == null){
            record.data.RecurrentDateEnd,new Date(-62135586000000);
        };
        
        if (record.data.TransportType == null || record.data.TransportType == ''){
            record.data.TransportType, 'MAIL';
        };
        
      
        
        
        
      
        record.set('Body', record.get('Body')+"<hr />"+getLocale("Area Destino")+":"+view.down('#to').getRawValue()+"("+record.get('Query')+")"+"<br />"+getLocale("Desde")+":"+_UserData.UserId)
        
        record.set('Query', 
            'select strval as Email from dbo.ParseArray( \''+record.get('Query')+'\',\',\')')
            
        record.set('Status','A');
    	record.save({
			scope : this,
            win: win,
            view: view,
			callback : function(record, operation) {
                if (operation.success){
                    
                    notify('Se envio el correo.');
                    
                    
                    if (view){
                        view.fireEvent('objectchanged',operation);
                        
                        if (win){
                            win.close();
                        } else if (view.up('mailformview')){
                            view.up('mailformview').close();
                        } else if(view.noCloseAfterSave == true) {
                            
                        } else{
                            view.close();
                        }
                            
                    }
                } else {
                    notifyError('Hubo un error al guardar los datos');
                }
                
			},
			button : button
		});
                
      
        
	}
    
});