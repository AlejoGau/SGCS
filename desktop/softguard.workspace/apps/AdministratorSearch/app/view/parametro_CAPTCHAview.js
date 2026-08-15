Ext.define('AdministratorSearch.view.parametro_CAPTCHAview', {
    extend : 'Ext.form.Panel',
    alias : 'widget.parametro_CAPTCHAview',
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    
    items:[{
        xtype: 'textfield',
        itemId: 'textfieldKey',
        fieldLabel: 'Key de Google Captcha',
        labelWidth :  160,
        listeners : {
            change : function (textareafield, value, e, eOpts) {
                var view = textareafield.up('parametro_CAPTCHAview');
                
                if (value != '') {
                    view.down('#textfieldSecret').setDisabled(false);
                    var frame = view.down('#captchaFrame'); 
                    view.down('#captchaFrame').show();
                    /*var captcha = frame.container.dom.lastChild.contentWindow.document.getElementById('g-recaptcha');
                    
                    captcha.setAttribute('data-sitekey', value);
                    captcha.reset();*/
                } else {
                    view.down('#textfieldSecret').setDisabled(true);
                    view.down('#textfieldSecret').setValue('');
                    view.down('#captchaFrame').hide();    

                }

                view.calculateValues();
            }                
        },
        minLength : 40,
        maskRe: /[A-Za-z0-9_-]/,
        regex: /[A-Za-z0-9_-]/,
        regexText: getLocale('Debe ingresar una Key de Google valida'),
        emptyText: getLocale('Key de Google')
    },{
        xtype: 'textfield',
        itemId: 'textfieldSecret',
        fieldLabel: 'Key Secret de Google Captcha',
        labelWidth :  160,
        disabled : true,
        listeners : {
            change : function (textareafield, value, e, eOpts) {
                var view = textareafield.up('parametro_CAPTCHAview');
                view.calculateValues();
            }                
        },
        minLength : 40,
        alowBlank: false,
        maskRe: /[A-Za-z0-9_-]/,
        regex: /[A-Za-z0-9_-]/,
        regexText: getLocale('Debe ingresar un Secret Key de Google valido'),
        emptyText: getLocale('Secret Key de Google'),
        validator: function (value) {
            var view = this.up('parametro_CAPTCHAview');            
            if (value == '') {
                view.down('#captchaFrame').hide();
                this.markInvalid('El codigo Secret Key no puede ser vacio');
                this.textValid = false;
            } else if ( value.length == 40 ) {
                this.clearInvalid();
                this.textValid = true;
                view.down('#captchaFrame').show();
            }

            return this.textValid;
        }
    },{
        xtype: 'textfield',
        itemId: 'par_ivalor',
        name: 'par_ivalor',
        hidden : true
    },{
        xtype: 'textarea',
        name: 'par_cvalor',
        fieldLabel:'Valor',
        anchor:'100%',
        itemId:'jsonvalues',
        alowBlank: false,
        hidden:true
    },{
        xtype: 'button',
        text: 'test captcha',
        itemId:'botonTestCaptcha'
        //hidden:true
        

    },{

        //new Ext.Window({ title : "iframe", width : 300, height: 300, layout : 'fit', autoEl : { tag : "iframe", src : "http://www.yahoo.com" } }).show();


            
                
                xtype:'component',
                height: 120,
                hidden: true,
                itemId: 'captchaFrame',
                border: true,
                width: '100%',
                title:'Prueba de funcionamiento de captcha',
                layout : 'fit', 
                autoEl : { tag : "iframe", src : "/testcaptcha.aspx" }        
    }
    
    ],
    
    calculateValues : function () {
        var controller = this;
        var form = controller.getForm();

        var key = this.down('#textfieldKey').getValue();
        var secret = this.down('#textfieldSecret').getValue();

        if ( key != '' && secret != '' ) {
            var obj = {
                key:  key,
                secret : secret
            }
            controller.down('#jsonvalues').setValue(Ext.encode(obj));
        } else {
            controller.down('#jsonvalues').setValue('');
        }     
    },
    
    loadRecord : function(record) {
        this.callParent(arguments);
        var par_cvalor = record.get('par_cvalor');
        
        try {
            this.down('#textfield').setValue(par_cvalor);
        } catch (e) {

        }
    },
        
    initComponent : function() {
    	this.callParent();
        var view = this;  
        var frame = view.down('#captchaFrame');
        if(view.down('#textfieldKey').getValue()!='')
            frame.show();            
        Ext.Function.defer(function(){
            var jsonvalues = view.down('#jsonvalues').getValue();
            if (jsonvalues != "") {
                var obj = Ext.JSON.decode(jsonvalues)

                if (obj) {
                    view.down('#textfieldKey').setValue(obj.key)
                    view.down('#textfieldSecret').setValue(obj.secret)
                }
            }                       

        }, 100);         
    }

});