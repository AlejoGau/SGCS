Ext.define('Cuenta.view.CuentaNotificacionesFromView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.cuentanotifiacionesformview',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
   
    items : [
        {
            xtype: 'fieldset',            
            title: 'Notifiacion Sms',
            layout: 'hbox',
            margin: '10 10 10 10',
            
            items: [
                {
                    xtype: 'fieldset',            
                    title: 'Al asignar el móvil',
                    layout: 'vbox',
                    width:'50%',
                    items: [
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Notificar',
                            inputValue: '1',
                            itemId: 'smsasignar',
                            listeners: {
                              change: function (checkbox, newVal, oldVal) {                                   
                                    var form = checkbox.up('cuentanotifiacionesformview').down('#smsasignarform');
                                    var viewParent = checkbox.up('cuentaformview');
                                    if(viewParent.record.get('cue_ctelefono')) {
                                        
                                        if(newVal) {
                                            form.setDisabled(false);
                                        } else {
                                            form.setDisabled(true);
                                        }
                                    } else {
                                        notifyError('La cuenta no tiene telefono.');
                                        checkbox.setValue(false);
                                    }
                              }
                          }
                        },{
                            xtype: 'container',
                            disabled:true,
                            itemId: 'smsasignarform',
                            items: [
                             
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 5 0',
                                    items:[
                                        {
                                            xtype: 'combo',                                        
                                    	//	store: 'TablaPlantillasSmsStore',					
                                			displayField: 'pls_cdescripcion',								
                                			valueField: 'pls_ccodigo',
                                            fieldLabel: 'Plantilla Sms',
                                            itemId: 'plantillasmsasignar',
                                            flex: 1,
                                            labelWidth : 80,
                                            validator: function(value){
                                                    var t = this;
                                                    if(t.up('cuentanotifiacionesformview').down('#smsasignar').getValue()) {     
                                                        if(!value) {
                                                            t.markInvalid('Debe seleccionar una plantilla sms.');
                                                            t.textValid = 'Debe seleccionar una plantilla sms.';
                                                        } else {
                                                            t.clearInvalid();
                                                            t.textValid = true;
                                                        }
                                                        
                                                        
                                 
                                                    } else {
                                                		t.clearInvalid();
                                                        t.textValid = true;
                                					}
                                                 
                                                return this.textValid;
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Ver',
                                            action: 'verPlantillaSmsAsignar'
                                        }
                                    ]
                                },{
                                    xtype : 'combo',
                                    fieldLabel : 'Modem sms',
                                   // store: 'TablaModemsSmsStore',
                                    itemId: 'modemasignar',
                        			name : 'sms_imodemsms',
                        			displayField : 'sms_cdescripcion',
                        			valueField : 'sms_icodigo',
                                    anchor : '100%',
                                    queryMode: 'local',
                            		/*allowBlank : false,*/
                                    emptyText: getLocale('Seleccione'),
                                    labelWidth : 80,
                                    validator: function(value){
                                            var t = this;
                                            if(t.up('cuentanotifiacionesformview').down('#smsasignar').getValue()) {       
                                                if(!value) {
                                                    t.markInvalid('Se debe seleccionar un modem sms.');
                                                    t.textValid = 'Se debe seleccionar un modem sms.';
                                                } else {
                                                    t.clearInvalid();
                                                    t.textValid = true;
                                                }
                                                
                         
                                            } else {
                                    			t.clearInvalid();
                                                t.textValid = true;
                        					}
                                         
                                        return this.textValid;
                                    }
                        		}
                            ]
                        }
                        
                    ]
        	    },{
                    xtype: 'fieldset',            
                    title: 'Al desasignar el móvil',
                    layout: 'vbox',                    
                    width:'50%',
                    items: [
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Notificar',
                            inputValue: '1',
                            itemId: 'smsdesasignar',
                            listeners: {
                              change: function (checkbox, newVal, oldVal) {                                   
                                    var form = checkbox.up('cuentanotifiacionesformview').down('#smsdesasignarform');
                                    var viewParent = checkbox.up('cuentaformview');
                                    if(viewParent.record.get('cue_ctelefono')) {
                                        
                                        if(newVal) {
                                            form.setDisabled(false);
                                        } else {
                                            form.setDisabled(true);
                                        }
                                    } else {
                                        notifyError('La cuenta no tiene telefono.');
                                        checkbox.setValue(false);
                                    }
                              }
                          }
                        },{
                            xtype: 'container',                            
                            disabled:true,
                            itemId: 'smsdesasignarform',
                            items: [
                               
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 5 0',
                                    items:[
                                        {
                                            xtype: 'combo',                                        
                                    		//store: Ext.create('Tablas' +'.store.TablaPlantillasSmsStore'),					
                                			displayField: 'pls_cdescripcion',								
                                			valueField: 'pls_ccodigo',
                                            fieldLabel: 'Plantilla Sms',
                                           // name: 'sms_cplantillasms',
                                            itemId: 'plantillasmsdesasignar',
                                            flex: 1,                                            
                                            labelWidth : 80,
                                            validator: function(value){
                                                    var t = this;
                                                    if(t.up('cuentanotifiacionesformview').down('#smsdesasignar').getValue()) {    
                                                        if(!value) {
                                                            t.markInvalid('Debe seleccionar una plantilla sms.');
                                                            t.textValid = 'Debe seleccionar una plantilla sms.';
                                                        } else {
                                                            t.clearInvalid();
                                                            t.textValid = true;
                                                        }
                                                        
                                 
                                                    } else {
                                                		t.clearInvalid();
                                                        t.textValid = true;
                                					}
                                                 
                                                return this.textValid;
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Ver',
                                            action: 'verPlantillaSmsDesasignar'
                                        }
                                    ]
                                },{
                                    xtype : 'combo',
                                    fieldLabel : 'Modem sms',
                                   // store: Ext.create('Tablas' +'.store.TablaModemsSmsStore'),
                                    itemId: 'modemsmsdesasignar',
                        			//name : 'sms_imodemsms',
                        			displayField : 'sms_cdescripcion',
                        			valueField : 'sms_icodigo',
                                    anchor : '100%',
                                    queryMode: 'local',
                            		/*allowBlank : false,*/
                                    emptyText: getLocale('Seleccione'),
                                    labelWidth : 80,
                                    validator: function(value){
                                            var t = this;
                                            if(t.up('cuentanotifiacionesformview').down('#smsdesasignar').getValue()) { 
                                                if(!value) {
                                                    t.markInvalid('Se debe seleccionar un modem sms.');
                                                t.textValid = 'Se debe seleccionar un modem sms.';
                                                } else {
                                                    t.clearInvalid();
                                                    t.textValid = true;
                                                }
                                                
                         
                                            } else {
                                    			t.clearInvalid();
                                                t.textValid = true;
                        					}
                                         
                                        return this.textValid;
                                    }
                        		}
                            ]
                        }
                        
                    ]
                }
            ]
        },          
          
          
          {
            xtype: 'fieldset',            
            title: 'Notifiacion Email',
            layout: 'hbox',            
            margin: '0 10 10 10',
            items: [
                {
                    xtype: 'fieldset',            
                    title: 'Al asignar el móvil',
                    layout: 'vbox',
                    width:'50%',
                    items: [
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Notificar',
                            inputValue: '1',
                            itemId: 'emailasignar',
                            listeners: {
                              change: function (checkbox, newVal, oldVal) {                                   
                                    var form = checkbox.up('cuentanotifiacionesformview').down('#emailasignarform');
                                    var viewParent = checkbox.up('cuentaformview');
                                    if(viewParent.record.get('cue_cemail')) {
                                        
                                        if(newVal) {
                                            form.setDisabled(false);
                                        } else {
                                            form.setDisabled(true);
                                        }
                                    } else {
                                        notifyError('La cuenta no tiene email.');
                                        checkbox.setValue(false);
                                    }
                              }
                          }
                        },{
                            xtype: 'container',
                            disabled:true,
                            itemId: 'emailasignarform',
                            items: [
                               
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 5 0',
                                    items:[
                                        {
                                            xtype: 'combo',                                        
                                    	//	store: Ext.create('Tablas' +'.store.TablaPlantillasSmsStore'),					
                                			displayField: 'pls_cdescripcion',								
                                			valueField: 'pls_ccodigo',
                                            fieldLabel: 'Plantilla Email',
                                            itemId: 'plantillaemailasignar',
                                            flex: 1,                                            
                                            labelWidth : 80,
                                            validator: function(value){
                                                    var t = this;
                                                    if(t.up('cuentanotifiacionesformview').down('#emailasignar').getValue()) {
                                                        if(!value) {
                                                            t.markInvalid('Debe seleccionar una plantilla email.');
                                                            t.textValid = 'Debe seleccionar una plantilla email.';
                                                        } else {
                                                            t.clearInvalid();
                                                            t.textValid = true;
                                                        }
                                 
                                                    } else {
                                                		t.clearInvalid();
                                                        t.textValid = true;
                                					}
                                                 
                                                return this.textValid;
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Ver',
                                            action: 'verPlantillaEmailAsignar'
                                        }
                                    ]
                                }
                            ]
                        }
                        
                    ]
        	    },{
                    xtype: 'fieldset',            
                    title: 'Al desasignar el móvil',
                    layout: 'vbox',                    
                    width:'50%',
                    items: [
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Notificar',
                            inputValue: '1',
                            itemId: 'emaildesasignar',
                            listeners: {
                              change: function (checkbox, newVal, oldVal) {                                   
                                    var form = checkbox.up('cuentanotifiacionesformview').down('#emaildesasignarform');
                                    var viewParent = checkbox.up('cuentaformview');
                                    if(viewParent.record.get('cue_cemail')) {
                                        
                                        if(newVal) {
                                            form.setDisabled(false);
                                        } else {
                                            form.setDisabled(true);
                                        }
                                    } else {
                                        notifyError('La cuenta no tiene email.');
                                        checkbox.setValue(false);
                                    }
                              }
                          }
                        },{
                            xtype: 'container',                            
                            disabled:true,
                            itemId: 'emaildesasignarform',
                            items: [
                              
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 5 0',
                                    items:[
                                        {
                                            xtype: 'combo',                                        
                                    	//	store: Ext.create('Tablas' +'.store.TablaPlantillasSmsStore'),					
                                			displayField: 'pls_cdescripcion',								
                                			valueField: 'pls_ccodigo',
                                            fieldLabel: 'Plantilla Email',
                                           // name: 'sms_cplantillasms',
                                            itemId: 'plantillaemaildesasignar',
                                            flex: 1,                                            
                                            labelWidth : 80,
                                            validator: function(value){
                                                    var t = this;
                                                    if(t.up('cuentanotifiacionesformview').down('#emaildesasignar').getValue()) {
                                                        if(!value) {
                                                            t.markInvalid('Debe seleccionar una plantilla de email.');
                                                        t.textValid = 'Debe seleccionar una plantilla de email.';
                                                        } else {
                                                            t.clearInvalid();
                                                            t.textValid = true;
                                                        }
                                                        
                                 
                                                    } else {
                                                		t.clearInvalid();
                                                        t.textValid = true;
                                					}
                                                 
                                                return this.textValid;
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Ver',
                                            action: 'verPlantillaEmailDesasignar'
                                        }
                                    ]
                                }
                            ]
                        }
                        
                    ]
                }
            ]
        }
        
    ]
});