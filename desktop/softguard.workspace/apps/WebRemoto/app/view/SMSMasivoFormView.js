Ext.define('WebRemoto.view.SMSMasivoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.smsmasivoformview'],
    title : 'Evento',
    preventHeader: true,
    layout: 'anchor',
    showtoolbar: true,
    autoScroll: true,    
  
	items : [
        {
            xtype:'textarea',
            itemId:'textosms',
            height:215,
            validator: function(value){
                    var t = this;
                    
                    
                        if (value.length >= 160){
                                
                                t.markInvalid('El mensaje debe ser menor a 160 caracteres');
                                t.textValid = false;
                            } else if(value.trim() == '') {
                                t.markInvalid('El mensaje no puede estar vacío');
                                t.textValid = false;
                            }else {

                                t.clearInvalid();
                                t.textValid = true;
                            }   
                            
                        
                   
                     return t.textValid;
                }
                
                
        	

        },{
            xtype : 'combo',
            fieldLabel : 'Modem sms',
            store: 'TablaModemsSmsStore',
            itemId: 'modemsms',
        	name : 'sms_imodemsms',
			displayField : 'sms_cdescripcion',
			valueField : 'sms_icodigo',
            anchor : '100%',
            queryMode: 'local',
    		/*allowBlank : false,*/
            emptyText: getLocale('Seleccione'),
            labelWidth : 80
		}
        
        
    ],
	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
              
                {
                    xtype: 'button',
                    iconCls: 'icon-email-go',
                    itemId: 'send',
                    text: 'Enviar'
                }
               
            ], 
            dock: 'top'
         }); 
        if (this.showtoolbar)
            this.addDocked(toolbar);
       
	} // cierro init

});